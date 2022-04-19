import { Component, OnInit } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { VehicleService } from "../../../shared/services/vehicle.service";
import { BsModalService } from "ngx-bootstrap/modal";
import { CreateTransportComponent } from "../create-transport/create-transport.component";
import { VehicleModel, VehicleTypeModel } from "../../../shared/models/vehicle.model";

@Component({
  selector: 'app-transports',
  templateUrl: './transports.component.html',
  styleUrls: ['./transports.component.less']
})
export class TransportsComponent implements OnInit {
  vehicleTypes: VehicleTypeModel[] = [];
  vehicles: VehicleModel[] = [];

  constructor(
    public translate: TranslateService,
    private modalService: BsModalService,
    private vehicleService: VehicleService
  ) { }

  async ngOnInit() {
    const [vehicles, vehicleTypes] = await Promise.all([
      this.vehicleService.getVehicle().toPromise(),
      this.vehicleService.getVehicleType().toPromise()
    ])

    this.vehicles = vehicles;
    this.vehicleTypes = vehicleTypes;
  }

  getTranslate(kye: string) {
    return this.translate.instant(kye)
  }

  showCreateModal() {
    const modal = this.modalService.show(CreateTransportComponent, { class: 'modal-lg'});
    modal.content?.isVehicleCreated.subscribe(async (vehicle) => {
      if (vehicle) {
        this.vehicles = await this.vehicleService.getVehicle().toPromise()
      }
    });
  }

  getCategory(CategoryID: number): string {
    return this.vehicleTypes.find(vehicle => vehicle.ID === CategoryID)?.Name || '-'
  }
}
