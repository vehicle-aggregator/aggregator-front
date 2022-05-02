import { Component, OnInit } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { RoutesService } from "../../../shared/services/routes.service";
import { RouteModel } from "../../../shared/models/route.model";
import { PlacesService } from "../../../shared/services/places.service";
import { PlaceModel } from "../../../shared/models/place.model";
import {BsModalService} from "ngx-bootstrap/modal";
import {CreateRouteComponent} from "../create-route/create-route.component";
import {FormBuilder, Validators} from "@angular/forms";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.less']
})
export class RoutesComponent implements OnInit {
  routes: RouteModel[] = []
  places: PlaceModel[] = []

  //@ts-ignore
  form = this.fb.group({
    from : [null, [Validators.required]],
    to : [null, [Validators.required]],
    active_from: [null, [Validators.required]],
  });

  constructor(
    public translate: TranslateService,
    private routesService: RoutesService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private placesService: PlacesService,
  ) { }

  async ngOnInit() {
    this.spinner.show()

    const [places, routes] = await Promise.all([
      this.placesService.getPlaces().toPromise(),
      this.routesService.getRoutes().toPromise()
    ])

    this.places = places
    this.routes = routes

    this.spinner.hide()
  }

  getTranslate(kye: string) {
    return this.translate.instant(kye)
  }

  getPlaceName(id: number): string {
    return this.places.find(place => place.ID === id)?.Name || '-'
  }

  showCreateModal() {
    const modal = this.modalService.show(CreateRouteComponent, { initialState: { places: this.places }, class: 'modal-lg'});
    modal.content?.isRouteCreated.subscribe(async (route) => {
      if (route) {
        this.routes = await this.routesService.getRoutes().toPromise()
      }
    });
  }
}
