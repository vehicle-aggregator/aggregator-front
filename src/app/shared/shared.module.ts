import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './modules/material/material.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileLoaderComponent } from './components/file-loader/file-loader.component';
import { SafePipe, SafeUrlPipe } from './pipes/safe.pipe';
import { FormErrorDirective } from './directives/form-error.directive';
import {TranslateService} from "@ngx-translate/core";
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import {IMaskDirectiveModule} from "angular-imask";
import {BsDatepickerModule, DatepickerModule} from "ngx-bootstrap/datepicker";
import {NgxSpinnerModule} from "ngx-spinner";
import {ModalModule} from "ngx-bootstrap/modal";
import {IMaskModule} from "angular-imask";
import { MinutespickerComponent } from './components/minutespicker/minutespicker.component';
import {ToastrModule} from "ngx-toastr";

@NgModule({
  declarations: [
    SafePipe,
    SafeUrlPipe,
    FormErrorDirective,
    FileLoaderComponent,
    DatepickerComponent,
    MinutespickerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    IMaskDirectiveModule,
    DatepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgxSpinnerModule,
    IMaskModule,
    ModalModule.forRoot()
  ],exports: [
    CommonModule,
    SafePipe,
    SafeUrlPipe,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FileLoaderComponent,
    FormErrorDirective,
    DatepickerComponent,
    NgSelectModule,
    NgxSpinnerModule,
    MinutespickerComponent,
    IMaskModule,
  ], providers: [
    TranslateService,
  ]
})
export class SharedModule { }
