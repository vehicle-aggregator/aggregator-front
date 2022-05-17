import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CompaniesComponent} from "./companies/companies.component";
import {CompanyInfoComponent} from "./company-info/company-info.component";

const routes: Routes = [
  {
    path : '',
    component: CompaniesComponent
  },
  {
    path : ':id',
    component: CompanyInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompaniesRoutingModule { }
