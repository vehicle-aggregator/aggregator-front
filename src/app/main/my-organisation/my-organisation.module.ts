import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MyOrganisationComponent} from "./my-organisation/my-organisation.component";
import {SharedModule} from "../../shared/shared.module"
import {MyOrganisationRoutingModule} from "./my-organisation-routing.module"

@NgModule({
  declarations: [
    MyOrganisationComponent
  ],
  imports: [
    SharedModule,
    MyOrganisationRoutingModule
  ]
})
export class MyOrganisationModule { }
