import { Component, OnInit } from '@angular/core';
import {BusPlace} from "../../../shared/models/vehicle.model";
import {especiallySmall} from "../../../shared/resources/bus";

@Component({
  selector: 'app-bus',
  templateUrl: './bus.component.html',
  styleUrls: ['./bus.component.less']
})
export class BusComponent implements OnInit {

  busPlaces: BusPlace[] = especiallySmall

  maxColumn: number = 0
  maxRaw: number = 0

  columns: number[] = []
  raws: number[] = []

  constructor() { }

  ngOnInit(): void {
    this.maxColumn = Math.max.apply(null, this.busPlaces.map(item => item.BusColumn))
    this.maxRaw = Math.max.apply(null, this.busPlaces.map(item => item.BusRaw))

    this.columns = new Array(this.maxColumn).fill(1).map((item, index) => index + 1)
    this.raws = new Array(this.maxRaw).fill(1).map((item, index) => index + 1)
  }

  getBus(column: number, raw: number) {
    return this.busPlaces.find(place => place.BusRaw === raw && place.BusColumn === column)
  }

  enter(column: number, raw: number) {
    const placesLength = this.busPlaces.filter(place => place.BusColumn === column).length
    return placesLength % 2 === 0 && placesLength / 2 === raw
  }
}
