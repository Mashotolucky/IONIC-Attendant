import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import { Dialogs } from '@awesome-cordova-plugins/dialogs/ngx';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { UserAgent } from '@ionic-native/user-agent';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
        BrowserModule, 
        IonicModule.forRoot(),
        AppRoutingModule,
        NgbModule,
        TabsModule.forRoot(),
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        
      ],

  providers: [BarcodeScanner,Geolocation, QRScanner,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, Dialogs],
  bootstrap: [AppComponent],
})
export class AppModule {};

