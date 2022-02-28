import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';

import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  
  canActivate(route: ActivatedRouteSnapshot): boolean
  {
    console.log("false");
    if(!this.authService.loggedIn())
    {
      console.log("true");
      window.alert('Access Denied, Login is Required to Access This Page!');
      this.router.navigate(['welcome-page']);
      return false;
    }
    // if (!this.authService.isLoggedIn) {
    //   console.log(this.authService.isLoggedIn);
      
    //   window.alert('Access Denied, Login is Required to Access This Page!');
    //   this.router.navigate(['welcome-page']);
    // }
    return true;
  }

  
}