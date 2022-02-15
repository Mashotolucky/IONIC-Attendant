import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage implements OnInit{

  public form: FormGroup

  

  constructor(private formBuilder:FormBuilder, private router: Router) {}
  ngOnInit(): void{
    this.form = this.formBuilder.group({
      email:  new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
    
  }

  onSubmit(form){
    console.log(form);
  
  }

  // get f(){
  //   return this.form.controls;
  // }
  submit(form){
    console.log(this.form.value);
  }


  get email() {
    return this.form.get('email');

  }

  get password() {
    return this.form.get('password');
  }
}