import { NgModule } from '@angular/core';
import { TransportsRoutingModule } from "./transports-routing.module";
import { TransportsComponent } from "./transports/transports.component";
import {SharedModule} from "../../shared/shared.module";
import { CreateTransportComponent } from './create-transport/create-transport.component';
import { BusComponent } from './bus/bus.component';

@NgModule({
    declarations: [
        TransportsComponent,
        CreateTransportComponent,
        BusComponent
    ],
    exports: [
        BusComponent
    ],
    imports: [
        SharedModule,
        TransportsRoutingModule
    ]
})
export class TransportsModule { }
