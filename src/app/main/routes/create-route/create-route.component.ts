import {Component, Input, OnInit} from '@angular/core';
import { BsModalRef } from "ngx-bootstrap/modal";
import {PlaceModel} from "../../../shared/models/place.model";
import {FormBuilder, Validators} from "@angular/forms";
import {FormComponent} from "../../../shared/form/form.component";

@Component({
  selector: 'app-create-route',
  templateUrl: './create-route.component.html',
  styleUrls: ['./create-route.component.less']
})
export class CreateRouteComponent extends FormComponent implements OnInit {

  @Input() places: PlaceModel[] = []

  //@ts-ignore
  form = this.fb.group({
    from : [null, [Validators.required]],
    to : [null, [Validators.required]],
  });

  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
  ) { super() }

  ngOnInit(): void {
  }

  submit() {
    if (!this.checkForm()) return;

  }
}
