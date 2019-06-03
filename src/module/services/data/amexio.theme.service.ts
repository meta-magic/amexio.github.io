import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AmexioThemeSwitcherService {

  constructor(private _http: HttpClient) {

  }

  loadThemes(url: string): Observable<any> {
    return this._http.get(url);
  }

  switchTheme(theme: any) {
    let response: any;
    this._http.get('assets/themes/json/' + theme.themeJSONFile).subscribe((data) => {
      response = data;
    }, (error) => {
    }, () => {
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
