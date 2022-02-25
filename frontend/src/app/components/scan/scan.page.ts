import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { LoadingController, Platform, ToastController } from '@ionic/angular';

import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

import jsQR from 'jsqr';
import { LocationService } from '../../services/location.service';

import { Attendance } from '../../Models/attendance';
import { AttendenceService } from '../../services/attendence.service';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


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
  attendence :Attendance;

  // this.attendence = {
  //   temperature: '',
  //   covid_symptoms_status: null,
  //   date: '',
  //   time: '',
  //   location: ''
  // }

  temp: any;
  covidStatus: any;
  date: any;
  time: any;
  location: any;

  form: FormGroup
  myDate: FormControl = new FormControl('', Validators.required)
  data: any;


  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private plt: Platform,
    private fb: FormBuilder,
    private geolocation: Geolocation,
    private locationApi: LocationService,
    private attendentService: AttendenceService,
    private httpClient: HttpClient,
    private router: Router,
    
  
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

    this.getCovidStaus();

    
    

  }

  ngAfterViewInit() {
    this.canvasElement = this.canvas.nativeElement;
    this.canvasContext = this.canvasElement.getContext('2d');
    this.videoElement = this.video.nativeElement;
  }

  // Helper functions 
  //popup message for scanned data
  async showQrToast() {
    const toast = await this.toastCtrl.create({
      message: `Scanned `,
      position: 'top',
      buttons: [
        {
          text: 'Submit',
          handler: () => {
            // window.open(this.scanResult, '_system', 'location=yes');
            this.router.navigateByUrl('/success');
          }
        }
      ]
    });
    if(this.scanResult != null){
      toast.present();
    }
    
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

      // this.currentLocation(); 
    
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
    if (this.userIP === '154.0.14.211'){
      this.fileinput.nativeElement.click();
    }
    else{
      alert('Your Are not in Digital Academy');
    }
    
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

  //get current location and timestamp from geolocation

 currentLocation(){
   

    let timestamp;

    this.geolocation.getCurrentPosition().then(async (resp) => {
      //logitude and latitude
      this.latitude = resp.coords.latitude;
      this.logitude = resp.coords.longitude;

      timestamp = resp.timestamp;

      let mydate = new Date(timestamp); //Getting date from geolocation
      console.log(mydate.toDateString());

      this.date = mydate.toDateString();
      localStorage.setItem('date',this.date);

      this.time = mydate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
      localStorage.setItem('time',this.time);

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
          // alert("Please scan to attend");
          // window.location.reload();

          this.postAttendenceData();
          
        })

        this.display();

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

  //getting ip address from jsonIP
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

  //getting temperature from input box of dashboard component
  getTemperature(): any{
   
    try {
      this.temp = this.attendentService.getTemperature();
      return this.temp;
    } catch (error) {
      console.log("temperature err = "+ error);
      
    }
  }

  //getting covid status from checkbox of dashboard component
  getCovidStaus(): any{
    this.covidStatus = this.attendentService.getCovidStatus();
    console.log("status = "+ this.covidStatus);
    return this.covidStatus;
  }

//Providing values to model attendece 
  postAttendenceData(){

    console.log("here " + this.getCovidStaus())

    // this.currentLocation();
    
    const temperature = this.getTemperature();
    localStorage.setItem('temperature',temperature);

    const covidStatu = this.getCovidStaus();
    localStorage.setItem('status',covidStatu);

     this.attendence =  {
      temperature: localStorage.getItem('temperature'),
      covid_symptoms_status: localStorage.getItem('status'),
      date: this.date,
      time: this.time,
      location: this.location,

    }
    console.log("location"+ this.attendence.location)
    let test = typeof(this.attendence)
    console.log(test)
    this.attendentService.createAttendance(this.attendence).subscribe((res) => {
      console.log(res)
      console.log("we are oky")
      alert("Succesfully submitted your attendance");
      this.router.navigateByUrl('/tab-bar');
      
    });

   
  }

  display(): void{
    setTimeout(() => {
      console.log(this.data);
    }, 2000)
    
  }

}

