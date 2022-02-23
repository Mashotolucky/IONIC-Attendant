
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { ErrorHandlerService } from './error-handler.service';
import { environment } from 'src/environments/environment';
import { Attendance } from '../Models/attendance';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class AttendenceService {
  temperature: any;

  covidStatus: any;
  authToken: any;

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  private httpOptions: { headers: HttpHeaders } = {

    headers: new HttpHeaders({ 'Content-Type': 'application/json' ,
    'Authorization': `Bearer ${localStorage.getItem('CapacitorStorage.token')}`}),
  };
  ngOnInit() {
    this.getToken();
  }

  setTemperature(temperature: any): void{
    this.temperature = temperature;
  }

  setCovidStatus(status: any): void{
    this.covidStatus = status;

  }

  getTemperature(): any{
    return this.temperature;
  }

  getCovidStatus(): any{
    return this.covidStatus;
  }


  // getSelectedAttendance(params) {
  //   return this.http
  //     .get<Attendance[]>(`${environment.baseApiUrl}/attendance${params}`)
  //     .pipe(
  //       tap((attendence: Attendance[]) => {
  //         if (attendence.length === 0) throw new Error('No attendence to retrieve');
  //       }),
  //       catchError(
  //         this.errorHandlerService.handleError<Attendance[]>('getSelectedPosts', [])
  //       )
  //     );
  // }

  createAttendance(data: Object) {
    console.log("m here")
    console.log(data);
    return this.http
      .post<Attendance>(`${environment.baseApiUrl}/attendance`, { data }, this.httpOptions)
  }
  getToken(){
    const Token = Storage.get({
      key: 'token',
    })
    this.authToken = Token;
    
  }
  // updateAttendance(attendanceId: number, body: string) {
  //   return this.http
  //     .put(
  //       `${environment.baseApiUrl}/attendance/${attendanceId}`,
  //       { body },
  //       this.httpOptions
  //     )
  //     .pipe(take(1));
  // }

  // deleteAttendance(attendanceId: number) {
  //   return this.http
  //     .delete(`${environment.baseApiUrl}/attendance/${attendanceId}`)
  //     .pipe(take(1));
  // }


}
