import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ProductaddService } from '../Api/productadd.service';
@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, ReactiveFormsModule, CommonModule],
})
export class Tab4Page implements OnInit {
  form: any = FormGroup;
  productData: any = [];
  isToastOpen: any = false;
  isSelected: boolean = false;
  dummy: any = {
    qty: 0,
    amount: 0
  }
  constructor(private fb: FormBuilder, private productService: ProductaddService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      product: ['', Validators.required],
      quantity: [null, Validators.required],
      total: [0, Validators.required],
      gst: [false],
      delivery: [false],
      userId: [null, Validators.required]
    });
    this.route.paramMap.subscribe(params => {
      this.form.get('userId')?.setValue(params.get('id'));
    });
    this.getListProduct();
  }
  getListProduct() {
    this.productService.getListProduct().subscribe((data: any) => {
      this.productData = data.success;
    }, (error) => {

    })
  }
  onSubmit() {
    if (this.form.valid) {
      this.productService.saveBillingDetails(this.form.value).subscribe((data: any) => {
        this.router.navigate(['tab/tabs/tab5', data.message]);
      })
    } else {
      console.log('Form is invalid');
    }
  }
  checktheValue(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const value = parseInt(input.value, 10);
    if (value && isNaN(Number(value))) {
      console.log('Invalid number entered');
    } else {
      const product = this.productData.find((p: any) => p._id === this.form.value.product);
      if (product.Quantity >= value) {
        var total = value * product.amount;
        this.form.get('total')?.setValue(total);
        console.log('Current quantity:', value, this.form.value.product);
      }
      else {
        this.setOpen(true);
        this.form.get('total')?.setValue(0);
        this.form.get('quantity')?.setValue(null);
      }

    }
  }
  onChange(e: any) {

    const product = this.productData.find((p: any) => p._id === this.form.value.product);
    console.log(product);
    this.dummy = {
      qty: product.Quantity,
      amount: product.amount
    }
    this.isSelected = true;
  }
  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

}
