import { NgModule } from '@angular/core';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { BrowserModule } from '@angular/platform-browser';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main/main.component';
import { TopbarComponent } from './topbar/topbar.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    MainComponent,
    TopbarComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    HttpClientModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
  ], providers: [
    TranslateService
  ]
})
export class MainModule { }
export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http);
}
