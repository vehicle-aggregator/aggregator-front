import {Component, EventEmitter, OnInit} from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { VehicleService } from "../../../shared/services/vehicle.service";
import { BsModalRef } from "ngx-bootstrap/modal";
import { HttpErrorResponse } from "@angular/common/http";
import {FormComponent} from "../../../shared/form/form.component";

@Component({
  selector: 'app-create-transport',
  templateUrl: './create-transport.component.html',
  styleUrls: ['./create-transport.component.less']
})
export class CreateTransportComponent extends FormComponent implements OnInit {

  vehicleTypes: any[];
  isVehicleCreated = new EventEmitter();

  //@ts-ignore
  form = this.fb.group({
    number_plate : [null, [Validators.required]],
    passengerCount : [null, [Validators.required]],
    vehicleCategoryID  : [null, [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private vehicleService: VehicleService,
    public bsModalRef: BsModalRef,
  ) { super() }

  ngOnInit(): void {
    this.vehicleService.getVehicleType().subscribe(data => this.vehicleTypes = data)
  }

  submit() {
    if (!this.checkForm()) return;

    this.vehicleService.createVehicle({ ...this.form.value, companyID: 1 }).subscribe(
      data => {
        this.isVehicleCreated.emit(data)
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
