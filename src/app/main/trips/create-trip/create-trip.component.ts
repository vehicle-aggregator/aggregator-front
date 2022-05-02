import {Component, EventEmitter, OnInit} from '@angular/core';
import { BsModalRef } from "ngx-bootstrap/modal";
import { FormBuilder, Validators } from "@angular/forms";
import { FormComponent } from "../../../shared/form/form.component";
import {VehicleModel} from "../../../shared/models/vehicle.model";
import {VehicleService} from "../../../shared/services/vehicle.service";
import {RouteModel} from "../../../shared/models/route.model";
import {RoutesService} from "../../../shared/services/routes.service";
import {PlaceModel} from "../../../shared/models/place.model";
import {PlacesService} from "../../../shared/services/places.service";
import {TripsService} from "../../../shared/services/trips.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NumberValidator} from "../../../shared/validators/validators";
import {formatDate} from "../../../shared/helpers/format-date";

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.less']
})
export class CreateTripComponent extends FormComponent implements OnInit {

  isTripCreated = new EventEmitter();

  vehicles: VehicleModel[] = [];
  routes: any[] = [];

  //@ts-ignore
  form = this.fb.group({
    routeId: [null, [Validators.required]],
    vehicleId: [null, [Validators.required]],
    description: [null, [Validators.required]],
    price: [null, [Validators.required, NumberValidator]],
    departure_date: [null, [Validators.required]],
    departure_time: [null, [Validators.required]],
    arrival_date: [null, [Validators.required]],
    arrival_time: [null, [Validators.required]],
  });

  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private vehicleService: VehicleService,
    private routesService: RoutesService,
    private placesService: PlacesService,
    private tripsService: TripsService
  ) { super(); }

  async ngOnInit() {
    const [vehicles, routes, places] = await Promise.all([
      this.vehicleService.getVehicle().toPromise(),
      this.routesService.getRoutes().toPromise(),
      this.placesService.getPlaces().toPromise()
    ])

    this.vehicles = vehicles
    this.routes = routes.map((route: RouteModel) => ({
      ...route,
      full_route: `${places.find((place: PlaceModel) => place.ID === route.FromID).Name} - ${places.find((place: PlaceModel) => place.ID === route.ToID).Name}`}))
  }

  submit() {
    if (!this.checkForm()) return;

    this.tripsService.createTrip({
      routeId: this.value('routeId'),
      vehicleId: this.value('vehicleId'),
      description: this.value('description'),
      price: this.value('price'),
      departure: `${formatDate(this.value('departure_date'))} ${this.value('departure_time')}`,
      arrival: `${formatDate(this.value('arrival_date'))} ${this.value('arrival_time')}`,
    }).subscribe(
      data => {
        this.isTripCreated.emit(data)
        this.bsModalRef.hide()
      },
      error => this.handleError(error)
    )
  }

  handleError(res: HttpErrorResponse) {
    if (res.status !== 400) return;
    const error = res.error;
    //this.toastr.error(ERRORS[error.code]);
  }
}
