import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder , FormControl, Validator, Validators} from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})


export class RegisterPage implements OnInit {

  myForm: FormGroup;

  constructor(private fb: FormBuilder) {}


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
    this.myForm=this.fb.group({
      Email:new FormControl('',[Validators.required,Validators.email]),
      Name:new FormControl('',[Validators.required,Validators.minLength(3)]),
      Surname:new FormControl('',[Validators.required,Validators.minLength(3)]),
      Password:new FormControl('',[Validators.required,Validators.minLength(7)]),
      Confirm:new FormControl('',[Validators.required,Validators.minLength(7)])
    },
    {
      validator: [this.confirmPasswordMatch('Password','Confirm')]
    }
    )

    
  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log('Email', form.value.Email);
    console.log('Name', form.value.Name);
    console.log('Surname', form.value.Surname);
    console.log('Password', form.value.Password);

  }
  get f(){
    return this.myForm.controls
  }
  submit(){
    console.log(this.myForm.value)
  }
  get Email()
  {
    return this.myForm.get('Email')
  }
  get Name()
  {
    return this.myForm.get('Name')
  }
  get Surname()
  {
    return this.myForm.get('Surname')
  }
  get Password()
  {
    return this.myForm.get('Password')
  }
  
  }
  
  

