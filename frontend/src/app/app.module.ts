import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [  
            BrowserModule, 
            IonicModule.forRoot(), 
            AppRoutingModule, 
            ReactiveFormsModule, 
            FormsModule
          ],
  providers: [
    
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
