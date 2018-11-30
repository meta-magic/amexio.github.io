import { Injectable } from '@angular/core';
import { AmexioGridModel } from './gridmodel.component';

import { GridConfig } from '../../../models/GridConfig';

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

  createLayout(dataLayout: GridConfig) {
    let findStatus = false;
    this.count = dataLayout.count;
    const data = dataLayout.getLayout();
    if (this.layoutData.length <= 0) {
      this.layoutData.push(data);
    } else {
      this.layoutData.forEach((obj: any) => {
        if (obj.name === data.name) {
          obj[data.layoutType] = data[data.layoutType];
          findStatus = true;
        }
      });
      if (!findStatus) {
        this.layoutData.push(data);
      }
    }
}

  getLayoutData(layoutName: string) {
    return this.layoutData.find((obj) => obj.name === layoutName);
  }

}
