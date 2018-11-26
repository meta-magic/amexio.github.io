import { Injectable } from '@angular/core';
import { AmexioGridModel } from './gridmodel.component';

@Injectable({
  providedIn: 'root',
})
export class AmexioGridLayoutService {
  servicevar: any;
  layoutData: any[] = [];
  devicevar: any;
  count: number;

  constructor() {
  }
  createLayout(key: string, devicetype?: string): any {
    this.servicevar = key;
    this.devicevar = devicetype;
    if (this.layoutData.length <= 0) {
      this.modelData();
    } else if (!this.layoutData.find((obj) => obj.name === this.servicevar)) {
      this.modelData();
    }
    return this;
  }
  modelData() {
    const amexiogridmodel = new AmexioGridModel();
    amexiogridmodel.name = this.servicevar;
    this.layoutData.push(amexiogridmodel);
  }

  addlayout(layout: any[]): any {
    this.count = layout.length;
    const counter = 0;
    let deviceName = '';
    this.layoutData.forEach((obj: any) => {
      if (this.devicevar === '') {
        deviceName = 'desktop';
      } else {
        for (let i = 0; i < Object.entries(obj).length; i++) {
          if ((Object.keys(obj)[i]) === this.devicevar) {
            deviceName = this.devicevar;
          }
        }
      }
    });
    this.layoutData.forEach((obj: any) => {
      if (obj.name === this.servicevar) {
        obj[deviceName].push(layout);
      }
    });
    return this;
  }
  getLayoutData(layoutName: string) {
    return this.layoutData.find((obj) => obj.name === layoutName);
  }
}
