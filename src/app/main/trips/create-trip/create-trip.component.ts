import { Component, OnInit } from '@angular/core';
import { BsModalRef } from "ngx-bootstrap/modal";
import { FormBuilder, Validators } from "@angular/forms";
import { FormComponent } from "../../../shared/form/form.component";

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.less']
})
export class CreateTripComponent extends FormComponent implements OnInit {

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
  ) { super(); }

  ngOnInit(): void {
  }

  submit() {

  }
}
