import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserResponse } from 'src/app/models/userResponse.model';
import { AuthService } from 'src/app/services/auth.service';
import { Device } from '@capacitor/device';

import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage implements OnInit{

  public form: FormGroup
  private response:any;
  

  constructor(private formBuilder:FormBuilder, private router: Router,
    private authService: AuthService) {}
  ngOnInit(): void{
    this.form = this.formBuilder.group({
      email:  new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
    const userAgent = window.navigator.userAgent;
    console.log(userAgent);
    const info = Device.getId();

   info.then((deviceid)=>
   {
     console.log(deviceid.uuid);
   }
   );
    
  }

  getDecodedToken(){
    this.response = localStorage.getItem('CapacitorStorage.token');
    if(this.response){
      const decodedToken: UserResponse = jwt_decode(this.response);
      // console.log(decodedToken.user.id);
      return decodedToken.user.id;

    }
    
    
  
      
    }

  onSubmit() {
    const { email, password } = this.form.value;
    console.log(typeof(this.form.value))
    if (!email || !password) return;

      return this.authService.login(email, password).subscribe(() => {
        this.getDecodedToken();
        console.log(this.getDecodedToken());
        
        this.router.navigateByUrl('/tab-bar');
      });
    }
 
 

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


