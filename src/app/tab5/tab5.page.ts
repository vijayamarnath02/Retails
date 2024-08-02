import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ProductaddService } from '../Api/productadd.service'; // Adjust path as needed

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule]
})
export class Tab5Page implements OnInit {
  id: any = '';
  billingForm: FormGroup;
  billingDetail: any = {}; // Initialize as an empty object
  gstAmount: number | null = null;
  total: number | null = null;
  private gstRate: number = 0.18;
  private deliveryFee: number = 200;

  companyAddress = {
    name: 'Example Company',
    street: '123 Business St',
    city: 'Business City',
    state: 'BS',
    zip: '12345',
  };

  billerAddress = {
    name: 'John Doe',
    street: '456 Home St',
    city: 'Home City',
    state: 'HC',
    zip: '67890',
  };

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private productService: ProductaddService
  ) {
    this.billingForm = this.fb.group({
      description: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      total: ['', [Validators.required, Validators.min(0)]],
      gst: [false],
      deliveryCharge: [0, Validators.min(0)],
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      console.log(this.id);
      this.loadBillingDetails();
    });
  }

  loadBillingDetails() {
    this.productService.getBillingDetails(this.id).subscribe((data: any) => {
      this.billingDetail = data.message;
      this.billingForm.patchValue(this.billingDetail); // Populate the form with billing details
      this.calculate(); // Recalculate when billing details are available
    });
  }

  onSubmit() {
    if (this.billingForm.valid) {
      const formData = this.billingForm.value;
      console.log('Form Data:', formData);
    } else {
      console.log('Form is invalid');
    }
  }

  calculate(): void {
    const amount = this.billingDetail.amount || 0; // Ensure default value if undefined
    const applyGst = this.billingDetail.gst || false;
    const applyDelivery = this.billingDetail.delivery || false; // Assuming deliveryCharge is used for delivery flag

    this.gstAmount = this.calculateGst(amount, applyGst);
    this.total = this.calculateTotal(amount, applyGst, applyDelivery);
  }

  calculateGst(amount: number, applyGst: boolean): number {
    return applyGst ? amount * this.gstRate : 0;
  }

  calculateTotal(amount: number, applyGst: boolean, applyDelivery: boolean): number {
    const gst = this.calculateGst(amount, applyGst);
    const delivery = applyDelivery ? this.deliveryFee : 0;
    return amount + gst + delivery;
  }
}
