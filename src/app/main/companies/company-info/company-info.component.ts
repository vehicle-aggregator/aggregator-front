import { Component, OnInit } from '@angular/core';
import {FullCompanyModel} from "../../../shared/models/company.model";
import {TranslateService} from "@ngx-translate/core";
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";
import {BsModalService} from "ngx-bootstrap/modal";
import {CompanyService} from "../../../shared/services/company.service";
import {finalize} from "rxjs";
import {ImageComponent} from "../../my-organisation/image/image.component";
import {ActivatedRoute} from "@angular/router";
import {UserBlockComponent} from "../../users/user-block/user-block.component";
import {CompanyBlockComponent} from "../company-block/company-block.component";

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.less']
})
export class CompanyInfoComponent implements OnInit {
  company: FullCompanyModel;

  constructor(
    public translate: TranslateService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private activateRoute: ActivatedRoute,
    private modalService: BsModalService,
    private companyService: CompanyService
  ) { }

  async ngOnInit() {
    this.spinner.show()

    this.activateRoute.params.subscribe(
      params => this.loadCompany(params['id'])
    );
  }

  async loadCompany(id: number) {
    await this.companyService.getCompanyById(id).pipe(finalize(() => this.spinner.hide())).subscribe(
      company => this.company = company,
      error => {
      },
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

  showBlockModal(company: FullCompanyModel) {
    const modal = this.modalService.show(CompanyBlockComponent, { initialState: { companyName: company.name }, class: 'modal-540' });
    // modal.content?.isUserBlocked.subscribe(async () => {
    //   try {
    //     await this.usersService.banBusinessUsers(user.BusinessUser[0].ID).toPromise()
    //     this.loadUser();
    //     this.toastr.success('The user was blocked successfully');
    //     modal.hide()
    //   } catch (error) {
    //     // @ts-ignore
    //     this.toastr.error(error.message)
    //   }
    // });
  }
}
