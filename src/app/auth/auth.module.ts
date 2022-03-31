import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register/register.component';
import { SharedModule } from '../shared/shared.module';
import { CreateAccountComponent } from './register/create-account/create-account.component';
import { InviteTokenComponent } from './register/invite-token/invite-token.component';
import { CreateCompanyComponent } from './register/create-company/create-company.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    CreateAccountComponent,
    InviteTokenComponent,
    CreateCompanyComponent,
  ],
  imports: [
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
