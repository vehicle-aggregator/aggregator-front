import { NgModule } from '@angular/core';
import { TripsRoutingModule } from "./trips-routing.module";
import { TripsComponent } from "./trips/trips.component";

@NgModule({
  declarations: [
    TripsComponent
  ],
  imports: [
    TripsRoutingModule
  ]
})
export class TripsModule { }
