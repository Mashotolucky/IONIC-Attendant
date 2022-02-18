import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  private formTemp : FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formTemp = this.formBuilder.group({
      temperature: ['', Validators.required]})
  }

  ngOnInit() {
    
  }


 
}
