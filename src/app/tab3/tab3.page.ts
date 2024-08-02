import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InfiniteScrollCustomEvent, IonicModule, IonModal, ToastController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { add, closeOutline } from 'ionicons/icons';

import { Router } from '@angular/router';
import { ProductaddService } from '../Api/productadd.service';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, ReactiveFormsModule, CommonModule],
})
export class Tab3Page {
  @ViewChild(IonModal) modal: any = IonModal;
  shopDetailsForm: any = FormGroup;
  isToastOpen: boolean = false;
  message: string = '';
  name: string = '';
  productlist: any = [];
  isModalOpen = false; selectedProduct: string = '';
  showQuantityInput: boolean = false;
  productQuantity: number = 0;
  formFields: { label: string, value: any }[] = [];
  productData: any = [];
  productsForm: any = FormGroup;
  constructor(private fb: FormBuilder, private productService: ProductaddService, private toastController: ToastController, private router: Router) {
    addIcons({ add, closeOutline });
    this.productsForm = this.fb.group({
      products: this.fb.array([])
    });
    this.createForm();
  }
  ionViewWillEnter() {
    this.getAllUserDetails();
    this.getListProduct();
  }
  getListProduct() {
    this.productService.getListProduct().subscribe((data: any) => {
      this.productData = data.success;
    }, (error) => {
      this.presentToast(error.error);
    })
  }
  getAllUserDetails() {
    this.productService.getUserDetails().subscribe((data: any) => {
      this.productlist = data.success;
    }, (error) => {
      this.presentToast(error.error);
    })
  }
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }
  createForm() {
    this.shopDetailsForm = this.fb.group({
      shopName: ['', Validators.required],
      address: ['', Validators.required],
      gstNumber: ['', Validators.pattern('[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}')],
      mobile: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      pincode: ['', Validators.required]
    });
  }


  confirm() {
    if (this.shopDetailsForm.valid) {

      this.productService.postUserDetails(this.shopDetailsForm.value).subscribe((data) => {
        this.modal.dismiss(this.shopDetailsForm.value, 'confirm');
        this.presentToast("Successfully Shop Owener Inserted");

      }, (error) => {
        this.presentToast("Email Or Mobile Number is Already Inserted");
      })
    }
    else {
      this.presentToast("Please Fill All The Fields")
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
  onIonInfinite(ev: any) {
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
  onSearch(event: any) {
    if (event.target.value.length > 0) {
      this.productService.getUserSearchdata(event.target.value).subscribe((data: any) => {
        this.productlist = data.success;
      })
    }
    else {
      this.getAllUserDetails();
    }

  }
  setOpen(id: any) {
    this.router.navigate(['tab/tabs/tab4', id]);

  }
}
