import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { LoadingController, Platform, ToastController } from '@ionic/angular';

import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

import jsQR from 'jsqr';

import { Router } from '@angular/router';
import { LocationService } from '../service/location.service';


@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {

  @ViewChild('video', { static: false }) video: ElementRef;
  @ViewChild('canvas', { static: false }) canvas: ElementRef;
  @ViewChild('fileinput', { static: false }) fileinput: ElementRef;

 
  canvasElement: any;
  videoElement: any;
  canvasContext: any;
  scanActive = false;
  scanResult = null;
  private url : any;
  loading: HTMLIonLoadingElement = null;


  AllResults = [];


  latitude: any;
  logitude: any;

  form: FormGroup
  myDate: FormControl = new FormControl('', Validators.required)
  

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private plt: Platform,
    private fb: FormBuilder,
    private geolocation: Geolocation,
    private locationApi: LocationService
  ) { 

    const isInStandaloneMode = () =>
    'standalone' in window.navigator && window.navigator['standalone'];
    if (this.plt.is('ios') && isInStandaloneMode()) {
      console.log('I am a an iOS PWA!');
      // E.g. hide the scan functionality!
    }

  }

  ngOnInit() {

    this.currentLocation();
    
  }

  ngAfterViewInit() {
    this.canvasElement = this.canvas.nativeElement;
    this.canvasContext = this.canvasElement.getContext('2d');
    this.videoElement = this.video.nativeElement;
  }

  // Helper functions 
  async showQrToast() {
    const toast = await this.toastCtrl.create({
      message: `Open ${this.scanResult}?`,
      position: 'top',
      buttons: [
        {

          text: 'Open',
          handler: () => {
            window.open(this.scanResult, '_system', 'location=yes');
          }
        }
      ]
    });
    toast.present();
  }
 
  reset() {
    this.scanResult = null;
  }
 
  stopScan() {
    this.scanActive = false;
  }


  async startScan() {
    // Not working on iOS standalone mode!
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' }
      
    });
   
    this.videoElement.srcObject = stream;
    // Required for Safari
    this.videoElement.setAttribute('playsinline', true);
   
    this.loading = await this.loadingCtrl.create({});
    await this.loading.present();
   
    this.videoElement.play();
    requestAnimationFrame(this.scan.bind(this));
  }


  async scan() {
    if (this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA) {
      if (this.loading) {
        await this.loading.dismiss();
        this.loading = null;
        this.scanActive = true;
      }
   
      this.canvasElement.height = this.videoElement.videoHeight;
      this.canvasElement.width = this.videoElement.videoWidth;
   
      this.canvasContext.drawImage(
        this.videoElement,
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );
      const imageData = this.canvasContext.getImageData(
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert'
      });
   
      if (code) {

        let currentDate = Date.now();

        this.scanActive = false;
        this.scanResult = code.data;

        this.url = `"${this.scanResult}"`
        console.log(this.url)
        // window.location = this.scanResult;
        
        // this.AllResults = [this.scanResult];
        
        // this.showQrToast();
      } else {
        if (this.scanActive) {
          requestAnimationFrame(this.scan.bind(this));
        }
      }
    } else {
      requestAnimationFrame(this.scan.bind(this));
    }

  }


captureImage() {
  this.fileinput.nativeElement.click();
}
 
handleFile(files: FileList) {
  const file = files.item(0);
 
  var img = new Image();
  img.onload = () => {
    this.canvasContext.drawImage(img, 0, 0, this.canvasElement.width, this.canvasElement.height);
    const imageData = this.canvasContext.getImageData(
      0,
      0,
      this.canvasElement.width,
      this.canvasElement.height
    );
    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: 'dontInvert'
    });
 
    if (code) {
      this.scanResult = code.data;
      // this.showQrToast();
    }
  };
  img.src = URL.createObjectURL(file);
}

log: any;
lat: any;

currentLocation(): void{


  let timestamp ;
  this.geolocation.getCurrentPosition().then((resp) => {
    this.latitude = resp.coords.latitude;
    this.logitude = resp.coords.longitude;
    timestamp = resp.timestamp;

    let mydate = new Date(timestamp); //Getting date from geolocation
    console.log(mydate.toDateString());

    console.log(resp);

    let location ;
    let houseNumber;

    this.locationApi.getLocation(this.latitude, this.logitude)
    .subscribe(res => {
      console.log(res);

      location = res.features[0].properties.formatted;
      houseNumber = res.features[0].properties.housenumber,

      console.log(location);
      console.log("House number "+houseNumber+ " Media Mill");
      alert(location + "House number "+houseNumber+ " Media Mill")
    })

    
    
   }).catch((error) => {
     console.log('Error getting location', error);
   });
   
   let watch = this.geolocation.watchPosition();

   console.log(watch);
   
   watch.subscribe((data) => {
    // data can be a set of coordinates, or an error (if an error occurred).
    // this.lat = data.coords.latitude
    // this.log = data.coords.longitude
   });
}



}

