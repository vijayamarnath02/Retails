import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InfiniteScrollCustomEvent, IonicModule, ToastController } from '@ionic/angular';
import { ProductaddService } from '../Api/productadd.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class Tab2Page {
  productlist: any = [];
  constructor(private toster: ToastController, private productServices: ProductaddService) { }
  ionViewWillEnter(): void {
    this.getAlldetails();
  }
  getAlldetails() {
    this.productServices.getAllProductDetails().subscribe((data: any) => {
      this.productlist = data.success;
    })
  }
  onSearch(event: any) {
    if (event.target.value.length > 0) {
      this.productServices.getSearchDetails(event.target.value).subscribe((data: any) => {
        this.productlist = data.success;
      })
    }
    else {
      this.getAlldetails();
    }

  }
  onIonInfinite(ev: any) {
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
}
