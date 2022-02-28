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
    console.log(this.form)
  }
  

  ngOnInit(): void {
   this.getUUID();
  
  }

  setCovidStatus(){
    this.attendentService.setCovidStatus(this.form.value.checked);
    console.log("checked = "+this.form.value.checked);
  }

  post(){
   
    console.log(this.form.value);
    this.attendance = {

    firstName: this.form.value.firstName,
    lastName: this.form.value.lastName,
    employeeNumber: this.form.value.employeeNumber,
    temperature: this.form.value.temperature,
    covid_symptoms_status: this.form.value.covid_symptoms_status, 
    location: this.location,
    time: this.time,
    date: this.date,
    phoneID: this.getUUID().toString(),
    }
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

getUUID(){
  const info = Device.getId();

  info.then((deviceid)=>
  {
    console.log(deviceid.uuid);
  }
  );
  return info;
}
}
