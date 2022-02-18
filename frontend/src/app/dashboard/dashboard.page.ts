import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator,FormControl, Validators} from '@angular/forms';
import { MenuController } from '@ionic/angular';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

   formTemp : FormGroup;
   tempForm : FormGroup;
 

  constructor(private formBuilder: FormBuilder, menu:MenuController) {
    this.formTemp = this.formBuilder.group({
      temperature: ['', Validators.required]})
     

    this.tempForm = this.formBuilder.group({
      yes_checkbox: [false],
      no_checkbox:[false]
    })  
    
  }

  ngOnInit() {

    this.onSubmit()
  }


  onSubmit(){
      this.tempForm.valueChanges;

      console.log(this.tempForm.valueChanges);
      
  }

}
