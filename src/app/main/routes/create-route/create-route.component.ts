import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import { BsModalRef } from "ngx-bootstrap/modal";
import {PlaceModel} from "../../../shared/models/place.model";
import {FormBuilder, Validators} from "@angular/forms";
import {FormComponent} from "../../../shared/form/form.component";
import {RoutesService} from "../../../shared/services/routes.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-create-route',
  templateUrl: './create-route.component.html',
  styleUrls: ['./create-route.component.less']
})
export class CreateRouteComponent extends FormComponent implements OnInit {

  @Input() places: PlaceModel[] = []
  isRouteCreated = new EventEmitter();

  constructor(
    public bsModalRef: BsModalRef,
    private routesService: RoutesService,
  ) { super() }

  ngOnInit(): void {
  }

  submit() {
    if (!this.checkForm()) return;

    this.routesService.createRoute(this.form.value).subscribe(
      data => {
        this.isRouteCreated.emit(data)
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
