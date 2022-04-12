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
  newUsersResults: any = newUsersResultsMock;
  tripsResults: any = tripsMock;

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

export const tripsMock = []
export const newUsersResultsMock = [
  {
    "name": "Users",
    "series": [
      {
        "name": "01.01",
        "value": 12,
      },
      {
        "name": "02.01",
        "value": 15,
      },
      {
        "name": "03.01",
        "value": 0,
      },
      {
        "name": "04.01",
        "value": 10,
      },
      {
        "name": "05.01",
        "value": 5,
      },
      {
        "name": "06.01",
        "value": 19,
      },
      {
        "name": "07.01",
        "value": 5,
      }
    ]
  }
];
export const statisticsMock: Statistic[] = [{
  name: 'New users',
  icon: 'group',
  value: 12,
  percent: 12,
}, {
  name: 'All trips',
  icon: 'map',
  value: 36,
  percent: 50,
}, {
  name: 'New routes',
  icon: 'fork_right',
  value: 122,
  percent: -20,
}]
