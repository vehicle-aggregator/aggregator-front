import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.less']
})
export class StatisticComponent {
  @Input() statistic: any;

  abs(percent: number): number {
    return Math.abs(percent);
  }

  get image(): string {
    return ''
  }
}
