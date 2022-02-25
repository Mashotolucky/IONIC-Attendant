import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// import { CanActivateRouteGuard } from './can-activate-route.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TabsModule } from 'ngx-bootstrap/tabs';

// <<<<<<< HEAD
// =======
// import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//
// import { FormsModule,ReactiveFormsModule } from '@angular/forms';

// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { HttpClientModule } from '@angular/common/http';
// >>>>>>> feature/signup

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import { Dialogs } from '@awesome-cordova-plugins/dialogs/ngx';

// import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
// import { HttpClient, HttpClientModule } from '@angular/common/http';

import { UserAgent } from '@ionic-native/user-agent';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
// <<<<<<< HEAD
// <<<<<<< HEAD
  imports: [  
            BrowserModule, 
            IonicModule.forRoot(), 
            AppRoutingModule, 
            ReactiveFormsModule, 
            FormsModule,
            HttpClientModule,
          
            TabsModule.forRoot(),
          ],
  providers: [
    
    BarcodeScanner,Geolocation, QRScanner, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Dialogs],
  bootstrap: [AppComponent]
// =======
//   imports: [
//         BrowserModule, 
//         IonicModule.forRoot(),
//         AppRoutingModule,
//        
//         FormsModule,
//         ReactiveFormsModule,
//         
//       ],

//   providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
//   bootstrap: [AppComponent],
// >>>>>>> feature/signup
// =======
//   imports: [
//         BrowserModule, 
//         IonicModule.forRoot(),
//         AppRoutingModule,
//         NgbModule,
//         TabsModule.forRoot(),
//         ReactiveFormsModule,
//         FormsModule,
//         HttpClientModule,
        
//       ],

//   providers: [BarcodeScanner,Geolocation, QRScanner,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, Dialogs],
//   bootstrap: [AppComponent],
// >>>>>>> feature/dashboard
})
export class AppModule {};

