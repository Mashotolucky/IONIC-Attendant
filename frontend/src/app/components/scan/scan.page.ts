import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { LoadingController, Platform, ToastController } from '@ionic/angular';

import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

import jsQR from 'jsqr';
import { LocationService } from '../../service/location.service';

import { Attendence } from '../../Models/attendece';
import { AttendenceService } from '../../service/attendence.service';

import { HttpClient } from '@angular/common/http';


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
  private url: any;
  loading: HTMLIonLoadingElement = null;


  AllResults = [];


  latitude: any;
  logitude: any;

  userIP: any;

  attendence :Attendence ;

  temp: any;
  date: any;
  time: any;
  location: any;

  form: FormGroup
  myDate: FormControl = new FormControl('', Validators.required)


  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private plt: Platform,
    private fb: FormBuilder,
    private geolocation: Geolocation,
    private locationApi: LocationService,
    private attendentService: AttendenceService,
    private httpClient: HttpClient,
    
  
  ) {

    const isInStandaloneMode = () =>
      'standalone' in window.navigator && window.navigator['standalone'];
    if (this.plt.is('ios') && isInStandaloneMode()) {
      console.log('I am a an iOS PWA!');
      // E.g. hide the scan functionality!
    }

  }

  ngOnInit() {

    // this.currentLocation();

    this.loadIp();

    this.getTemperature();

    

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

 //Generate live QR scanner
  async startScan() {

    if (this.userIP === '154.0.14.211') {
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

      this.currentLocation();
      this.postAttendenceData();
    
    }
    else{
      alert('Your Are not in Digital Academy');

    }

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

        this.scanActive = false;
        this.scanResult = code.data;

        this.url = `"${this.scanResult}"`

        this.showQrToast();
      } else {
        if (this.scanActive) {
          requestAnimationFrame(this.scan.bind(this));
        }
      }
    } else {
      requestAnimationFrame(this.scan.bind(this));
    }

  }

  //capture qr code
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

  currentLocation(): void {

    let timestamp;

    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.logitude = resp.coords.longitude;

      timestamp = resp.timestamp;

      let mydate = new Date(timestamp); //Getting date from geolocation
      console.log(mydate.toDateString());

      this.date = mydate.toDateString();
      this.time = mydate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

      console.log(mydate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }));

      console.log(resp);

      
      let houseNumber;

      this.locationApi.getLocation(this.latitude, this.logitude)
        .subscribe(res => {
          console.log(res);

          this.location = res.features[0].properties.formatted;
          houseNumber = res.features[0].properties.housenumber,

            console.log(this.location);
          console.log("House number " + houseNumber + " Media Mill");
          alert(location + "House number " + houseNumber + " Media Mill")
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

  loadIp() {
    this.httpClient.get('https://jsonip.com').subscribe(
      (value: any) => {
        console.log(value);
        this.userIP = value.ip;

        console.log(this.userIP);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getTemperature(): number{
   
   this.temp = this.attendentService.getTemperature();

    console.log("Temperature = "+ this.temp);
    return this.temp;
  }


 async postAttendenceData(){
    console.log("here")
    
    const tempe = this.getTemperature()
    console.log(tempe);
    this.attendence.temperature = tempe;
    console.log(this.attendence.temperature);
    this.attendence.covid_symptoms_status = false;
    this.attendence.date = ''
    this.attendence.time = await this.time;
    this.attendence.location = await this.location;

   
  }

}

