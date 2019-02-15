/*
* Copyright [2019] [Metamagic]
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
*/
import { Injectable } from '@angular/core';
import { AmexioGridModel } from './gridmodel.component';

import { GridConfig } from '../../../models/GridConfig';

@Injectable()
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
    data.count = this.count;
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
