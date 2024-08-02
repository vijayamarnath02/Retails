import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { add, closeOutline } from 'ionicons/icons';
import { ProductaddService } from '../Api/productadd.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink, FormsModule, ReactiveFormsModule, HttpClientModule],
})
export class Tab1Page {
  isModalOpen: boolean = false;
  productForm: any = FormGroup;
  productData: any = [];
  userCount: any = {
    products: 0,
    users: 0,
    shops: 0,
    completed: 0
  };
  message: any = '';
  constructor(private formBuilder: FormBuilder, private servicesData: ProductaddService, private toastController: ToastController) {
    addIcons({ add, closeOutline });
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      productId: ['', Validators.required],
      productQuantity: ['', Validators.required],
      productType: ['', Validators.required],
      amount: ['', Validators.required],
    });
  }
  ionViewWillEnter(): void {
    this.getProductList();
    this.getCountDetails();
  }
  getCountDetails(): void {
    this.servicesData.getProductAndUserCount().subscribe((data: any) => {
      this.userCount = data.success;
    })
  }
  getProductList() {
    this.servicesData.getProductDropDown().subscribe((data: any) => {

      this.productData = data.success;

    }, (error) => {

    })
  }
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  onSubmit() {

    if (this.productForm.valid) {
      this.servicesData.postProductData(this.productForm.value).subscribe((data: any) => {
        this.presentToast(data.success);
        this.setOpen(false);
      }, (error) => {
        this.presentToast(error.error.error);
      })
    } else {
      this.productForm.markAsTouched();
      this.presentToast("Form Invalid");
    }
  }
  async presentToast(message: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom',
    })
    await toast.present();
  }
}
