import { Injectable } from '@angular/core';
import {
  LoginCredentials,
  RegisterCredentials
} from '../shared/models/auth.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {formDataTransformation} from "../shared/helpers/form-data";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  helper = new JwtHelperService();

  constructor(private http: HttpClient) { }

  login(credentials: LoginCredentials): Observable<string> {
    const options = {
      observe: "response" as 'body',
    };

    return this.http.post<string>(`${environment.endPoint}/login`, formDataTransformation(credentials), options).pipe(
      tap(this.setUserFromResponse.bind(this))
    );
  }

  register(credentials: RegisterCredentials): Observable<string> {
    return this.http.post<string>(`${environment.endPoint}/register`, formDataTransformation(credentials)).pipe(
      tap(this.setUserFromTokenResponse.bind(this))
    );
  }

  sendEmail(email: string) {
    const options = {
      observe: "response" as 'body',
    };

    return this.http.post<string>(`${environment.endPoint}/auth/forget_password`,  formDataTransformation({ email, stage: 1 }), options).pipe(
      tap(this.setUserFromResponse.bind(this))
    );
  }

  sendCode(code: string, email: string) {
    let headers = new HttpHeaders({
      'auth': this.token || '' });
    let options = { headers: headers };

    return this.http.post(`${environment.endPoint}/auth/forget_password`,  formDataTransformation({ email, code, stage: 2 }), options)
  }

  sendPassword(email: string, password: string) {
    let headers = new HttpHeaders({
      'auth': this.token || '' });
    let options = { headers: headers };

    return this.http.post(`${environment.endPoint}/auth/forget_password`,  formDataTransformation({ email, password, stage: 3 }), options)
  }

  logout(): void {
    sessionStorage.clear();
  }

  setUserFromTokenResponse(response: string) {
    const userFromToken = this.helper.decodeToken(response)
    sessionStorage.setItem('firstName', userFromToken.Name);
    sessionStorage.setItem('token', response);
    sessionStorage.setItem('lastName', userFromToken.LastName);
    sessionStorage.setItem('email', userFromToken.Email);
    sessionStorage.setItem('_id', userFromToken.ID);
  }

  setUserFromResponse(response: any) {
    const userFromToken = this.helper.decodeToken(response.headers.get('token') || response.headers.get('auth'))
    sessionStorage.setItem('firstName', userFromToken.Name);
    sessionStorage.setItem('token', response.headers.get('token') || response.headers.get('auth'));
    sessionStorage.setItem('lastName', userFromToken.LastName);
    sessionStorage.setItem('email', userFromToken.Email);
    sessionStorage.setItem('_id', userFromToken.ID);
  }

  get token() {
    return sessionStorage.getItem('token');
  }

  get fullName() {
    return `${sessionStorage.getItem('lastName')} ${sessionStorage.getItem('firstName')}`
  }

  get userId() {
    return sessionStorage.getItem('_id')
  }

  getUserInfo(): Observable<any> {
    let headers = new HttpHeaders({
      'Token': this.token || '' });
    let options = { headers: headers };
    return this.http.get(`${environment.endPoint}/user/${this.userId}`, options);
  }

  get role(): 'admin' | 'user' {
    // TODO change logic
    return sessionStorage.getItem('email') === 'moder@gmail.com' ?  'admin' : 'user';
  }
}
