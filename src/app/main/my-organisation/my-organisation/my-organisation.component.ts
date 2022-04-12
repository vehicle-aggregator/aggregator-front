import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {CompanyService} from "../../../shared/services/company.service";
import {FullCompanyModel} from "../../../shared/models/company.model";

@Component({
  selector: 'app-my-organisation',
  templateUrl: './my-organisation.component.html',
  styleUrls: ['./my-organisation.component.less']
})
export class MyOrganisationComponent implements OnInit {
  company: FullCompanyModel;

  constructor(
    public translate: TranslateService,
    private companyService: CompanyService
  ) { }

  async ngOnInit() {
    this.company = await this.companyService.getCompanyById(1).toPromise()
  }

  getTranslate(kye: string) {
    return this.translate.instant(kye)
  }
}
