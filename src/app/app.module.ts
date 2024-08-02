import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { provideRouter, RouteReuseStrategy } from '@angular/router';
import { IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { routes } from './app.routes';



@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    HttpClientModule,

  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    provideRouter(routes)
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
