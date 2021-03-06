import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";
import { NewUser } from '../models/newUser.model';
import { Role, User } from '../models/user.model';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserResponse } from '../models/userResponse.model';


import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  setRedirectUrl(url: string) {
    throw new Error('Method not implemented.');
  }
  private user$ = new BehaviorSubject<User>(null);
 
  private userID : any;

  constructor(private http: HttpClient, private router: Router) { }
  private httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  get userStream(): Observable<User> {
    return this.user$.asObservable();
  }
  get isUserLoggedIn(): Observable<boolean> {
    return this.user$.asObservable().pipe(
      switchMap((user: User) => {
        const isUserAuthenticated = user !== null;
        return of(isUserAuthenticated);
      })
    );
  }

  get userRole(): Observable<Role> {
    return this.user$.asObservable().pipe(
      switchMap((user: User) => {
        return of(user?.role); // for after signed out, but still subscribed
      })
    );
  }

  get userId(): Observable<number> {
    return this.user$.asObservable().pipe(
      switchMap((user: User) => {
        return of(user.id);
      })
    );
  }

  get userFullName(): Observable<string> {
    return this.user$.asObservable().pipe(
      switchMap((user: User) => {
        if (!user) {
          return of(null);
        }
        const fullName = user.firstName + ' ' + user.lastName;
        return of(fullName);
      })
    );
  }

  register(newUser: NewUser): Observable<User> {
    return this.http
      .post<User>(
        `${environment.baseApiUrl}/auth/register`,
        newUser,
        this.httpOptions,
        
      )
      .pipe(take(1));
      
  }

  login(email: string, password: string): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>(
        `${environment.baseApiUrl}/auth/login`,
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
            const decodedToken: UserResponse = jwt_decode(response.token);
            console.log(decodedToken);
            this.user$.next(decodedToken.user);
  
            this.userID = decodedToken.user;
          }
         

          console.log(this.userID.id);
          this.setUserID()
          // this.loggedIn();
          
        })
      );
  }

  isTokenInStorage(): Observable<boolean> {
    return from(
      Storage.get({
        key: 'token',
      })
    ).pipe(
      map((data: { value: string }) => {
        if (!data || !data.value) return null;

        const decodedToken: UserResponse = jwt_decode(data.value);
        const jwtExpirationInMsSinceUnixEpoch = decodedToken.exp * 1000;
        const isExpired =
          new Date() > new Date(jwtExpirationInMsSinceUnixEpoch);

        if (isExpired) return null;
        if (decodedToken.user) {
          this.user$.next(decodedToken.user);
          return true;
        }
      })
    );
  }

  setUserID(){
    console.log("function "+this.userID.id)
    return this.userID.id;
  }

  logout(): void {
    this.user$.next(null);
    Storage.remove({ key: 'token' });
    this.router.navigateByUrl('/welcome-page');
  }
  state : boolean;
  loggedIn(){
  
    this.state = !!localStorage.getItem('CapacitorStorage.token')
    console.log(this.state);
    
    return this.state;
  }
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('CapacitorStorage.token')!);
    return user !== 'null' ? true : false;
  }
 
  
}


