import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../Api/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule, ReactiveFormsModule, CommonModule, FormsModule]
})
export class SignupPage implements OnInit {
  isToastOpen: boolean = false;
  signupForm: any = FormGroup;
  error: string = "";
  constructor(private formBuilder: FormBuilder, private authServices: AuthService, private router: Router) {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }
  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  submitForm() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
      this.authServices.postAuthSign(this.signupForm.value).subscribe((data: any) => {
        sessionStorage.setItem('token', data.message);

      }, (error) => {
        this.setOpen(true);
        this.error = error.error.error;
      })
    }
    else {
      this.signupForm.markAsTouched();
    }
  }
  changeRouter() {
    this.router.navigate(['/tab/tabs/firstpage']);
  }
}
