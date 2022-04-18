import { Component, OnInit } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { VehicleService } from "../../../shared/services/vehicle.service";
import { BsModalService } from "ngx-bootstrap/modal";
import {CreateTransportComponent} from "../create-transport/create-transport.component";

@Component({
  selector: 'app-transports',
  templateUrl: './transports.component.html',
  styleUrls: ['./transports.component.less']
})
export class TransportsComponent implements OnInit {
  constructor(
    public translate: TranslateService,
    private vehicleService: VehicleService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.vehicleService.getVehicleType().subscribe(data => console.log(data))
  }

  getTranslate(kye: string) {
    return this.translate.instant(kye)
  }

  showCreateModal() {
    const modal = this.modalService.show(CreateTransportComponent, { class: 'modal-540'});
    // modal.content?.isUserInvited.subscribe(value => {
    //   if (value) this.loadUsers();
    // });
  }
}
