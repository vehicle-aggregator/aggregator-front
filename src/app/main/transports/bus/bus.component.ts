import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {BusPlace} from "../../../shared/models/vehicle.model";

@Component({
  selector: 'app-bus',
  templateUrl: './bus.component.html',
  styleUrls: ['./bus.component.less']
})
export class BusComponent implements OnChanges {

  @Input() busPlaces: BusPlace[]

  maxColumn: number = 0
  maxRaw: number = 0

  columns: number[] = []
  raws: number[] = []

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.maxColumn = Math.max.apply(null, this.busPlaces.map(item => item.column))
    this.maxRaw = Math.max.apply(null, this.busPlaces.map(item => item.raw))

    this.columns = new Array(this.maxColumn).fill(1).map((item, index) => index + 1)
    this.raws = new Array(this.maxRaw).fill(1).map((item, index) => index + 1)
  }

  getBus(column: number, raw: number) {
    return this.busPlaces.find(place => place.raw === raw && place.column === column)
  }
}
