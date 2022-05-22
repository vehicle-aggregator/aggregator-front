import { NgModule } from '@angular/core';
import { TripsRoutingModule } from "./trips-routing.module";
import { TripsComponent } from "./trips/trips.component";
import {SharedModule} from "../../shared/shared.module";
import { CreateTripComponent } from './create-trip/create-trip.component';
import { TripInfoComponent } from './trip-info/trip-info.component';
import {TransportsModule} from "../transports/transports.module";

@NgModule({
  declarations: [
    TripsComponent,
    CreateTripComponent,
    TripInfoComponent
  ],
    imports: [
        SharedModule,
        TripsRoutingModule,
        TransportsModule
    ]
})
export class TripsModule { }
