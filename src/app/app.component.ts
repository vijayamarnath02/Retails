import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { AuthService } from './Api/auth.service';
import { ProductaddService } from './Api/productadd.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, HttpClientModule],
  providers: [
    AuthService,
    ProductaddService,
  ],
})
export class AppComponent {
  constructor() { }
}
