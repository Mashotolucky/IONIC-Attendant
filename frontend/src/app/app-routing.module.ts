import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  {
    path: 'splash',
    loadChildren: () => import('./components/splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./components/splash/splash.module').then( m => m.SplashPageModule)
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
      }
  
     
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }