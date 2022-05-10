import { NgModule } from '@angular/core';
import { UsersRoutingModule } from "./users-routing.module";
import { UsersComponent } from "./users/users.component";
import {SharedModule} from "../../shared/shared.module";
import { UserBlockComponent } from './user-block/user-block.component';

@NgModule({
  declarations: [
    UsersComponent,
    UserBlockComponent
  ],
  imports: [
    SharedModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
