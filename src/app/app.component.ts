import {Component, OnInit} from '@angular/core';
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'vehicle-aggregator';

  constructor() {}

  ngOnInit(): void {
    if (!sessionStorage.getItem('language'))
      sessionStorage.setItem('language', environment.defaultLocale)
  }
}
