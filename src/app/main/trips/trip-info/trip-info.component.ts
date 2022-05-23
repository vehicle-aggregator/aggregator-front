import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { TripsService } from "../../../shared/services/trips.service";
import { finalize } from "rxjs";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { TripModel } from "../../../shared/models/trips.model";
import { BusPlace } from "../../../shared/models/vehicle.model";

@Component({
  selector: 'app-trip-info',
  templateUrl: './trip-info.component.html',
  styleUrls: ['./trip-info.component.less']
})
export class TripInfoComponent implements OnInit {
  trip: TripModel;
  bus: BusPlace[] = []
  busPlaces: number = 0
  feedback: any

  constructor(
    private activateRoute: ActivatedRoute,
    private tripsService: TripsService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(
      params => {
        this.loadTrip(params['id'])
        this.loadFeedback(params['id'])
      }
    );
  }

  async loadTrip(id: number) {
    this.spinner.show()

    await this.tripsService.getTripById(id).pipe(finalize(() => this.spinner.hide())).subscribe(
      trip => {
        this.trip = trip
        this.bus = trip.PlacesTrip.map((place: any) => ({
          column: place.BusPlace.BusColumn,
          raw: place.BusPlace.BusRaw,
          number: place.BusPlace.PlaceNum,
          show: place.BusPlace.Show,
          busy: place.Busy,
        }))
        this.busPlaces = this.bus.filter((place) => place.show).length
      },
      error => {
      },
    );
  }

  async loadFeedback(id: number) {
    this.spinner.show()

    await this.tripsService.getFeedback(id).pipe(finalize(() => this.spinner.hide())).subscribe(
      feedback => {
        this.feedback = feedback
      },
      error => {
      },
    );
  }

  changeStatus() {
    this.tripsService.changeStatus(this.trip.ID, 'Посадка').subscribe()
  }

  get averageRating() {
    return this.feedback.map((item: any) => item?.Mark).reduce((a: any ,b: any) => a + b) / this.feedback.length
  }
}
