import { Component, OnInit } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { RoutesService } from "../../../shared/services/routes.service";
import { RouteModel } from "../../../shared/models/route.model";
import { PlacesService } from "../../../shared/services/places.service";
import { PlaceModel } from "../../../shared/models/place.model";
import {BsModalService} from "ngx-bootstrap/modal";
import {CreateRouteComponent} from "../create-route/create-route.component";

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.less']
})
export class RoutesComponent implements OnInit {
  routes: RouteModel[] = []
  places: PlaceModel[] = []

  constructor(
    public translate: TranslateService,
    private routesService: RoutesService,
    private modalService: BsModalService,
    private placesService: PlacesService,
  ) { }

  ngOnInit(): void {
    this.routesService.getRoutes().subscribe(data => this.routes = data)
    this.placesService.getPlaces().subscribe(data => this.places = data)
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
