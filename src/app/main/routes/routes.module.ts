import { NgModule } from '@angular/core';
import { RoutesRoutingModule } from "./routes-routing.module";
import { RoutesComponent } from "./routes/routes.component";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [
    RoutesComponent
  ],
  imports: [
    SharedModule,
    RoutesRoutingModule
  ]
})
export class RoutesModule { }
