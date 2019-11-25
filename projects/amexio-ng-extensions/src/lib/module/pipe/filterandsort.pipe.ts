
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

import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterandsort',
})
@Injectable()
export class FilterAndSortPipe implements PipeTransform {

  transform(items: any[], field: string, value: string, sortcolumn: string): any[] {
    if ((value && value.length > 0) && (sortcolumn && sortcolumn.length > 0)) {
      return this.sort(this.filter(items, field, value), sortcolumn);
    } else if ((value && value.length > 0)) {
      return this.filter(items, field, value);
    } else if ((sortcolumn && sortcolumn.length > 0)) {
      return this.sort(items, sortcolumn);
    } else {
      return items;
    }
  }

  private filter(items: any[], field: string, value: string): any[] {
    if (!items) {
      return [];
    }
    if (!field || !value) {
      return items;
    }

    return items.filter((singleItem) =>
      singleItem[field].toLowerCase().includes(value.toLowerCase()),
    );
  }

  private sort(items: any[], field: string): any {
    if (field && items) {
      return items.sort((a, b) => {
        const x = a[field].toLowerCase();
        const y = b[field].toLowerCase();
        return this.sortOrder(1, x, y);
      });
    }

  }

  private sortOrder(sortOrder: any, x: any, y: any) {
    if (sortOrder === 2) {
      if (x < y) {
        return 1;
      }
      if (x > y) {
        return -1;
      }
    } else {
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
    }
  }
}
