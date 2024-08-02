import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../Api/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, CommonModule, ReactiveFormsModule, FormsModule]
})
export class LoginPage implements OnInit {
  loginForm: any = FormGroup;
  isToastOpen: boolean = false;
  message: string = "";
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.formBuilder.group({
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
    if (this.loginForm.valid) {
      this.authService.getAuthLogin(this.loginForm.value).subscribe((data: any) => {
        this.message = "Successfully logged in";
        this.setOpen(true);
        sessionStorage.setItem('token', data.message);
        setTimeout(() => {
          this.changeRouter()
        }, 3000)
      }, (error) => {
        this.setOpen(true);
        this.message = error.error.error;
      })
    }

  }
  changeRouter() {
    this.router.navigate(['/tab/tabs/tab1']);
  }

}
