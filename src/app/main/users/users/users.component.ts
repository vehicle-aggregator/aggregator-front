import { Component, OnInit } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import {UsersService} from "../../../shared/services/users.service";
import {finalize} from "rxjs";
import {NgxSpinnerService} from "ngx-spinner";
import {User} from "../../../shared/models/users.model";
import {BsModalService} from "ngx-bootstrap/modal";
import {UserBlockComponent} from "../user-block/user-block.component";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less']
})
export class UsersComponent implements OnInit {
  users: User[] = []


  constructor(
    public translate: TranslateService,
    public spinner: NgxSpinnerService,
    private modalService: BsModalService,
    private usersService: UsersService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.loadUser();
  }

  getTranslate(kye: string) {
    return this.translate.instant(kye)
  }

  showBlockModal(user: User) {
    const modal = this.modalService.show(UserBlockComponent, { initialState: {email: user.email}, class: 'modal-540' });
    modal.content?.isUserBlocked.subscribe(async () => {
      this.usersService.banBusinessUsers(user.ID).subscribe(
        () => {
          this.loadUser();
          this.toastr.success('The user was blocked successfully');
        },
        error => this.toastr.error(error.error)
      )
    });
  }

  loadUser() {
    this.spinner.show()

    this.usersService.getBusinessUsers()
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe(
        users => this.users = users,
        error => {}
      )
  }

  showUnblockModal() {
    // TODO
  }


}
