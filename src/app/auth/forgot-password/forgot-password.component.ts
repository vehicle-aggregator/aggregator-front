import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {EmailValidator, PasswordValidator} from "../../shared/validators/validators";
import { finalize } from "rxjs";
import { FormComponent } from "../../shared/form/form.component";
import {AuthService} from "../../core/auth.service";
import {NgxSpinnerService} from "ngx-spinner";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.less']
})
export class ForgotPasswordComponent extends FormComponent implements OnInit {

  stage = 1

  //@ts-ignore
  form = this.fb.group({
    email: [null, [Validators.required, EmailValidator]],
    code: ['1234', [Validators.required]],
    password: ['123Admin@', [Validators.required, PasswordValidator]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private toastr: ToastrService,
  ) {
    super();
  }

  ngOnInit(): void {
  }

  submit() {
    if (!this.checkForm()) return;
    this.spinner.show();

    if (this.stage === 1) {
      this.authService.sendEmail(this.value('email'))
        .pipe(finalize(() => this.spinner.hide()))
        .subscribe(
          () => {
            this.stage = 2;
            this.control('code')?.setValue(null)
          },
          this.handleError.bind(this)
        )
    }

    if (this.stage === 2) {
      this.authService.sendCode(this.value('code'), this.value('email'))
        .pipe(finalize(() => this.spinner.hide()))
        .subscribe(
          () => {
            this.stage = 3;
            this.control('password')?.setValue(null)
          },
          this.handleError.bind(this)
        )
    }

    if (this.stage === 3) {
      this.authService.sendCode(this.value('code'), this.value('email'))
        .pipe(finalize(() => this.spinner.hide()))
        .subscribe(
          () => {
            this.router.navigateByUrl('auth');
          },
          this.handleError.bind(this)
        )
    }
  }


  handleError(res: HttpErrorResponse) {
    this.toastr.error(res.error);
  }
}
