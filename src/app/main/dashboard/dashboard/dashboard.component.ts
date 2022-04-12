import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {Statistic} from "../../../shared/models/statistic.moddel";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {

  statistics: Statistic[] = statisticsMock;
  results: any = [
    {
      "name": "Germany",
      "series": [
        {
          "name": "2010",
          "value": 7300000,
          "min": 7000000,
          "max": 7600000
        },
        {
          "name": "2011",
          "value": 8940000,
          "min": 8840000,
          "max": 9300000
        }
      ]
    },

    {
      "name": "USA",
      "series": [
        {
          "name": "2010",
          "value": 7870000,
          "min": 7800000,
          "max": 7950000
        },
        {
          "name": "2011",
          "value": 8270000,
          "min": 8170000,
          "max": 8300000
        }
      ]
    }
  ];

  colorScheme = {
    domain: ['#28A745', '#DC3545']
  };

  constructor(
    public translate: TranslateService
  ) { }

  ngOnInit(): void {
  }

  getTranslate(kye: string) {
    return this.translate.instant(kye)
  }
}

export const statisticsMock = []
