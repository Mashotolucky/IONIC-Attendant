import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Device } from '@capacitor/device';
import { Attendance } from '../models/attendance';

import { AttendenceService } from '../services/attendence.service';

import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { HttpClient } from '@angular/common/http';
import { LocationService } from '../services/location.service';

import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {
  
  attendance: Attendance;

  latitude: any;
  logitude: any;

  date: any;
  time: any;
  location: any;

  userIP: any;

   form = new FormGroup({
    firstName:  new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      employeeNo: new FormControl('', [Validators.required, Validators.minLength(4)]),
      temperature: new FormControl('',Validators.required),
      checked: new FormControl(Validators.required)
  })





  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private attendentService:AttendenceService, 
    private httpClient: HttpClient,
    private geolocation: Geolocation,
    private locationApi: LocationService,) {
    // console.log(this.form)
  }
  

  ngOnInit(): void {
  //  console.log(this.getUUID());
  //  console.log(this.varr)

  console.log(this.getUUID());
   
    this.currentLocation();
    this.IPAdress();
  }

  setCovidStatus(){
    this.attendentService.setCovidStatus(this.form.value.checked);
    console.log("checked = "+this.form.value.checked);
  }
  var : any = this.getUUID();


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

      const datepipe: DatePipe = new DatePipe('en-US')
      let mydate = new Date(timestamp); //Getting date from geolocation
      console.log(mydate);

      this.date = datepipe.transform(mydate, 'dd-MM-YYYY');
      console.log(this.date);

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

  setLocation(){
    this.attendentService.setLocation(this.location)
    console.log(this.location);
  }

    //getting ip address from jsonIP
    IPAdress() {
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

  varr: any;

  getUUID(): any {
    const info = Device.getId();
    // console.log()

    info.then((deviceid) => {
      //   console.log(deviceid.uuid);
      this.varr = (deviceid.uuid);
      console.log(this.varr);
      return this.varr;
    })
  }




  post(){
    // console.log(this.form.value);
    this.attendance = {

    firstName: this.form.value.firstName,
    lastName: this.form.value.lastName,
    employeeNumber: this.form.value.employeeNo,
    temperature: this.form.value.temperature,
    covid_symptoms_status: this.form.value.checked, 
    location: this.location,
    time: this.time,
    date: this.date,
    phoneID: this.varr,
    }
   
    console.log(this.attendance)
    this.attendentService.createAttendance(this.attendance).subscribe((res) => {
      console.log(res)
      console.log("we are oky")
      alert("Succesfully submitted your attendance");
     
      this.router.navigateByUrl('/success');
      
    });

  }
  get firstName() {
    return this.form.get('firstName');
}
get lastName() {
  return this.form.get('lastName');
}
get employeeNo() {
  return this.form.get('employeeNo');
}
get temperature() {
  return this.form.get('temperature');
}

 

}
