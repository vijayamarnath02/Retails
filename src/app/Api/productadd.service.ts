import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_URL } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductaddService {
  token: any = sessionStorage.getItem('token');
  api: any = SERVER_URL;
  constructor(private http: HttpClient) {

  }
  getProductDropDown() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    var url = this.api + '/product/list';
    return this.http.get(url, { headers });

  }
  postProductData(data: any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    var url = this.api + '/product/add';
    return this.http.post(url, data, { headers });

  }
  getAllProductDetails() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    var url = this.api + '/product/details';
    return this.http.get(url, { headers });
  }
  getSearchDetails(id: any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    const url = `${this.api}/product/detail/${id}`
    return this.http.get(url, { headers });
  }
  postUserDetails(data: any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    const url = `${this.api}/product/user`
    return this.http.post(url, data, { headers });
  }
  getUserDetails() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    const url = `${this.api}/product/userall`
    return this.http.get(url, { headers });
  }
  getUserSearchdata(id: any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    const url = `${this.api}/product/user/${id}`
    return this.http.get(url, { headers });
  }
  getProductAndUserCount() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    const url = `${this.api}/product/count`
    return this.http.get(url, { headers });
  }
  getListProduct() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    const url = `${this.api}/product/listProduct`
    return this.http.get(url, { headers });
  }
  saveBillingDetails(data: any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    const url = `${this.api}/product/billing`
    return this.http.post(url, data, { headers });
  }
  getBillingDetails(id: any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    const url = `${this.api}/product/getbilling/${id}`
    return this.http.get(url, { headers });
  }
}
