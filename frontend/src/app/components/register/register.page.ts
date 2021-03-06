import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup,FormBuilder , FormControl, Validators} from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { NewUser } from 'src/app/models/newUser.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})


export class RegisterPage implements OnInit {

  form: FormGroup;
  
  user: NewUser;

  submitted = false;
  ipAddress: any;



  constructor(private fb: FormBuilder,
             private authService: AuthService,
              private http:HttpClient,
              private router: Router) {}


  confirmPasswordMatch(controlName: string, matchingControlName: string) 
  {     return (formGroup: FormGroup) => {   
        const control = formGroup.controls[controlName];   
            const matchingControl = formGroup.controls[matchingControlName]; 
                   //set an error on matchingControl if validation fails   
                       if (control.value !== matchingControl.value) {       
                           matchingControl.setErrors({ confirmPasswordMatch: true });  
                           } 
      else {matchingControl.setErrors(null);}};

   }





  ngOnInit(): void{
    this.form=this.fb.group({
      email:new FormControl('',[Validators.required,Validators.email]),
      firstName:new FormControl('',[Validators.required,Validators.minLength(3)]),
      lastName:new FormControl('',[Validators.required,Validators.minLength(3)]),
      password:new FormControl('',[Validators.required,Validators.minLength(7)]),
      Confirm:new FormControl('',[Validators.required,Validators.minLength(7)]),
      employeeNumber:new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(9)])
    },
    {
      validator: [this.confirmPasswordMatch('password','Confirm')]
    }
    )
    const userAgent = window.navigator.userAgent;
      console.log(userAgent);
      this.getIPAddress();

    
  }
  getIPAddress()
  {
    this.http.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{
      this.ipAddress = res.ip;
      console.log(this.ipAddress)
    });
  }

  // onSubmit(form) {
  //   console.log(form.value);
  //   console.log("hello");


  //   this.userService.create(form.value)
  //     .subscribe({
  //       next: (res) => {
  //         console.log(res);
  //         this.submitted = true;
  //       },
  //       error: (e) => console.error(e)
  //     });
  // }
  onSubmit() {
    console.log(this.form.value);
  

    this.authService.register(this.form.value).subscribe((res) => {
          alert("Succesfully created an account");
          this.router.navigateByUrl('/login');
          
        });

    }
  

    get f(){
      return this.form.controls
    }
    submit(){
      console.log(this.form.value)
    }
    get email()
    {
      return this.form.get('email')
    }
    get firstName()
    {
      return this.form.get('firstName')
    }
    get lastName()
    {
      return this.form.get('lastName')
    }
    get password()
    {
      return this.form.get('password')
    }
    get employeeNumber()
    {
      return this.form.get('employeeNumber')
    }

    confirm(){
      alert("You have succefully Registered")
    }

    
    
  
  }
  
  

