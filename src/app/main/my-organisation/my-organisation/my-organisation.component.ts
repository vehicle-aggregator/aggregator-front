import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {CompanyService} from "../../../shared/services/company.service";
import {FullCompanyModel} from "../../../shared/models/company.model";
import {NgxSpinnerService} from "ngx-spinner";
import {finalize} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {CreateRouteComponent} from "../../routes/create-route/create-route.component";
import {BsModalService} from "ngx-bootstrap/modal";
import {ImageComponent} from "../image/image.component";

@Component({
  selector: 'app-my-organisation',
  templateUrl: './my-organisation.component.html',
  styleUrls: ['./my-organisation.component.less']
})
export class MyOrganisationComponent implements OnInit {
  company: FullCompanyModel;

  constructor(
    public translate: TranslateService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private companyService: CompanyService
  ) { }

  async ngOnInit() {
    this.spinner.show()

    await this.companyService.getMyCompany().pipe(finalize(() => this.spinner.hide())).subscribe(
      company => this.company = company,
      error => {},
    )
  }

  getTranslate(kye: string) {
    return this.translate.instant(kye)
  }

  showToastr() {
    this.toastr.success(this.translate.instant('The invitation was copied successfully'))
  }

  openDocument(src: string) {
    const modal = this.modalService.show(ImageComponent, { initialState: { src: src }, class: 'modal-lg'});
  }
}
