import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import jsQR from 'jsqr';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { AttendenceService } from 'src/app/services/attendence.service';
import { LocationService } from 'src/app/services/location.service';
import { Device } from '@capacitor/device';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {

  @ViewChild('video', { static: false }) video: ElementRef;
  @ViewChild('canvas', { static: false }) canvas: ElementRef;
  @ViewChild('fileinput', { static: false }) fileinput: ElementRef;

  canvasElement: any;
  videoElement: any;
  canvasContext: any;
  scanActive = false;
  scanResult = null;
  loading: HTMLIonLoadingElement = null;


  userIP: any;

  latitude: any;
  logitude: any;

  date: any;
  time: any;
  location: any;

  data: any;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private plt: Platform,
    private httpClient: HttpClient,
    private geolocation: Geolocation,
    private locationApi: LocationService,
    private attendentService: AttendenceService,
  ) {
    const isInStandaloneMode = () =>
      'standalone' in window.navigator && window.navigator['standalone'];
    if (this.plt.is('ios') && isInStandaloneMode()) {
      console.log('I am a an iOS PWA!');
      // E.g. hide the scan functionality!
    }

    const userAgent = window.navigator.userAgent;
    console.log(userAgent);
    const info = Device.getId();

    info.then((deviceid) => {
      console.log(deviceid.uuid);
    });
  }

  ngOnInit() {
    this.startScan();
    this.IPAdress();
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

    if (this.scanResult != '') {
      toast.present();
    }
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
        this.scanActive = false;
        this.scanResult = code.data;
        if (this.scanResult != null) {
          this.showQrToast();
        }
        else {
          this.ngOnInit();
        }
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
        if (this.scanResult != '') {
          this.showQrToast();
        }

      }
    };
    img.src = URL.createObjectURL(file);
  }


  //getting ip address from jsonIP
  IPAdress() {
    this.httpClient.get('https://jsonip.com').subscribe(
      (value: any) => {
        console.log(value);
        this.userIP = value.ip;
        localStorage.setItem('location', this.userIP)
        console.log(this.userIP);
      },
      (error) => {
        console.log(error);
      }
    );
  }


  lat: any;
  log: any;

  //get current location and timestamp from geolocation

  currentLocation() {


    let timestamp;

    this.geolocation.getCurrentPosition().then(async (resp) => {
      //logitude and latitude
      this.latitude = resp.coords.latitude;
      this.logitude = resp.coords.longitude;

      timestamp = resp.timestamp;

      let mydate = new Date(timestamp); //Getting date from geolocation
      console.log(mydate.toDateString());

      this.date = mydate.toDateString();
      localStorage.setItem('date', this.date);

      this.time = mydate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
      localStorage.setItem('time', this.time);

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
