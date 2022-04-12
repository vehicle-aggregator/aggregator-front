import { Component, OnInit } from '@angular/core';
import { menu } from "../../shared/models/menu-item";
import {AuthService} from "../../core/auth.service";
import {TranslateService} from '@ngx-translate/core';
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.less']
})
export class TopbarComponent implements OnInit {
  menu = menu;

  constructor(
    private authService: AuthService,
    public translate: TranslateService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.translate.use(sessionStorage.getItem('language') || environment.defaultLocale)
  }

  getCurrentLang() {
    return this.translate.currentLang;
  }

  changeLanguage(lang: string): void {
    sessionStorage.setItem('language', lang)
    this.translate.use(lang);
  }

  getImg(lang: string): string {
    return lang === 'ru' ? 'assets/img/ru.png' : 'assets/img/en.png';
  }

  get userName(): string {
    return this.authService.fullName
  }

  logout() {
    this.authService.logout()
    this.router.navigateByUrl('auth/login');
  }
}
