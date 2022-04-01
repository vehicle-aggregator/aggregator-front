import { NgModule } from '@angular/core';
import { TransportsRoutingModule } from "./transports-routing.module";
import { TransportsComponent } from "./transports/transports.component";

@NgModule({
  declarations: [
    TransportsComponent
  ],
  imports: [
    TransportsRoutingModule
  ]
})
export class TransportsModule { }
