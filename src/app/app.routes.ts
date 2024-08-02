import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'tab',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: '',
    loadComponent: () => import('./firstpage/firstpage.page').then(m => m.FirstpagePage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'signup',
    loadComponent: () => import('./signup/signup.page').then(m => m.SignupPage)
  },
  {
    path: 'tab4',
    loadComponent: () => import('./tab4/tab4.page').then(m => m.Tab4Page)
  },
  {
    path: 'tab5',
    loadComponent: () => import('./tab5/tab5.page').then(m => m.Tab5Page)
  },

];
