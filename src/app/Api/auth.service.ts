import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_URL } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  api: any = SERVER_URL;
  constructor(private http: HttpClient) {

  }
  postAuthSign(data: any) {
    var url = this.api + '/auth/signup';
    return this.http.post(url, data);

  }
  getAuthLogin(data: any) {
    var url = this.api + '/auth/login';
    return this.http.post(url, data);
  }

}
