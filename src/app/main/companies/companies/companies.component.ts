import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.less']
})
export class CompaniesComponent implements OnInit {
  constructor(
    public translate: TranslateService
  ) { }

  ngOnInit(): void {
  }

  getTranslate(kye: string) {
    return this.translate.instant(kye)
  }
}
