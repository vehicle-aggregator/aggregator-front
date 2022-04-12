import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.less']
})
export class MyAccountComponent implements OnInit {
  constructor(
    public translate: TranslateService
  ) { }

  ngOnInit(): void {
  }

  getTranslate(kye: string) {
    return this.translate.instant(kye)
  }
}
