import { NgModule } from '@angular/core';
import { RoutesRoutingModule } from "./routes-routing.module";
import { RoutesComponent } from "./routes/routes.component";

@NgModule({
  declarations: [
    RoutesComponent
  ],
  imports: [
    RoutesRoutingModule
  ]
})
export class RoutesModule { }
