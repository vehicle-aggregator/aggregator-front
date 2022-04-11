import { AfterContentInit, ContentChild, Directive, ElementRef, HostBinding, Input, OnDestroy } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Directive({
  selector: '[ll-form-error]'
})
export class FormErrorDirective implements AfterContentInit, OnDestroy {
  @ContentChild(NgControl) control !: NgControl;
  private errorElement: HTMLElement;
  private subscription: Subscription;

  @HostBinding('class.ll-form-control-error') get invalid() {
    return this.control && this.control.touched && this.control.invalid;
  }

  constructor(private el: ElementRef) {
  }

  ngAfterContentInit(): void {
    if (!this.control) return;
    this.el.nativeElement.insertAdjacentHTML('beforeend', `<div class="ll-form-error"></div>`);
    this.errorElement = this.el.nativeElement.querySelector('.ll-form-error');
    // @ts-ignore
    this.subscription = this.control.valueChanges.pipe(startWith(null)).subscribe(this.updateError.bind(this));
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  updateError(): void {
    if (!this.control || !this.errorElement) return;
    this.errorElement.innerText = this.control.value || this.control.value === 0 ? 'Invalid' : 'Required';
  }
}
