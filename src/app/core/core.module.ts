import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AuthService } from './auth.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-center',
      closeButton: true
    }),
    BsDropdownModule.forRoot(),
    NgxSpinnerModule,
    HttpClientModule
  ],
  exports: [
    NgxSpinnerModule
  ],
  providers: [
    AuthService
  ]
})
export class CoreModule { }
