import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/guard/auth.guard';



const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./components/dashboard/dashboard.module').then( m => m.DashboardPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'splash',
    loadChildren: () => import('./components/splash/splash.module').then( m => m.SplashPageModule),
    
   
  },
  {
    path: 'scan',
    loadChildren: () => import('./components/scan/scan.module').then( m => m.ScanPageModule),
    canActivate: [AuthGuard]
  },
  
  {
    path: 'welcome-page',
    loadChildren: () => import('./components/welcome-page/welcome-page.module').then( m => m.WelcomePagePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./components/login/login.module').then( m => m.LoginPageModule)
  },
  {
        path: 'register',
        loadChildren: () => import('./components/register/register.module').then( m => m.RegisterPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./components/profile/profile.module').then( m => m.ProfilePageModule),
        canActivate: [AuthGuard]
      },
  
  {
    path: 'tab-bar',
    loadChildren: () => import('./tab-bar/tab-bar.module').then( m => m.TabBarPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'success',
    loadChildren: () => import('./success/success.module').then( m => m.SuccessPageModule),
    canActivate: [AuthGuard]
  },
  
  
  {
    path: 'attendance',
    loadChildren: () => import('./components/attendance/attendance.module').then( m => m.AttendancePageModule),
    canActivate: [AuthGuard]
  },
     
 
     
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }