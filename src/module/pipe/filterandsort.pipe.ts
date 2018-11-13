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
