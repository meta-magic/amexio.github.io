import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DisplayFieldService {

  data: any;

  dataIndex: any;

  rowData: string;

  constructor() { }

  findValue(dataIndex: string, data: any) {
    this.rowData = data;
    if (dataIndex != null) {
      const index = dataIndex.split('.');

      for (const ir of index) {
        this.rowData = this.rowData[ir];
      }
      return this.rowData;
      }
    }
}
