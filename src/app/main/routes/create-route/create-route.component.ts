import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import { BsModalRef } from "ngx-bootstrap/modal";
import {PlaceModel} from "../../../shared/models/place.model";
import {FormBuilder, Validators} from "@angular/forms";
import {FormComponent} from "../../../shared/form/form.component";
import {RoutesService} from "../../../shared/services/routes.service";
import {HttpErrorResponse} from "@angular/common/http";
import {formatDate} from "../../../shared/helpers/format-date";
import {NgxSpinnerService} from "ngx-spinner";
import {finalize} from "rxjs";

@Component({
  selector: 'app-create-route',
  templateUrl: './create-route.component.html',
  styleUrls: ['./create-route.component.less']
})
export class CreateRouteComponent extends FormComponent {

  @Input() places: PlaceModel[] = []
  isRouteCreated = new EventEmitter();

  constructor(
    public bsModalRef: BsModalRef,
    private routesService: RoutesService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
  ) { super() }

  //@ts-ignore
  form = this.fb.group({
    from : [null, [Validators.required]],
    to : [null, [Validators.required]],
    active_from_date: [null, [Validators.required]],
    active_from_time: [null, [Validators.required]],
  });


  submit() {
    if (!this.checkForm()) return;

    this.spinner.show('create')
    this.routesService.createRoute({
      from: this.value('from'),
      to: this.value('to'),
      active_from: `${formatDate(this.value('active_from_date'))} ${this.value('active_from_time')}` })
      .pipe(finalize(() => this.spinner.hide('create')))
      .subscribe(
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
