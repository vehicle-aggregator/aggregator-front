import { Injectable } from '@angular/core';
import {
  LoginCredentials,
  RestoreConfirmCredentials,
  User,
  RegisterCredentials
} from '../shared/models/auth.model';
import { HttpClient } from '@angular/common/http';
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

  get isAuthenticated(): boolean {
    return true;
  }

  login(credentials: LoginCredentials): Observable<string> {
    return this.http.post<string>(`${environment.endPoint}/login`, credentials).pipe(
      tap(this.setUserFromResponse.bind(this))
    );
  }

  register(credentials: RegisterCredentials): Observable<string> {
    return this.http.post<string>(`${environment.endPoint}/register`, formDataTransformation(credentials)).pipe(
      tap(this.setUserFromResponse.bind(this))
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${environment.endPoint}/logout`, {});
  }

  restoreConfirm(credentials: RestoreConfirmCredentials): Observable<User> {
    return this.http.post<User>(`${environment.endPoint}/users/restore/confirm`, credentials);
  }

  setUserFromResponse(response: string) {
    const userFromToken = this.helper.decodeToken(response)
    sessionStorage.setItem('firstName', userFromToken.Name);
    sessionStorage.setItem('token', response);
    sessionStorage.setItem('lastName', userFromToken.LastName);
    sessionStorage.setItem('email', userFromToken.Email);
    sessionStorage.setItem('_id', userFromToken.Id);
  }

  get token() {
    return sessionStorage.getItem('token');
  }

  get fullName() {
    return `${sessionStorage.getItem('lastName')} ${sessionStorage.getItem('firstName')}`
  }
  // get permissions(): Permission[] {
  //   return this.user?.permissions || [];
  // }
  //
  // hasPermission(permission: Permission): boolean {
  //   return this.permissions.includes(permission);
  // }
  //
  // hasEveryPermission(permissions: Permission[]): boolean {
  //   return permissions.every(p => this.hasPermission(p));
  // }
  //
  // hasSomePermission(permissions: Permission[]): boolean {
  //   return permissions.some(p => this.hasPermission(p));
  // }
}
