import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import { EmailValidator } from "../../shared/validators/validators";
import { finalize } from "rxjs";
import { FormComponent } from "../../shared/form/form.component";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.less']
})
export class ForgotPasswordComponent extends FormComponent implements OnInit {

  //@ts-ignore
  form = this.fb.group({
    email: [null, [Validators.required, EmailValidator]],
  });

  constructor(
    private fb: FormBuilder,
  ) {
    super();
  }

  ngOnInit(): void {
  }

  submit() {
    if (!this.checkForm()) return;

    // this.spinner.show();
    // this.authService.login(this.form.value)
    //   .pipe(finalize(() => this.spinner.hide()))
    //   .subscribe(
    //     user => {
    //       this.router.navigateByUrl('');
    //     },
    //     this.handleError.bind(this)
    //   )
  }
}
