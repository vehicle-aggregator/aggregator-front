import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-my-organisation',
  templateUrl: './my-organisation.component.html',
  styleUrls: ['./my-organisation.component.less']
})
export class MyOrganisationComponent implements OnInit {
  constructor(
    public translate: TranslateService
  ) { }

  ngOnInit(): void {
  }

  getTranslate(kye: string) {
    return this.translate.instant(kye)
  }
}
