import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

export class FormComponent {
  // @ts-ignore
  form: FormGroup;

  control(controlName: string): AbstractControl | null {
    return this.form.get(controlName);
  }

  value(controlName: string) {
    return this.control(controlName)?.value;
  }

  showError(controlName: string): boolean {
    const control = this.control(controlName);
    return !!control && control.touched && control.invalid;
  }

  fieldError(controlName: string): string {
    return this.value(controlName) ? 'Invalid' : 'Required';
  }

  touchControls(control: FormGroup | FormArray = this.form) {
    Object.values(control.controls).forEach(ctrl => {
      ctrl.markAsTouched();
      ctrl.updateValueAndValidity();
      if ((ctrl as FormArray).controls) this.touchControls(ctrl as FormArray);
    });
  }

  isFormValidDeep(form: any = this.form): boolean {
    return (form.valid || form.disabled) &&
      Object.values(form.controls)
        .filter(c => (c as FormArray).controls)
        .every(c => this.isFormValidDeep(c));
  }

  checkForm(): boolean {
    this.touchControls();
    return this.isFormValidDeep();
  }

  handleValidationErrors(res: HttpErrorResponse) {
    const err = res.error;
    if (err && err.code === 'VALIDATION') {
      err.fields.forEach((validationError: any) => {
        const c = this.control(validationError.field);
        if (c) c.setErrors({ [validationError.error.toLowerCase()]: true });
      });
    }
  }
}
