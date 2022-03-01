import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Device } from '@capacitor/device';
import { Attendance } from '../models/attendance';

import { AttendenceService } from '../services/attendence.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {
  
  attendance: Attendance;

   form = new FormGroup({
    firstName:  new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      employeeNo: new FormControl('', [Validators.required, Validators.minLength(4)]),
      temperature: new FormControl('',Validators.required),
      checked: new FormControl(Validators.required)
  })





  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private attendentService:AttendenceService) {
    // console.log(this.form)
  }
  

  ngOnInit(): void {
  //  console.log(this.getUUID());
  //  console.log(this.varr)

  console.log(this.getUUID());
   
  
  }

  setCovidStatus(){
    this.attendentService.setCovidStatus(this.form.value.checked);
    console.log("checked = "+this.form.value.checked);
  }
  var : any = this.getUUID();

  post(){
   
    // console.log(this.form.value);
    this.attendance = {

    firstName: this.form.value.firstName,
    lastName: this.form.value.lastName,
    employeeNumber: this.form.value.employeeNo,
    temperature: this.form.value.temperature,
    covid_symptoms_status: this.form.value.checked, 
    location: localStorage.getItem('location'),
    time: localStorage.getItem('time'),
    date: localStorage.getItem('date'),
    phoneID: localStorage.getItem('_capuid'),
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
varr: String;

getUUID(): any {
  const info = Device.getId();
  // console.log()

  info.then((deviceid)=>
  {
  //   console.log(deviceid.uuid);
    this.varr = (deviceid.uuid);
    console.log(this.varr);
     return this.varr;
  })
}
 
 

}
