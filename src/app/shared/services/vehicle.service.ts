import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "../../core/auth.service";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { formDataTransformation } from "../helpers/form-data";

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
  }

  getVehicleType(): Observable<any> {
    let headers = new HttpHeaders({
      'Token': this.authService.token || '' });
    let options = { headers: headers };

    return this.http.get<any>(`${environment.endPoint}/vehicle/vehicle_type_list`, options)
  }

  getVehicle(): Observable<any> {
    let headers = new HttpHeaders({
      'Token': this.authService.token || '' });
    let options = { headers: headers };

    return this.http.get<any>(`${environment.endPoint}/vehicle`, options)
  }

  getVehicleById(id: number): Observable<any> {
    let headers = new HttpHeaders({
      'Token': this.authService.token || '' });
    let options = { headers: headers };

    return this.http.get<any>(`${environment.endPoint}/vehicle/${id}`, options)
  }

  createVehicle(vehicle: any): Observable<any> {
    let headers = new HttpHeaders({
      'Token': this.authService.token || '' });
    let options = { headers: headers };

    return this.http.post<any>(`${environment.endPoint}/vehicle/create`, formDataTransformation(vehicle), options)
  }
}
