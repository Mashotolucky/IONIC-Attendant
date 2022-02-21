import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Attendence } from '../Models/attendance';

@Injectable({
  providedIn: 'root'
})
export class AttendenceService {

  BaseUrl = '';

  temperature: any;

  constructor(private http: HttpClient) { }

  attendence(body: Attendence): Observable<any> {
    return this.http.post(this.BaseUrl,body);
  }

  setTemperature(temp: any): void{
    this.temperature = temp;
  }

  getTemperature(): any{
    return this.temperature;
  }

}
