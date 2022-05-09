import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {CompanyService} from "../../../shared/services/company.service";
import {FullCompanyModel} from "../../../shared/models/company.model";
import {NgxSpinnerService} from "ngx-spinner";
import {finalize} from "rxjs";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-my-organisation',
  templateUrl: './my-organisation.component.html',
  styleUrls: ['./my-organisation.component.less']
})
export class MyOrganisationComponent implements OnInit {
  company: FullCompanyModel;

  constructor(
    public translate: TranslateService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private companyService: CompanyService
  ) { }

  async ngOnInit() {
    this.spinner.show()

    await this.companyService.getCompanyById(1).pipe(finalize(() => this.spinner.hide())).subscribe(
      company => this.company = company,
      error => {},
    )
  }

  getTranslate(kye: string) {
    return this.translate.instant(kye)
  }

  showToastr() {
    this.toastr.success(this.translate.instant('The invitation was copied successfully'))
  }
}
