import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AttendenceService } from 'src/app/services/attendence.service';
import { Storage } from '@capacitor/storage';
import jwt_decode from "jwt-decode";
import { UserResponse } from 'src/app/models/userResponse.model';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.page.html',
  styleUrls: ['./attendance.page.scss'],
})
export class AttendancePage implements OnInit {
  authToken: any;
  attendance: any;

  constructor(private router: Router,
    private attendanceService:  AttendenceService) { }

  ngOnInit() {
    this.getDecodedToken();
    this.getUserAttendance();
  }

   getUserAttendance(){
     let id = this.getDecodedToken();
      this.attendanceService.getSelectedAttendance(id).subscribe((res) =>{
        console.log(res);
        this.attendance = res;
        console.log(this.attendance);

      });
   }

  //  getToken(){
  //   this.authToken = localStorage.getItem('CapacitorStorage.token')
  //   return this.authToken;
    
  // }
  response:any;
  getDecodedToken(){
    this.response = localStorage.getItem('CapacitorStorage.token');
    if(this.response){
      const decodedToken: UserResponse = jwt_decode(this.response);
    console.log(decodedToken.user.id);
    return decodedToken.user.id;
    }
    

    

  }
 

}
