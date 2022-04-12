import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.less']
})
export class RoutesComponent implements OnInit {
  constructor(
    public translate: TranslateService
  ) { }

  ngOnInit(): void {
  }

  getTranslate(kye: string) {
    return this.translate.instant(kye)
  }
}
