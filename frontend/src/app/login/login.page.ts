import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage implements OnInit{
  form: FormGroup

  

  constructor(private fb:FormBuilder, private router: Router) {}
  ngOnInit(): void{
    this.form = this.fb.group({
      email:  new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }

  onsubmit(form: FormGroup){
    console.log('valid?',form.valid);
    console.log('password',form.value.password);
    console.log('email',form.value.email);
  
  }

  get f(){
    return this.form.controls;
  }
  submit(){
    console.log(this.form.value);
  }


  get email() {
    return this.form.get('email');

  }

  get password() {
    return this.form.get('password');
  }
}