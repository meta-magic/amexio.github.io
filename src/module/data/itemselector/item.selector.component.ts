/**
 * Created by pratik on 27/12/17.
 */

/*
Component Name : Amexio item selector
Component Selector : <amexio-item-selector>
Component Description : ItemSelector is a specialized MultiSelect
field that renders as a pair of MultiSelect field, one with available options
and the other with selected options. A set of buttons in between allows items to be
moved between the fields and reordered within the selection.
*/
import { Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonDataService } from '../../services/data/common.data.service';

@Component({
  selector: 'amexio-item-selector', templateUrl: './item.selector.component.html',
})

export class AmexioItemSelectorComponent implements OnInit, DoCheck {

  /*
Properties
name : data
datatype : any
version : 4.0 onwards
default : none
description :  Local data for item selectors.
*/
  @Input() data: any;

  /*
Properties
name : height
datatype : any
version : 4.0 onwards
default : none
description :  Height of item selector
*/
  @Input() height: any;

  mask = true;

  /*
Properties
name : data-reader
datatype : string
version : 4.0 onwards
default : none
description :  Key in JSON Datasource for records.
*/
  @Input('data-reader') datareader: string;

  /*
Properties
name : http-method
datatype : string
version : 4.0 onwards
default : none
description :  Type of HTTP call, POST,GET.
*/
  @Input('http-method') httpmethod: string;

  /*
Properties
name : http-url
datatype : string
version : 4.0 onwards
default : none
description :  REST url for fetching datasource.
*/
  @Input('http-url') httpurl: string;

  /*
Properties
name : display-field
datatype : string
version : 4.0 onwards
default : none
description :  Name of key inside response data to display on ui.
*/
  @Input('display-field') displayfield: string;

  /*
Properties
name : value-field
datatype : string
version : 4.0 onwards
default : none
description :  Name of key inside response data.use to send to backend
*/
  @Input('value-field') valuefield: string;

  /*
Events
name : availableRecords
datatype : none
version : none
default : none
description :  Get available values objects.
*/
  @Output() availableRecords: any = new EventEmitter<any>();

  /*
Events
name : selectedRecords
datatype : none
version : none
default : none
description :  Get selected value Object.
*/
  @Output() selectedRecords: any = new EventEmitter<any>();

  availableData: any[];

  selectedData: any[] = [];

  switchingObject: any;

  objectIndex: any;

  leftactive = true;

  rightactive = true;

  response: any;

  previousValue: any;

  check: any;

  constructor(public itemSelectorService: CommonDataService) {
  }

  ngOnInit() {
    if (this.httpmethod && this.httpurl) {
      this.itemSelectorService.fetchData(this.httpurl, this.httpmethod).subscribe((response) => {
        this.response = response;
      }, (error) => {
      }, () => {
        this.setData(this.response);
      });
    } else if (this.data) {
      this.previousValue = JSON.parse(JSON.stringify(this.data));
      this.setData(this.data);
    }
  }

  ngDoCheck() {
    if (JSON.stringify(this.previousValue) !== JSON.stringify(this.data)) {
      this.previousValue = JSON.parse(JSON.stringify(this.data));
      this.setData(this.data);
    }
  }

  setData(httpResponse: any) {
    let responsedata = httpResponse;
    if (this.datareader != null) {
      const dr = this.datareader.split('.');
      for (const ir of dr) {
        responsedata = responsedata[ir];
      }
      responsedata.forEach((option: any, index: any) => {
        if (!option['isSelected']) {
          option['isSelected'] = false;
        }
      });
    } else {
      responsedata = httpResponse;
    }

    this.availableData = responsedata;
    this.mask = false;
  }

  itemClick(data: any, index: any, left: boolean, right: boolean) {
    this.leftactive = left;
    this.rightactive = right;
    this.switchingObject = data;
    this.objectIndex = index;
    for (const ir of this.availableData) {
      if ((ir)[this.valuefield] === data[this.valuefield]) {
        ir['isSelected'] = true;
      } else {
        ir['isSelected'] = false;
      }

    }

    if (right) {
      for (const ir of this.selectedData) {
        if ((ir)[this.valuefield] === data[this.valuefield]) {
          ir['selectedClick'] = true;
        } else {
          ir['selectedClick'] = false;
        }
      }
    }

  }

  rightSwitch() {
    if (this.switchingObject != null && this.switchingObject.hasOwnProperty('isSelected')) {
      if (this.switchingObject['isSelected']) {
        this.selectedData.push(this.switchingObject);
        this.switchingObject['isSelected'] = true;
        this.availableData.forEach((option, index) => {
          if (option['isSelected']) {
            this.availableData.splice(index, 1);
          }
        });
        this.switchingObject = null;
        this.dataEmitter();
      }
    }

  }

  leftSwitch() {
    if (this.switchingObject && this.availableData) {
      for (const ir of this.availableData) {
        if ((ir)[this.valuefield] === this.switchingObject[this.valuefield]) {
        }
      }
    }
    this.partOfLeftSwitch();
  }

  partOfLeftSwitch() {
    const flag = false;
    if (!flag) {
      if (this.switchingObject != null && this.switchingObject.hasOwnProperty('isSelected')) {
        if (this.switchingObject['isSelected']) {
          this.availableData.push(this.switchingObject);
          this.switchingObject['isSelected'] = false;
          this.selectedData.forEach((option, index) => {
            if (!option['isSelected']) {
              this.selectedData.splice(index, 1);
            }
          });
          this.switchingObject = null;
          this.dataEmitter();
        }
      }
    }
  }

  upSwitch() {
    if (this.switchingObject != null && this.switchingObject.hasOwnProperty('isSelected')) {
      if (this.switchingObject['isSelected']) {
        this.selectedData.forEach((opt: any, i: any) => {
          this.getIndexObject(opt, i);
        });
        if (this.objectIndex !== 0) {
          const index = this.selectedData[this.objectIndex];
          this.selectedData[this.objectIndex] = this.selectedData[this.objectIndex - 1];
          this.selectedData[this.objectIndex - 1] = index;
          this.dataEmitter();
        }

      }
    }
  }

  downSwitch() {
    if (this.switchingObject != null && this.switchingObject.hasOwnProperty('isSelected')) {
      if (this.switchingObject['isSelected']) {
        this.selectedData.forEach((opt: any, i: any) => {
          this.getIndexObject(opt, i);
        });
        if (this.selectedData.length - 1 !== this.objectIndex) {
          const index = this.selectedData[this.objectIndex];
          this.selectedData[this.objectIndex] = this.selectedData[this.objectIndex + 1];
          this.selectedData[this.objectIndex + 1] = index;
          this.dataEmitter();
        }
      }
    }

  }

  moveTop() {
    const tempArray: any = [];
    if (this.switchingObject != null && this.switchingObject['isSelected']) {
      this.selectedData.forEach((opt: any, i: any) => {
       this.getIndexObject(opt, i);
      });
      if (this.selectedData.length > 1) {
        tempArray[0] = this.selectedData[this.objectIndex];
        this.selectedData.splice(this.objectIndex, 1);
        this.selectedData.forEach((option) => {
          tempArray.push(option);
        });
        this.selectedData = tempArray;
        this.dataEmitter();
      }
    }
  }

  moveBottom() {
    if (this.switchingObject != null && this.switchingObject.hasOwnProperty('isSelected')) {
      this.selectedData.forEach((opt: any, i: any) => {
       this.getIndexObject(opt, i);
      });
      if (this.switchingObject['isSelected'] && this.selectedData.length > 1) {
        this.selectedData.splice(this.objectIndex, 1);
        this.selectedData[this.selectedData.length] = this.switchingObject;
      }
    }
    this.dataEmitter();
  }

  dataEmitter() {
    this.availableRecords.emit(this.availableData);
    this.selectedRecords.emit(this.selectedData);
  }

  getIndexObject(opt: any, i: any) {
    if (opt[this.valuefield] === this.switchingObject[this.valuefield]) {
      this.objectIndex = i;
    }
  }
}
