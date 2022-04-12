import { NgModule } from '@angular/core';
import { TransportsRoutingModule } from "./transports-routing.module";
import { TransportsComponent } from "./transports/transports.component";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [
    TransportsComponent
  ],
  imports: [
    SharedModule,
    TransportsRoutingModule
  ]
})
export class TransportsModule { }
