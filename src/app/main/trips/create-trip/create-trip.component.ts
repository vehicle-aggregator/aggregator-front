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
    price: [null, [Validators.required]],
    departure: [null, [Validators.required]],
    arrival: [null, [Validators.required]],
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

    this.tripsService.createTrip(this.form.value).subscribe(
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
