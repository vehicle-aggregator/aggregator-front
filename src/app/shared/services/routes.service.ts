import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { AuthService } from "../../core/auth.service";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {formDataTransformation} from "../helpers/form-data";

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
  }

  getRoutes(): Observable<any> {
    let headers = new HttpHeaders({
      'Token': this.authService.token || '' });
    let options = { headers: headers };

    return this.http.get<any>(`${environment.endPoint}/route`, options)
  }


  createRoute(route: { from: string; to: string; active_from: string }): Observable<any> {
    let headers = new HttpHeaders({
      'Token': this.authService.token || '' });
    let options = { headers: headers };

    return this.http.post<any>(`${environment.endPoint}/route/create`, formDataTransformation(route), options)
  }
}
