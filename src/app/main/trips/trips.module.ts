import { NgModule } from '@angular/core';
import { TripsRoutingModule } from "./trips-routing.module";
import { TripsComponent } from "./trips/trips.component";
import {SharedModule} from "../../shared/shared.module";
import { CreateTripComponent } from './create-trip/create-trip.component';

@NgModule({
  declarations: [
    TripsComponent,
    CreateTripComponent
  ],
  imports: [
    SharedModule,
    TripsRoutingModule
  ]
})
export class TripsModule { }
