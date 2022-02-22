import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Attendence } from '../Models/attendece';

@Injectable({
  providedIn: 'root'
})
export class AttendenceService {

  BaseUrl = '';

  temperature: any;
  covidStatus: any;

  constructor(private http: HttpClient) { }

  attendence(body: Attendence): Observable<any> {
    return this.http.post(this.BaseUrl,body);
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

}
