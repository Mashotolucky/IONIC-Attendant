import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
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

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
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
    
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
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
})
export class AppModule {}
