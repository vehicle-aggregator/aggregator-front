import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "../../core/auth.service";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import {User} from "../models/users.model";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getBusinessUsers(): Observable<User[]> {
    let headers = new HttpHeaders({
      'Token': this.authService.token || '' });
    let options = { headers: headers };

    return this.http.get<User[]>(`${environment.endPoint}/business`, options)
  }

  banBusinessUsers(id: number): Observable<any> {
    let headers = new HttpHeaders({
      'Token': this.authService.token || '' });
    let options = { headers: headers };

    return this.http.get<any>(`${environment.endPoint}/business/ban/${id}`, options)
  }
}
