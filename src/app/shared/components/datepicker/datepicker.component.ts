import { Component, Input, forwardRef,
  ViewChild, ElementRef,
  OnInit, Injector } from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NgForm} from '@angular/forms';
import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';
import { formatDate } from "../../helpers/format-date";

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true
    }
  ]
})
export class DatepickerComponent implements ControlValueAccessor, OnInit {
  _date: Date | null = null;
  @Input() placement: 'top' | 'bottom' | 'left' | 'right' = 'bottom';
  @Input() maxDate: Date = new Date(3000, 11, 31);
  @Input() minDate: Date = new Date(1900, 0, 1);
  @Input() minMode: BsDatepickerViewMode = 'day';
  @Input() readonly: boolean;
  @Input() placeholder: string = 'DD-MM-YYYY';
  @ViewChild('input', { static: true }) input: ElementRef;
  @ViewChild('dateForm') dateForm: NgForm;
  disabled: boolean;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private injector: Injector) { }

  ngOnInit() {
    this.initDatePicker();
    document.querySelector('modal-container')?.addEventListener('scroll', function() {});
  }

  get date(): Date | null {
    return this._date;
  }

  set date(d: Date | null) {
    if (d && d !== this._date) {
      this._date = d
      this.onChange(this._date);
    }
  }

  get dateString(): string | null {
    return formatDate(this._date)
  }

  onChange = (arg: any) => arg;
  onTouched = () => { };

  writeValue(date: any) {
    this._date = date;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  initDatePicker() {
    const datePickerConfig = {
      containerClass: 'theme-dark-blue',
      dateInputFormat: 'YYYY-MM-DD',
      adaptivePosition: true,
      minMode : this.minMode
    };
    this.bsConfig = Object.assign({}, datePickerConfig);
  }
}
