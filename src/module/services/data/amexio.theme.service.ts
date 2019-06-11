import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';

import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable()
export class AmexioThemeSwitcherService {

  constructor(private _http: HttpClient) {

  }
  // themeData: Observable<any>;
  themeData = new Rx.BehaviorSubject(null);

  loadThemes(url: string): Observable<any> {
    return this._http.get(url);
  }

  switchTheme(theme: any) {
    let response: any;
    this._http.get('assets/amexiomdathemes/json/' + theme.themeJSONFile).subscribe((data) => {
      response = data;
    }, (error) => {
    }, () => {
      this.themeData.next(response);

      const themeColor = response.themeColor;
      const appColor = response.appColor;
      const compColor = response.compColor;
      themeColor.forEach((style: any) => {
        const value = style.value.replace(';', '');
        document.documentElement.style.setProperty(style.key, value);

      });

      appColor.forEach((style: any) => {
        const value = style.value.replace(';', '');
        document.documentElement.style.setProperty(style.key, value);
      });

      compColor.forEach((style: any) => {
        document.documentElement.style.setProperty(style.key, style.value);
      });
    });
  }
}
