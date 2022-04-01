import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {MyOrganisationComponent} from "./my-organisation/my-organisation.component";

const routes: Routes = [
  {
    path : '',
    component: MyOrganisationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyOrganisationRoutingModule { }
