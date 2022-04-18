import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {VehicleService} from "../../../shared/services/vehicle.service";
import {BsModalRef} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-create-transport',
  templateUrl: './create-transport.component.html',
  styleUrls: ['./create-transport.component.less']
})
export class CreateTransportComponent implements OnInit {

  vehicleTypes: any[];

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
  ) { }

  ngOnInit(): void {
    this.vehicleService.getVehicleType().subscribe(data => this.vehicleTypes = data)
  }

  submit() {

  }
}
