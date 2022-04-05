import { Injectable } from '@angular/core';
import IMask from 'imask';
import { formatDate } from '../helpers/form-data';

@Injectable({
  providedIn: 'root'
})
export class Constants {
  readonly dateFormat = 'DD-MM-YYYY';
  readonly datePickerConfig = {
    dateInputFormat: 'dd-MM-yyyy',
    adaptivePosition: true,
    containerClass: 'theme-red'
  };
  readonly datePickerPlaceholder = 'DD-MM-YYYY';
  readonly timeMask = {
    mask: 'hh:mm',

    blocks: {
      hh: {
        mask: IMask.MaskedRange,
        from: 0,
        to: 23,
        autofix: true
      },
      mm: {
        mask: IMask.MaskedRange,
        from: 0,
        to: 59,
        autofix: true
      }
    }
  };
  readonly weightMask = {
    mask: Number,
    min: 0,
    max: 9999,
    scale: 0
  };

  readonly dateMask = {
    mask: Date,
    pattern: 'd-`m-`Y'
  };

  readonly numberMask = {
    mask: Number
  };

  readonly numberCharacterMask = {
    mask: /^([a-zA-Z0-9])*$/g
  };

  readonly numberCharacterDashMask = {
    mask: /^([a-zA-Z0-9-])*$/g
  };

  readonly intMask = {
    mask: Number,
    scale: 0
  };

  readonly digitsMask = {
    mask: /^\d*$/g
  };

  readonly noDigitsMask = {
    mask: /^[^\d]*$/g
  };

  readonly emptyValidationString = '';
  readonly charactersAndNumbersRegex = '[A-Za-z0-9]+';
  readonly charactersAndNumbersWithSpacesRegex = '[A-Za-z0-9 ]+';
  readonly onlyNumbersRegex = '^[0-9]*$';

  readonly contactType = {
    email: 'EMAIL',
    phone: 'PHONE'
  };

  readonly fullDateMask = {
    mask: Date,
    pattern: 'd-`m-`Y',

    format(date: Date): any {
      return formatDate(date);
    },

    parse(str: any): any {
      const dayMonthYear = str.split('-');
      return new Date(dayMonthYear[2], dayMonthYear[1] - 1, dayMonthYear[0]);
    },
    overwrite: true,
    autofix: true
  };

  readonly monthYearMask = {
    mask: Date,
    pattern: 'm-`Y',

    format(date: any): any {
      return formatDate(date, 'MM-yyyy');
    },

    parse(str: any): any {
      const dayMonthYear = str.split('-');
      return new Date(dayMonthYear[1], dayMonthYear[0] - 1, 1);
    },

    overwrite: true,
    autofix: true
  };

  readonly monthYearPlaceholder = 'MM-YYYY';
}
