import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

import { AttendenceService } from '../../services/attendence.service';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {


  targetId: any;

  formTemp = new FormGroup({
    temperature: new FormControl(Validators.required)
  })

  tempForm = new FormGroup({
    checked: new FormControl('', Validators.required)
  })


  constructor(private formBuilder: FormBuilder, menu: MenuController, private attendentService: AttendenceService, private router:Router) {

  }

  ngOnInit() {

    this.formTemp = this.formBuilder.group({
      temperature: []
    });
    // this.onSubmit()
    this.tempForm = this.formBuilder.group({
      checked: []
    });

    // this.setCovidStatus();
  }


  onSubmit() {
    this.tempForm.valueChanges;

    console.log(this.tempForm.valueChanges);

  }

  setTemperature(): void {
    this.attendentService.setTemperature(this.formTemp.value.temperature);

    console.log(this.formTemp.value.temperature);
    console.log("checked = "+this.tempForm.value.checked);
  }

  eventCheck(e){

    this.targetId = e.target.id
    console.log(e.target.id);
  }

  setCovidStatus(){
    this.attendentService.setCovidStatus(this.tempForm.value.checked);
    console.log("checked = "+this.tempForm.value.checked);
  }
  

  // profile()
  // {
    
  //   this.router.navigate(['/profile']);
  // }

  // test() {
  //   console.log('route');

  // }
}
