import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './modules/material/material.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileLoaderComponent } from './components/file-loader/file-loader.component';
import { SafePipe, SafeUrlPipe } from './pipes/safe.pipe';

@NgModule({
  declarations: [
    SafePipe,
    SafeUrlPipe,
    FileLoaderComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
  ],exports: [
    CommonModule,
    SafePipe,
    SafeUrlPipe,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FileLoaderComponent,
    NgSelectModule,
  ]
})
export class SharedModule { }
