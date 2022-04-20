import { Component, OnInit } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { TripsService } from "../../../shared/services/trips.service";
import { TripModel } from "../../../shared/models/trips.model";
import { PlaceModel } from "../../../shared/models/place.model";
import { PlacesService } from "../../../shared/services/places.service";
import {BsModalService} from "ngx-bootstrap/modal";
import {CreateTripComponent} from "../create-trip/create-trip.component";
import {FormBuilder, Validators} from "@angular/forms";
import {FormComponent} from "../../../shared/form/form.component";

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.less']
})
export class TripsComponent extends FormComponent implements OnInit {

  trips: TripModel[] = []
  places: PlaceModel[] = []

  //@ts-ignore
  form = this.fb.group({
    from : [null, [Validators.required]],
    to : [null, [Validators.required]],
    date: [null, [Validators.required]],
  });

  constructor(
    public translate: TranslateService,
    private tripsService: TripsService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private placesService: PlacesService,
  ) { super() }

  ngOnInit(): void {
    this.tripsService.getTrips().subscribe(data => this.trips = data)
    this.placesService.getPlaces().subscribe(data => this.places = data)
  }

  getTranslate(kye: string) {
    return this.translate.instant(kye)
  }

  showCreateModal() {
    const modal = this.modalService.show(CreateTripComponent, {class: 'modal-lg'});
    modal.content?.isTripCreated.subscribe(async (trip) => {
      if (trip) {
        this.trips = await this.tripsService.getTrips().toPromise()
      }
    });
  }

  async find() {
    if (!this.checkForm()) return;

    this.trips = await this.tripsService.findTrips(this.value('from'), this.value('to'), this.value('date')).toPromise()
  }

  async reset() {
    this.control('from')?.setValue(null)
    this.control('to')?.setValue(null)
    this.control('date')?.setValue(null)

    this.control('from')?.setErrors(null)
    this.control('to')?.setErrors(null)
    this.control('date')?.setErrors(null)

    this.trips = await this.tripsService.getTrips().toPromise()
  }
}
