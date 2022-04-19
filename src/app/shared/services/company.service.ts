import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Company, FullCompanyModel } from "../models/company.model";
import { AuthService } from "../../core/auth.service";
import {formDataTransformation} from "../helpers/form-data";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  createCompany(company: Company): Observable<FullCompanyModel> {
    return this.http.post<FullCompanyModel>(`${environment.endPoint}/company/create`,  company);
  }

  createBusinessAccount(): Observable<any> {
    let headers = new HttpHeaders({
      'Token': this.authService.token || '' });
    let options = { headers: headers };
    return this.http.post<any>(`${environment.endPoint}/business/create`, { }, options)
  }

  getBusinessAccount(uid: number): Observable<any> {
    let headers = new HttpHeaders({
      'Token': this.authService.token || '' });
    let options = { headers: headers };
    return this.http.get<any>(`${environment.endPoint}/business/${uid}`, options)
  }

  getCompanyById(id: number): Observable<any> {
    let headers = new HttpHeaders({
      'Token': this.authService.token || '' });
    let options = { headers: headers };
    return this.http.get<any>(`${environment.endPoint}/company/${id}`, options)
  }

  getMyCompany(): Observable<any> {
    let headers = new HttpHeaders({
      'Token': this.authService.token || '' });
    let options = { headers: headers };

    return this.http.get<any>(`${environment.endPoint}/company/worker`, options)
  }

  companyConnect(code: string): Observable<any> {
    let headers = new HttpHeaders({
      'Token': this.authService.token || '' });
    let options = { headers: headers };
    return this.http.post<any>(`${environment.endPoint}/company/connect`, formDataTransformation({ invite_code: code }) , options);
  }
}
