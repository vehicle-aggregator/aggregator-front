import { NgModule } from '@angular/core';
import { TransportsRoutingModule } from "./transports-routing.module";
import { TransportsComponent } from "./transports/transports.component";
import {SharedModule} from "../../shared/shared.module";
import { CreateTransportComponent } from './create-transport/create-transport.component';

@NgModule({
  declarations: [
    TransportsComponent,
    CreateTransportComponent
  ],
  imports: [
    SharedModule,
    TransportsRoutingModule
  ]
})
export class TransportsModule { }
