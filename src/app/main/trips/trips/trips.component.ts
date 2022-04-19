import { Component, OnInit } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { TripsService } from "../../../shared/services/trips.service";
import {TripModel} from "../../../shared/models/trips.model";

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.less']
})
export class TripsComponent implements OnInit {

  trips: TripModel[] = []

  constructor(
    public translate: TranslateService,
    private tripsService: TripsService
  ) { }

  ngOnInit(): void {
    this.tripsService.getTrips().subscribe(data => this.trips = data)
  }

  getTranslate(kye: string) {
    return this.translate.instant(kye)
  }

  showCreateModal() {

  }
}
