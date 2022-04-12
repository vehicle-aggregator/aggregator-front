import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {AuthService} from "../../../core/auth.service";
import {User} from "../../../shared/models/auth.model";

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.less']
})
export class MyAccountComponent implements OnInit {
  userInfo: User;

  constructor(
    public translate: TranslateService,
    private authService: AuthService
  ) { }

  async ngOnInit() {
    this.userInfo = await this.authService.getUserInfo().toPromise()
  }

  getTranslate(kye: string) {
    return this.translate.instant(kye)
  }
}
