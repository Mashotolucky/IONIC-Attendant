
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { environment } from 'src/environments/environment';
import { Attendence } from '../Models/attendance';

@Injectable({
  providedIn: 'root'
})
export class AttendenceService {
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  private httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getSelectedAttendance(params) {
    return this.http
      .get<Attendence[]>(`${environment.baseApiUrl}/attendance${params}`)
      .pipe(
        tap((attendence: Attendence[]) => {
          if (attendence.length === 0) throw new Error('No attendence to retrieve');
        }),
        catchError(
          this.errorHandlerService.handleError<Attendence[]>('getSelectedPosts', [])
        )
      );
  }

  createPost(body: string) {
    return this.http
      .post<Attendence>(`${environment.baseApiUrl}/attendance`, { body }, this.httpOptions)
      .pipe(take(1));
  }

  updateAttendance(attendanceId: number, body: string) {
    return this.http
      .put(
        `${environment.baseApiUrl}/attendance/${attendanceId}`,
        { body },
        this.httpOptions
      )
      .pipe(take(1));
  }

  deleteAttendance(attendanceId: number) {
    return this.http
      .delete(`${environment.baseApiUrl}/attendance/${attendanceId}`)
      .pipe(take(1));
  }


}
