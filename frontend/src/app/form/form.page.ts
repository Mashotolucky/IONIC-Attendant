import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { AttendenceService } from '../services/attendence.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {
  
  

   form = new FormGroup({
    firstName:  new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      employeeNo: new FormControl('', [Validators.required, Validators.minLength(4)]),
      temperature: new FormControl('',Validators.required),
      checked: new FormControl(Validators.required)
  })





  constructor(private formBuilder:FormBuilder,private attendentService:AttendenceService) {
    console.log(this.form)
  }
  

  ngOnInit(): void {
  
  }

  setCovidStatus(){
    this.attendentService.setCovidStatus(this.form.value.checked);
    console.log("checked = "+this.form.value.checked);
  }

  post(){
    console.log(this.form.value);
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
