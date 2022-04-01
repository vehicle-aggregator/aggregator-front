import { NgModule } from '@angular/core';
import { MyAccountRoutingModule } from "./my-account-routing.module";
import { MyAccountComponent } from "./my-account/my-account.component";

@NgModule({
  declarations: [
    MyAccountComponent
  ],
  imports: [
    MyAccountRoutingModule
  ]
})
export class MyAccountModule { }
