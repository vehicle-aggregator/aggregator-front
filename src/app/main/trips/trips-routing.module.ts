import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {TripsComponent} from "./trips/trips.component";
import {TripInfoComponent} from "./trip-info/trip-info.component";

const routes: Routes = [
  {
    path : '',
    component: TripsComponent
  },
  {
    path : ':id',
    component: TripInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TripsRoutingModule { }
