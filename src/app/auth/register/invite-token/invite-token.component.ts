import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {FormComponent} from "../../../shared/form/form.component";
import {CompanyService} from "../../../shared/services/company.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Company} from "../../../shared/models/company.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-invite-token',
  templateUrl: './invite-token.component.html',
  styleUrls: ['./invite-token.component.less']
})
export class InviteTokenComponent extends FormComponent implements OnInit {

  //@ts-ignore
  form = this.fb.group({
    code: [null, [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private companyService: CompanyService
  ) { super(); }

  ngOnInit(): void {
  }


  async submit() {
    if (!this.checkForm()) return;

    try {
      const company = await this.companyService.companyConnect(this.value('code')).toPromise()
      if (company) await this.router.navigateByUrl('');
    } catch (e) {
      console.log(e)
      // @ts-ignore
      this.handleError(e)
    }
  }

  handleError(res: HttpErrorResponse) {
    if (res.status !== 400) return;
    const error = res.error;
    //this.toastr.error(ERRORS[error.code]);
  }
}
