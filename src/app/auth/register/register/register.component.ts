import {Component, OnInit, ViewChild} from '@angular/core';
import {FormComponent} from "../../../shared/form/form.component";
import {CreateAccountComponent} from "../create-account/create-account.component";
import {InviteTokenComponent} from "../invite-token/invite-token.component";
import {CreateCompanyComponent} from "../create-company/create-company.component";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent extends FormComponent implements OnInit {
  // @ts-ignore
  @ViewChild(CreateAccountComponent) createAccountComponent: CreateAccountComponent
  // @ts-ignore
  @ViewChild(InviteTokenComponent) inviteTokenComponent: InviteTokenComponent
  // @ts-ignore
  @ViewChild(CreateCompanyComponent) createCompanyComponent: CreateCompanyComponent

  ngOnInit(): void {
    if (!sessionStorage.getItem('status'))
      this.currentStatus = 'create-account'
  }

  async submit() {
    if (this.currentStatus === 'create-account') {
      const newUser = await this.createAccountComponent.submit()
      if (newUser) this.currentStatus = 'invite-to-company'
    }
    if (this.currentStatus === 'create-company') {
      await this.createCompanyComponent.submit()
    }
  }

  get currentStatus(): string {
    return sessionStorage.getItem('status') || ''
  }

  // 'create-account' | 'invite-to-company' | 'create-company'
  set currentStatus(newStatus: string) {
    sessionStorage.setItem('status', newStatus)
  }

  goToCreateCompany() {
    this.currentStatus = 'create-company'
  }

  back() {
    this.currentStatus = 'invite-to-company'
  }

  get create_person_done(): boolean {
    return this.currentStatus === 'invite-to-company' || this.currentStatus === 'create-company'
  }

  get invite_to_company_done(): boolean {
    return this.create_person_done && this.currentStatus === 'create-company'
  }
}
