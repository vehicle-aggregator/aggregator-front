import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {CompanyService} from "../../../shared/services/company.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Company} from "../../../shared/models/company.model";
import {FormComponent} from "../../../shared/form/form.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.less']
})
export class CreateCompanyComponent extends FormComponent implements OnInit {

  //@ts-ignore
  form = this.fb.group({
    name: [null, [Validators.required]],
    regulation: [null, [Validators.required]],
    transportationPermits: [null, [Validators.required]],
    insurance: [null, [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private router: Router
  ) { super() }

  ngOnInit(): void {
  }

  async submit() {
    if (!this.checkForm()) return;

    const business = sessionStorage.getItem('uid') ?
      await this.companyService.getBusinessAccount(Number(sessionStorage.getItem('uid'))).toPromise() :
      await this.companyService.createBusinessAccount().toPromise()

    if (business) {
      try {
        sessionStorage.setItem('uid', business.BusinessUser[0].Uid);
        const companyInfo: Company = this.getCompany(business)
        const company = await this.companyService.createCompany(companyInfo).toPromise()
        if (company) this.router.navigateByUrl('');
      } catch (e) {
        // @ts-ignore
        this.handleError(e)
      }
    }
  }

  handleError(res: HttpErrorResponse) {
    if (res.status !== 400) return;
    const error = res.error;
    //this.toastr.error(ERRORS[error.code]);
  }

  getCompany(business: any): Company {
    return {
      name: this.value('name'),
      owner: business.BusinessUser[0].ID,
      documents: [{
        content: this.value('regulation'),
        typeId: 3,
        statusId: 1
      },{
        content: this.value('transportationPermits'),
        typeId: 4,
        statusId: 1
      },{
        content: this.value('insurance'),
        typeId: 5,
        statusId: 1
      },]
    }
  }
}
