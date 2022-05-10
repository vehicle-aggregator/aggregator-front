import { Component, OnInit } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import {UsersService} from "../../../shared/services/users.service";
import {finalize} from "rxjs";
import {NgxSpinnerService} from "ngx-spinner";
import {User} from "../../../shared/models/users.model";

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
    public usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.spinner.show()

    this.usersService.getBusinessUsers()
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe(
      users => this.users = users,
      error => {}
    )
  }

  getTranslate(kye: string) {
    return this.translate.instant(kye)
  }
}
