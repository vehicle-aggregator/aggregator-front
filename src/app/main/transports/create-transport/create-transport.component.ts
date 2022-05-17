import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { VehicleService } from "../../../shared/services/vehicle.service";
import { BsModalRef } from "ngx-bootstrap/modal";
import { HttpErrorResponse } from "@angular/common/http";
import {FormComponent} from "../../../shared/form/form.component";
import { NumberPlate } from 'src/app/shared/validators/validators';
import {TranslateService} from "@ngx-translate/core";
import {BusPlace} from "../../../shared/models/vehicle.model";
import {big, especiallyBig, especiallySmall, middle, small} from "../../../shared/resources/bus";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-create-transport',
  templateUrl: './create-transport.component.html',
  styleUrls: ['./create-transport.component.less']
})
export class CreateTransportComponent extends FormComponent implements OnInit {

  @Input() translate: TranslateService;

  vehicleTypes: any[];
  isVehicleCreated = new EventEmitter();
  bus: BusPlace[] = []

  //@ts-ignore
  form = this.fb.group({
    number_plate : [null, [Validators.required, NumberPlate]],
    vehicleCategoryID  : [null, [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private vehicleService: VehicleService,
    public bsModalRef: BsModalRef,
    private spinner: NgxSpinnerService,
  ) { super() }

  ngOnInit(): void {
    this.vehicleService.getVehicleType().subscribe(data => this.vehicleTypes = data)
  }

  async submit() {
    if (!this.checkForm()) return;

    this.spinner.show()

    try {
      const newVehicle = await this.vehicleService.createVehicle({ ...this.form.value, passengerCount: this.bus.filter(place => place.show).length, companyID: 1 }).toPromise()
      const places = await this.vehicleService.putPlaces({ bus_id: newVehicle.ID, places: this.bus }).toPromise()

      this.isVehicleCreated.emit(newVehicle)
      this.spinner.hide()
      this.bsModalRef.hide()
    } catch (error) {
      // @ts-ignore
      this.handleError(error)
      this.bsModalRef.hide()
    }
  }

  handleError(res: HttpErrorResponse) {
    if (res.status !== 400) return;
    const error = res.error;
    //this.toastr.error(ERRORS[error.code]);
  }

  getTranslate(kye: string) {
    return this.translate.instant(kye)
  }

  changeVehicle(type: any) {
    const buses = [especiallySmall, small, middle, big, especiallyBig];
    this.bus = buses[type.ID - 1];
  }
}
