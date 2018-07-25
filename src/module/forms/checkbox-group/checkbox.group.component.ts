/**
 * Created by ketangote on 11/21/17.
 */
/*
Component Name : Amexio Checkbox Group
Component Selector :  <amexio-checkbox-group>
Component Description : Checkbox input component has been created to
render N numbers of check-box based on data-set configured.
Data-set can be configured using HTTP call OR Define fix number of check-box.
*/
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonDataService } from '../../services/data/common.data.service';
@Component({
  selector: 'amexio-checkbox-group',
  templateUrl: './checkbox.group.component.html',
})
export class AmexioCheckBoxGroupComponent implements OnInit {
  /*
  Properties
  name : horizontal
  datatype : boolean
  version : 4.0 onwards
  default : false
  description : Set true for horizontal checkbox
  */
  @Input() horizontal: boolean;
  /*
  Properties
  name : field-label
  datatype : string
  version : 4.0 onwards
  default :
  description : The label of this field
  */
  @Input('field-label') fieldlabel: string;
  /*
   not in use
  */
  @Input('field-name') fieldname: string;
  /*
  Properties
  name : data-reader
  datatype : string
  version : 4.0 onwards
  default :
  description : Key in JSON datasource for records
  */
  @Input('data-reader') datareader: string;
  /*
  Properties
  name : http-method
  datatype : string
  version : 4.0 onwards
  default :
  description : Type of HTTP call, POST,GET.
  */
  @Input('http-method') httpmethod: string;
  /*
  Properties
  name : http-url
  datatype : string
  version : 4.0 onwards
  default :
  description : REST url for fetching datasource.
  */
  @Input('http-url') httpurl: string;

  /*
Properties
name : display-field
datatype : string
version : 4.0 onwards
default :
description : Name of key inside response data to display on ui.
*/
  @Input('display-field') displayfield: string;
  /*
  Properties
  name : value-field
  datatype : string
  version : 4.0 onwards
  default :
  description : Name of key inside response data.use to send to backend
  */
  @Input('value-field') valuefield: string;
  /* not in use */
  @Input() search: boolean;
  /*
  Properties
  name : disabled
  datatype : boolean
  version : 4.0 onwards
  default : false
  description :  If true will not react on any user events and show disable icon over
  */
  @Input() disabled = false;
  /*
  Properties
  name : data
  datatype : any
  version : 4.0 onwards
  default :
  description : Local data for checkboxGroup.
  */
  _data: any;
  componentLoaded: boolean;
  @Input('data')
  set data(value: any) {
    this._data = value;
    if (this.componentLoaded) {
      this.setData(this._data);
    }
  }
  get data(): any {
    return this._data;
  }

  /*
 Properties
 name : required
 datatype : boolean
 version : 4.1.7 onwards
 default : false
 description :  property to set if manditory
 */
  @Input() required = false;
  mask = true;
  /*
  Events
  name : onSelection
  datatype : any
  version : none
  default :
  description : fire when check box click
  */
  @Output() onSelection: any = new EventEmitter<any>();
  calculatedColSize: any;
  isValid: boolean;
  @Output() isComponentValid: any = new EventEmitter<any>();
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
    this.isValid = !this.required;
    this.isComponentValid.emit(!this.required);
    if (this.httpmethod && this.httpurl) {
      this.amxHttp.fetchData(this.httpurl, this.httpmethod).subscribe((response) => {
        this.responseData = response;
      }, (error) => {
      }, () => {
        this.setData(this.responseData);
      });
    } else if (this.data) {
      this.previousValue = JSON.parse(JSON.stringify(this.data));
      this.setData(this.data);
    }
    if (this.required) {
      this.checkDefaultValidation();
    }
    this.componentLoaded = true;
  }
  checkDefaultValidation() {
    this.viewData.forEach((opt: any) => {
      if (opt.hasOwnProperty('checked') && opt.checked) {
        this.isValid = true;
        this.isComponentValid.emit(true);
        return;
      }
    });
  }

  setData(httpResponse: any) {
    this.responseData = this.getResponseData(httpResponse);
    this.viewData = this.getResponseData(httpResponse);
    const viewDataWithIdArray: any[] = [];
    this.viewData.forEach((viewDataObject: any) => {
      viewDataObject.id = 'checkbox' + Math.floor(Math.random() * 90000) + 10000;
      if (!viewDataObject.hasOwnProperty('disabled')) {
        viewDataObject.disabled = false;
      }
      viewDataWithIdArray.push(viewDataObject);
    });
    this.viewData = [];
    this.viewData = viewDataWithIdArray;
    this.mask = false;
  }
  getResponseData(httpResponse: any) {
    let responsedata = httpResponse;
    if (this.datareader != null) {
      const dr = this.datareader.split('.');
      for (const ir of dr) {
        responsedata = responsedata[ir];
      }
    } else {
      responsedata = httpResponse;
    }
    return responsedata;
  }
  filterData(event: any) {
    if (this.textValue.length > 0) {
      this.viewData = [];
      for (const vd of this.responseData) {
        const displayData = this.responseData[vd][this.displayfield];
        if (displayData.toLowerCase().startsWith(this.textValue)) {
          this.viewData.push(this.responseData[vd]);
        }
      }
    } else {
      this.viewData = this.responseData;
    }
  }
  setSelectedCheckBox(rowData: any, event: any) {
    if (rowData.hasOwnProperty('disabled') && !rowData.disabled) {
      rowData[this.valuefield] = !rowData[this.valuefield];
      if (rowData[this.valuefield]) {
        this.selectedCheckBox.push(rowData);
      } else {
        const indexOf = this.selectedCheckBox.indexOf(rowData);
        this.selectedCheckBox[indexOf] = [];
      }
      this.emitSelectedRows();
    }
  }
  emitSelectedRows() {
    const sRows = [];
    const cloneSelectedChecks = JSON.parse(JSON.stringify(this.selectedCheckBox));
    for (const sr of cloneSelectedChecks) {
      if (cloneSelectedChecks[sr]) {
        // remove id from selected value
        delete cloneSelectedChecks[sr].id;
        sRows.push(cloneSelectedChecks[sr]);
      }
    }
    if (this.selectedCheckBox.length > 0 && this.required) {
      let isValid = false;
      this.selectedCheckBox.forEach((c) => {
        if (c.checked) {
          isValid = true;
        }
      });
      this.isValid = isValid;
      this.isComponentValid.emit(isValid);
    }
    this.onSelection.emit(sRows);
  }

  // THIS MEHTOD CHECK INPUT IS VALID OR NOT
  checkValidity(): boolean {
    return this.isValid;
  }

}
