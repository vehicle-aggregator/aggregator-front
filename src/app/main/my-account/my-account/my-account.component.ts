import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {AuthService} from "../../../core/auth.service";
import {User} from "../../../shared/models/auth.model";
import {NgxSpinnerService} from "ngx-spinner";
import {finalize} from "rxjs";

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.less']
})
export class MyAccountComponent implements OnInit {
  userInfo: User;

  constructor(
    public translate: TranslateService,
    private spinner: NgxSpinnerService,
    private authService: AuthService
  ) { }

  async ngOnInit() {
    this.spinner.show()

    await this.authService.getUserInfo().pipe(finalize(() => this.spinner.hide())).subscribe(
      userInfo => this.userInfo = userInfo,
      error => {},
    )

  }

  getTranslate(kye: string) {
    return this.translate.instant(kye)
  }
}
