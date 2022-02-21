import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup,FormBuilder , FormControl, Validators} from '@angular/forms';
import { User } from '../../Models/user.model';
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
  
  user = {
    Email: '',
    Name: '',
    Surname: '',
    Password: '',
    employeeNo: ''
  };

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

  onSubmit() {
    const { email, password } = this.form.value;
    const { firstName, lastName,employeeNumber} = this.form.value;
    if (!email || !password! || firstName || !lastName) return;

      const newUser: NewUser = { firstName, lastName, email, password,employeeNumber };

      return this.authService.register(newUser).subscribe(() => {
        this.router.navigateByUrl('/login');
        
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
  
  

