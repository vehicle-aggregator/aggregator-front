import { NgModule } from '@angular/core';
import { RoutesRoutingModule } from "./routes-routing.module";
import { RoutesComponent } from "./routes/routes.component";
import {SharedModule} from "../../shared/shared.module";
import { CreateRouteComponent } from './create-route/create-route.component';

@NgModule({
  declarations: [
    RoutesComponent,
    CreateRouteComponent
  ],
  imports: [
    SharedModule,
    RoutesRoutingModule
  ]
})
export class RoutesModule { }
