import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MyOrganisationComponent} from "./my-organisation/my-organisation.component";
import {SharedModule} from "../../shared/shared.module"
import {MyOrganisationRoutingModule} from "./my-organisation-routing.module"
import {ClipboardModule} from "@angular/cdk/clipboard";
import {QRCodeModule} from "angular2-qrcode";
import { ImageComponent } from './image/image.component';

@NgModule({
  declarations: [
    MyOrganisationComponent,
    ImageComponent
  ],
  imports: [
    SharedModule,
    MyOrganisationRoutingModule,
    ClipboardModule,
    QRCodeModule
  ]
})
export class MyOrganisationModule { }
