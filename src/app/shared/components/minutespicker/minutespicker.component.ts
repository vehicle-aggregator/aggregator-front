import { Component, ElementRef, Input, forwardRef, Output, EventEmitter, ViewChild } from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import IMask from 'imask';
import {formatTimeFromDate, setTimeToDate} from "../../helpers/format-date";

const FILLED_REGEXP = /^[+-]?\d\d:\d\d$/;
@Component({
  selector: 'app-minutespicker',
  templateUrl: './minutespicker.component.html',
  styleUrls: ['./minutespicker.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MinutespickerComponent),
      multi: true
    }
  ]
})
export class MinutespickerComponent implements ControlValueAccessor {
  _TIME = '';
  _DATE: Date | null = null;
  @Input() format: 'minutes' | 'date' | 'string' | 'hours' = 'minutes';
  @Input() mode: 'hours' | 'time' | 'superHours' = 'hours';
  @Input() size: '' | 'medium' | 'big' = '';
  @Input() signed = false;
  @Input() allow24Hours = false;
  @Output() blur = new EventEmitter();
  @ViewChild('input', { static: true }) input: ElementRef | null = null;
  disabled = false;

  get mask(): any {
    return {
      mask: `${this.signed ? '[sign]' : ''}hh{:}mm`,
      blocks: {
        ...(this.signed ? { sign: { mask: /^[+-]$/ } } : {}),
        hh: this.hoursBlock,
        mm: {
          mask: IMask.MaskedRange,
          from: 0,
          to: 59,
          autofix: true
        }
      }
    };
  }

  constructor(
    private el: ElementRef
  ) { }

  get hoursBlock(): any {
    if (this.mode === 'superHours') { return { mask: '0[0][0]' }; }
    return {
      mask: IMask.MaskedRange,
      from: 0,
      to: this.mode === 'hours' ? 99 : this.allow24Hours ? 24 : 23,
      autofix: true
    };
  }

  get invalid(): boolean {
    return this.el.nativeElement.classList.contains('invalid');
  }

  get time(): string {
    return this._TIME.match(this.filledRegexp) ? this._TIME : '';
  }

  set time(val: string) {
    this._TIME = this.formatTime(val);

    let out;
    if (!val.match(this.filledRegexp)) {
      out = null;
    } else {
      switch (this.format) {
        case 'minutes': {
          out = this.timeToMinutes(val);
          break;
        }
        case 'hours': {
          out = this.timeToHours(val);
          break;
        }
        case 'date': {
          if (!this._DATE || isNaN(Number(this._DATE))) { this._DATE = new Date(); }
          out = setTimeToDate(this._DATE, val);
          break;
        }
        case 'string': {
          out = this._TIME;
          break;
        }
      }
    }

    this.onChange(out);
  }

  onChange = (arg: any) => arg;
  onTouched = () => { };

  writeValue(value: any): any {
    if (value == null) { return this._TIME = ''; }

    switch (this.format) {
      case 'minutes': {
        this._TIME = this.minutesToTime(value);
        break;
      }
      case 'hours': {
        this._TIME = this.hoursToTime(value);
        break;
      }
      case 'date': {
        this._DATE = new Date(value);
        this._TIME = formatTimeFromDate(this._DATE);
        break;
      }
      case 'string': {
        // ne TO
        this._TIME = value ? (/^\d+:\d+/.exec(value)) : value;
        break;
      }
    }
  }

  registerOnChange(fn: any): any {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): any {
    this.onTouched = fn;
  }

  onBlur(): any {
    if (!this.time && this.input) { this.input.nativeElement.value = ''; }
    this.blur.emit();
    this.onTouched();
  }

  minutesToTime(minutes: number): string {
    const absMinutes = Math.abs(minutes);
    const hours = Math.floor(absMinutes / 60);
    const hh = String(Math.floor(absMinutes / 60)).padStart(2, '0');
    const mm = String(absMinutes - hours * 60).padStart(2, '0');
    return `${minutes < 0 && this.signed ? '-' : ''}${hh}:${mm}`;
  }

  timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':');
    return (Number(hours) < 0 && this.signed ? -1 : 1) * (Math.abs(Number(hours)) * 60 + Number(minutes));
  }

  hoursToTime(hours: number): string {
    const val = Math.abs(hours);
    const totalMinutes = Math.floor(val * 60);
    const intHours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const hh = String(intHours).padStart(2, '0');
    const mm = String(minutes).padStart(2, '0');
    return `${hours < 0 && this.signed ? '-' : ''}${hh}:${mm}`;
  }

  timeToHours(time: string): number {
    const [hours, minutes] = time.split(':');
    return (Number(hours) < 0 && this.signed ? -1 : 1) * (Math.abs(Number(hours)) + Number(minutes) / 60);
  }

  setDisabledState(isDisabled: boolean): any {
    this.disabled = isDisabled;
  }

  get maxlength(): number {
    const length = this.signed ? 6 : 5;
    return this.mode === 'superHours' ? length + 1 : length;
  }

  formatTime(time: string): string {
    const [hours, minutes] = time.split(':');
    return (this.allow24Hours && this.format === 'string' && minutes?.length === 2 && hours === '24') ? `${hours}:00` : time;
  }

  get filledRegexp(): RegExp {
    return FILLED_REGEXP;
  }
}
