/**
 * Created by ketangote on 11/21/17.
 */

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonDataService} from "../../services/data/common.data.service";


@Component({
  selector: 'amexio-checkbox-group',
  templateUrl: './checkbox.group.component.html',
  styleUrls: ['./checkbox.group.component.scss']
})
export class AmexioCheckBoxGroupComponent {

  @Input() horizontal: boolean;

  @Input('box-style') boxstyle = false;

  @Input('field-label') fieldlabel: string;

  @Input('field-name') fieldname: string;

  @Input('data-reader') datareader: string;

  @Input('http-method') httpmethod: string;

  @Input('http-url') httpurl: string;

  @Input('display-field') displayfield: string;

  @Input('value-field') valuefield: string;

  @Input() search: boolean;

  @Input() data: any;

  @Input() column: string;

  mask : boolean = true;

  @Output() onSelection: any = new EventEmitter<any>();

  calculatedColSize: any;

  elementId: string;

  responseData: any[];

  viewData: any[];

  textValue: string;

  selectedCheckBox: any[];

  previousValue: any;

  constructor(private amxHttp: CommonDataService) {
    this.selectedCheckBox = [];
  }

  ngOnInit() {
    if (this.httpmethod && this.httpurl) {
      this.amxHttp.fetchData(this.httpurl, this.httpmethod).subscribe(response => {
        this.responseData = response;
      }, error => {
      }, () => {
        this.setData(this.responseData);
      });
    } else if (this.data) {
      this.previousValue = JSON.parse(JSON.stringify(this.data));
      this.setData(this.data);
    }
  }

  ngDoCheck() {
    if (JSON.stringify(this.previousValue) != JSON.stringify(this.data)) {
      this.previousValue = JSON.parse(JSON.stringify(this.data));
      this.setData(this.data);
    }
  }

  setData(httpResponse: any) {
    this.responseData = this.getResponseData(httpResponse);
    this.viewData = this.getResponseData(httpResponse);
    let viewDataWithIdArray: any[] = [];
    this.viewData.forEach((viewDataObject: any) => {
      viewDataObject.id = 'checkbox' + Math.floor(Math.random() * 90000) + 10000;
      viewDataWithIdArray.push(viewDataObject);
    });
    this.viewData = [];
    this.viewData = viewDataWithIdArray;
    this.mask = false;
  }


  getResponseData(httpResponse: any) {
    let responsedata = httpResponse;
    let dr = this.datareader.split('.');
    for (let ir = 0; ir < dr.length; ir++) {
      responsedata = responsedata[dr[ir]];
    }
    return responsedata;
  }

  filterData(event: any) {
    if (this.textValue.length > 0) {
      this.viewData = [];
      for (let vd = 0; vd < this.responseData.length; vd++) {
        let displayData = this.responseData[vd][this.displayfield];
        if (displayData.toLowerCase().startsWith(this.textValue)) {
          this.viewData.push(this.responseData[vd]);
        }
      }
    } else {
      this.viewData = this.responseData;
    }

  }

  setSelectedCheckBox(rowData: any, event: any) {
    if(rowData.hasOwnProperty('disabled') && !rowData.disabled){
      rowData[this.valuefield] = !rowData[this.valuefield];

      if (rowData[this.valuefield]) {
        this.selectedCheckBox.push(rowData);
      } else {
        let indexOf = this.selectedCheckBox.indexOf(rowData);
        delete this.selectedCheckBox[indexOf];
      }

      this.emitSelectedRows();
    }
  }

  emitSelectedRows() {
    let sRows = [];
    let cloneSelectedChecks = JSON.parse(JSON.stringify(this.selectedCheckBox));
    for (let sr = 0; sr < cloneSelectedChecks.length; sr++) {
      if (cloneSelectedChecks[sr]) {
        //remove id from selected value
        delete cloneSelectedChecks[sr].id;
        sRows.push(cloneSelectedChecks[sr]);
      }
    }
    this.onSelection.emit(sRows);
  }


}
