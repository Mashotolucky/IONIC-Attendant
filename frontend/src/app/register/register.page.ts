import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup,FormBuilder , FormControl, Validators} from '@angular/forms';
import { User } from '../model/user.model';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})


export class RegisterPage implements OnInit {

  form: FormGroup;
  
  user = {
    Email: '',
    Name: '',
    Surname: '',
    Password: '',
    employeeNo: ''
  };

  submitted = false;

  constructor(private fb: FormBuilder,
              private userService:ServicesService) {}


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
      Email:new FormControl('',[Validators.required,Validators.email]),
      Name:new FormControl('',[Validators.required,Validators.minLength(3)]),
      Surname:new FormControl('',[Validators.required,Validators.minLength(3)]),
      Password:new FormControl('',[Validators.required,Validators.minLength(7)]),
      Confirm:new FormControl('',[Validators.required,Validators.minLength(7)]),
      employeeNo:new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(9)])
    },
    {
      validator: [this.confirmPasswordMatch('Password','Confirm')]
    }
    )

    
  }

  onSubmit(form) {
    console.log(form.value);
    console.log("hello");


    this.userService.create(form.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

    get f(){
      return this.form.controls
    }
    submit(){
      console.log(this.form.value)
    }
    get Email()
    {
      return this.form.get('Email')
    }
    get Name()
    {
      return this.form.get('Name')
    }
    get Surname()
    {
      return this.form.get('Surname')
    }
    get Password()
    {
      return this.form.get('Password')
    }
    get employeeNo()
    {
      return this.form.get('employeeNo')
    }

    confirm(){
      alert("You have succefully Registered")
    }

    newUser(): void{

      this.submitted = false
      this.user = {
        Email: '',
        Name: '',
        Surname: '',
       Password:'',
       employeeNo:''

        
      };
    }
  
  }
  
  

