import { NgModule } from '@angular/core';
import { CompaniesRoutingModule } from "./companies-routing.module";
import { SharedModule } from "../../shared/shared.module";
import { CompaniesComponent } from "./companies/companies.component";
import { CompanyInfoComponent } from './company-info/company-info.component';
import { CompanyBlockComponent } from './company-block/company-block.component';

@NgModule({
  declarations: [
    CompaniesComponent,
    CompanyInfoComponent,
    CompanyBlockComponent,
  ],
  imports: [
    SharedModule,
    CompaniesRoutingModule
  ]
})
export class CompaniesModule { }
