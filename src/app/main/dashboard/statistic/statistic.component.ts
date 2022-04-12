import { Component, Input } from '@angular/core';
import {Statistic} from "../../../shared/models/statistic.moddel";

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.less']
})
export class StatisticComponent {
  @Input() statistic: Statistic;

  abs(percent: number): number {
    return Math.abs(percent);
  }
}
