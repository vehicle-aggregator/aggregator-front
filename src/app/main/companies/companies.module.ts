import { NgModule } from '@angular/core';
import { CompaniesRoutingModule } from "./companies-routing.module";
import { SharedModule } from "../../shared/shared.module";
import { CompaniesComponent } from "./companies/companies.component";

@NgModule({
  declarations: [
    CompaniesComponent,
  ],
  imports: [
    SharedModule,
    CompaniesRoutingModule
  ]
})
export class CompaniesModule { }
