import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AdminResponse } from '../Models/adminResponse.model';
import { Admin } from '../Models/admin.model';
import jwt_decode from "jwt-decode";
import { Storage } from '@capacitor/storage';
import { Attendance } from '../Models/attendance';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private admin$ = new BehaviorSubject<Admin>(null);

  constructor(private errorHandlerService: ErrorHandlerService,private http: HttpClient,private httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  }) { }
  
  login(email: string, password: string): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>(
        `${environment.baseApiUrl}/auth/log`,
        { email, password },
        this.httpOptions
      )
      .pipe(
        take(1),
        tap((response: { token: string }) => {
          Storage.set({
            key: 'token',
            value: response.token,
          });
          if(response.token){
            const decodedToken: AdminResponse = jwt_decode(response.token);
            console.log(decodedToken);
            this.admin$.next(decodedToken.user);
          }
         

          // this.loggedIn();
          
        })
      );
  }
  getAllAttendances(){
    return this.http.get<Attendance>(`${environment.baseApiUrl}/attendance`,this.httpOptions)
  }

   getSelectedAttendance(params: any) {
    return this.http
      .get<Attendance[]>(`${environment.baseApiUrl}/attendance/${params}`)
      .pipe(
        tap((attendence: Attendance[]) => {
          if (attendence.length === 0) throw new Error('No attendence to retrieve');
        }),
        catchError(
          this.errorHandlerService.handleError<Attendance[]>('getSelectedPosts', [])
        )
      );
  }

}
