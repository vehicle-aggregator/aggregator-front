import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { AuthService } from "../../core/auth.service";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {formDataTransformation} from "../helpers/form-data";

@Injectable({
  providedIn: 'root'
})
export class TripsService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
  }

  getTrips(): Observable<any> {
    let headers = new HttpHeaders({
      'Token': this.authService.token || '' });
    let options = { headers: headers };

    return this.http.get<any>(`${environment.endPoint}/trip`, options)
  }

  getTripById(id: number): Observable<any> {
    let headers = new HttpHeaders({
      'Token': this.authService.token || '' });
    let options = { headers: headers };

    return this.http.get<any>(`${environment.endPoint}/trip/${id}`, options)
  }

  createTrip(trip: any): Observable<any> {
    let headers = new HttpHeaders({
      'Token': this.authService.token || '' });
    let options = { headers: headers };

    return this.http.post<any>(`${environment.endPoint}/trip/create`, formDataTransformation(trip), options)
  }

  findTrips(from: number, to: number, date: string | null): Observable<any> {
    let headers = new HttpHeaders({
      'Token': this.authService.token || '' });
    let options = { headers: headers };

    return this.http.get<any>(`${environment.endPoint}/trip/find?from=${from}&to=${to}&date=${date}`, options)
  }
}
