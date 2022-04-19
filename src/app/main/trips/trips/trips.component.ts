import { Component, OnInit } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { TripsService } from "../../../shared/services/trips.service";
import { TripModel } from "../../../shared/models/trips.model";
import { PlaceModel } from "../../../shared/models/place.model";
import { PlacesService } from "../../../shared/services/places.service";
import {BsModalService} from "ngx-bootstrap/modal";
import {CreateTripComponent} from "../create-trip/create-trip.component";

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.less']
})
export class TripsComponent implements OnInit {

  trips: TripModel[] = []
  places: PlaceModel[] = []

  constructor(
    public translate: TranslateService,
    private tripsService: TripsService,
    private modalService: BsModalService,
    private placesService: PlacesService,
  ) { }

  ngOnInit(): void {
    this.tripsService.getTrips().subscribe(data => this.trips = data)
    this.placesService.getPlaces().subscribe(data => this.places = data)
  }

  getTranslate(kye: string) {
    return this.translate.instant(kye)
  }

  showCreateModal() {
    const modal = this.modalService.show(CreateTripComponent, {class: 'modal-lg'});
    // modal.content?.isRouteCreated.subscribe(async (route) => {
    //   if (route) {
    //     this.routes = await this.routesService.getRoutes().toPromise()
    //   }
    // toPromise});
  }
}
