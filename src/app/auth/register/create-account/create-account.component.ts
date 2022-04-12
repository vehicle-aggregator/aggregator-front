import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmailValidator, PasswordValidator, setError} from "../../../shared/validators/validators";
import {AuthService} from "../../../core/auth.service";
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {FormComponent} from "../../../shared/form/form.component";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.less']
})
export class CreateAccountComponent extends FormComponent {

  //@ts-ignore
  form = this.fb.group({
    name: [null, [Validators.required]],
    lastname: [null, [Validators.required]],
    middlename: [null, [Validators.required]],
    gender: [null, [Validators.required]],
    email: [null, [Validators.required, EmailValidator]],
    birthday: [null, [Validators.required]],
    password: [null, [Validators.required, PasswordValidator]],
    confirmPassword: [null, [Validators.required, PasswordValidator]]
  }, {
    validators: this.equalPasswordsValidator
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router) {
    super();
  }

  async submit() {
    if (!this.checkForm()) return;

    this.spinner.show();
    let user = null;

    try {
      user = await this.authService.register(this.form.value).toPromise()
    } catch (e) {
      // @ts-ignore
      this.handleError(e)
    } finally {
      this.spinner.hide()
    }

    return user;
  }

  handleError(res: HttpErrorResponse) {
    if (res.status !== 400) return;
    const error = res.error;
    if (error.code === 'INVALID_CREDENTIALS') {
      this.control('email')?.setErrors({ invalid: true });
      this.control('password')?.setErrors({ invalid: true });
      // return;
    }
    //this.toastr.error(ERRORS[error.code]);
  }

  equalPasswordsValidator(form: FormGroup) {
    const passControl = form.get('password'),
      confirmPassControl = form.get('confirmPassword'),
      valid = passControl?.value === confirmPassControl?.value;
    setError(confirmPassControl, valid, 'equal');
  }
}
