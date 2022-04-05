import { Component, ElementRef, forwardRef, Input, ViewChild } from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'file-loader',
  templateUrl: './file-loader.component.html',
  styleUrls: ['./file-loader.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileLoaderComponent),
      multi: true
    }
  ]
})
export class FileLoaderComponent implements ControlValueAccessor {

  @Input() name: string = "file";
  @Input() showImg: boolean;
  @ViewChild('fileInput', { static: true }) input: ElementRef;

  _imgUrl: string | null;

  constructor(
    private toastr: ToastrService
  ) { }

  get imgUrl(): string | null {
    return this._imgUrl;
  }

  set imgUrl(img: string | null) {
    this._imgUrl = img;
  }

  onChange = (arg: any) => arg;
  onTouched = () => { };

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  writeValue(url: string): void {
    this._imgUrl = url;
  }

  changeImage(event: any) {
    const file = event.target?.files[0];

    if (!file) return;

    if (!['image/jpeg', 'image/png', 'image/svg', 'image/svg+xml'].includes(file.type)){
      this.toastr.error('Choose a correct image file.');
      this.input.nativeElement.value = null;
      return;
    }
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      this.imgUrl = fileReader.result as string;
      this.onChange(this.imgUrl);
    };
  }

  deleteImg() {
    this.input.nativeElement.value = '';

    this.imgUrl = null;
    this.onChange(this.imgUrl);
  }
}
