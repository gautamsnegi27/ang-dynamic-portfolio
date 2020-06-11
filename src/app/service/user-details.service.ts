import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthModel } from 'src/models/AuthModel';
import { ResponseObject } from 'src/models/ResponseObject';
import { AuthDetailModel } from 'src/models/AuthDetailsModel';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  // private url = 'https://dynamic-portfolio-spring-boot.herokuapp.com/dynamicportfolio';
  private url = 'http://localhost:8080/dynamicportfolio';
  constructor(private http: HttpClient) { }

  validateField(validate: string, value: string) {
    return this.http.get<ResponseObject>(this.url + '/'+ validate +'/' + value);
  }

  createUser(signUpBody) {
    return this.http.post<ResponseObject>(this.url + '/create/user', signUpBody)
  }

  loginUser(loginBody) {
    return this.http.post<AuthDetailModel>(this.url + '/login', loginBody)
  }

  getUser(user: string) {
    return this.http.get<ResponseObject>(this.url + '/user/' + user)
  }
}
