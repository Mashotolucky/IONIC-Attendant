import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Attendence } from '../Models/attendece';

@Injectable({
  providedIn: 'root'
})
export class AttendenceService {

  BaseUrl = '';
  constructor(private http: HttpClient) { }

  attendence(body: Attendence): Observable<any> {
    return this.http.post(this.BaseUrl,body);
  }
  
}
