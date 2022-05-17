import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {NgxSpinnerService} from "ngx-spinner";
import {CompanyService} from "../../../shared/services/company.service";
import {UsersService} from "../../../shared/services/users.service";

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.less']
})
export class CompaniesComponent implements OnInit {
  companies: any[] = []

  constructor(
    public translate: TranslateService,
    private spinner: NgxSpinnerService,
    private companyService: CompanyService,
    private usersService: UsersService,
  ) { }

  ngOnInit(): void {
    this.loadData()
  }

  getTranslate(kye: string) {
    return this.translate.instant(kye)
  }

  async loadData() {
    this.spinner.show()

    const [companies, users] = await Promise.all([
      this.companyService.getCompanies().toPromise(),
      this.usersService.getBusinessUsers().toPromise()
    ])

    this.companies = companies.map((company: any) => ({ ...company, businessUser: users?.find(user => user.BusinessUser[0].ID === company.owner )}));

    this.spinner.hide();
  }
}
