import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {FormComponent} from "../../../shared/form/form.component";

@Component({
  selector: 'app-invite-token',
  templateUrl: './invite-token.component.html',
  styleUrls: ['./invite-token.component.less']
})
export class InviteTokenComponent extends FormComponent implements OnInit {

  //@ts-ignore
  form = this.fb.group({
    code: [null, [Validators.required]],
  });

  constructor(
    private fb: FormBuilder
  ) { super(); }

  ngOnInit(): void {
  }


  async submit() {
    if (!this.checkForm()) return;
  }
}
