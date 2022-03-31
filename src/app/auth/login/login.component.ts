import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {finalize} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {FormComponent} from "../../shared/form/form.component";
import {AuthService} from "../../core/auth.service";
import { EmailValidator } from 'src/app/shared/validators/validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent extends FormComponent {

  //@ts-ignore
  form = this.fb.group({
    email: [null, [Validators.required, EmailValidator]],
    password: [null, [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router) {
    super();
  }

  submit() {
    if (!this.checkForm()) return;

    this.spinner.show();
    this.authService.login(this.form.value)
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe(
        user => {
          this.router.navigateByUrl('');
        },
        this.handleError.bind(this)
      )
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
}
