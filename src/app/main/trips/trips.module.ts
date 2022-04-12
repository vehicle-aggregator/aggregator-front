import { NgModule } from '@angular/core';
import { TripsRoutingModule } from "./trips-routing.module";
import { TripsComponent } from "./trips/trips.component";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [
    TripsComponent
  ],
  imports: [
    SharedModule,
    TripsRoutingModule
  ]
})
export class TripsModule { }
