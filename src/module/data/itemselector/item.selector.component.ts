/**
 * Created by pratik on 27/12/17.
 */
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonDataService} from "../../services/data/common.data.service";

@Component({
  selector: 'amexio-item-selector', templateUrl: './item.selector.component.html'
})

export class AmexioItemSelectorComponent implements OnInit {

  @Input() data: any;

  @Input() height: any;

  mask : boolean = true;

  @Input('data-reader') datareader: string;

  @Input('http-method') httpmethod: string;

  @Input('http-url') httpurl: string;

  @Input('display-field') displayfield: string;

  @Input('value-field') valuefield: string;

  @Output() availableRecords: any = new EventEmitter<any>();

  @Output() selectedRecords: any = new EventEmitter<any>();

  availableData: any[];

  selectedData: any[] = [];

  switchingObject: any;

  objectIndex: any;

  leftactive: boolean = true;

  rightactive: boolean = true;


  response: any;

  previousValue: any;

  check: any;


  constructor(public itemSelectorService: CommonDataService) {
  }

  ngOnInit() {
    if (this.httpmethod && this.httpurl) {
      this.itemSelectorService.fetchData(this.httpurl, this.httpmethod).subscribe(response => {
        this.response = response;
      }, error => {
      }, () => {
        this.setData(this.response);
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
    let responsedata = httpResponse;
    if (this.datareader != null) {
      const dr = this.datareader.split('.');
      for (let ir = 0; ir < dr.length; ir++) {
        responsedata = responsedata[dr[ir]];
      }
      responsedata.forEach((option: any, index: any) => {
         if(!option['isSelected'])
          {
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
    for (let ir = 0; ir < this.availableData.length; ir++) {
      if ((this.availableData[ir])[this.valuefield] === data[this.valuefield]) {
        this.availableData[ir]['isSelected'] = true;
      } else {
        this.availableData[ir]['isSelected'] = false;
      }

    }

    if (right) {
      for (let ir = 0; ir < this.selectedData.length; ir++) {
        if ((this.selectedData[ir])[this.valuefield] === data[this.valuefield]) {
          this.selectedData[ir]['selectedClick'] = true;
        } else {
          this.selectedData[ir]['selectedClick'] = false;
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
    let flag: boolean;

    if (this.switchingObject && this.availableData) {
      for (let ir = 0; ir < this.availableData.length; ir++) {
        if ((this.availableData[ir])[this.valuefield] === this.switchingObject[this.valuefield]) {
          flag = true;
        }
      }
    }
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
          if (opt[this.valuefield] === this.switchingObject[this.valuefield]) {
            this.objectIndex = i;
          }
        });
        if (this.objectIndex != 0) {
          const index = this.selectedData[this.objectIndex];
          this.selectedData[this.objectIndex] = this.selectedData[this.objectIndex - 1];
          this.selectedData[this.objectIndex - 1] = index;
          // this.switchingObject = null;
          this.dataEmitter();
        }

      }
    }
  }

  downSwitch() {
    if (this.switchingObject != null && this.switchingObject.hasOwnProperty('isSelected')) {
      if (this.switchingObject['isSelected']) {
        this.selectedData.forEach((opt: any, i: any) => {
          if (opt[this.valuefield] === this.switchingObject[this.valuefield]) {
            this.objectIndex = i;
          }
        });
        if (this.selectedData.length - 1 !== this.objectIndex) {
          const index = this.selectedData[this.objectIndex];
          this.selectedData[this.objectIndex] = this.selectedData[this.objectIndex + 1];
          this.selectedData[this.objectIndex + 1] = index;
          // this.switchingObject = null;
          this.dataEmitter();
        }
      }
    }

  }

  moveTop() {
    const tempArray: any = [];
    if (this.switchingObject != null && this.switchingObject['isSelected']) {
      this.selectedData.forEach((opt: any, i: any) => {
        if (opt[this.valuefield] === this.switchingObject[this.valuefield]) {
          this.objectIndex = i;
        }
      });
      if (this.selectedData.length > 1) {
        tempArray[0] = this.selectedData[this.objectIndex];
        this.selectedData.splice(this.objectIndex, 1);
        this.selectedData.forEach((option) => {
          tempArray.push(option);
        });
        this.selectedData = tempArray;
        // this.switchingObject = null;
        this.dataEmitter();
      }
    }
  }

  moveBottom() {
    if (this.switchingObject != null && this.switchingObject.hasOwnProperty('isSelected')) {
      this.selectedData.forEach((opt: any, i: any) => {
        if (opt[this.valuefield] === this.switchingObject[this.valuefield]) {
          this.objectIndex = i;
        }
      });
      if (this.switchingObject['isSelected'] && this.selectedData.length > 1) {
        this.selectedData.splice(this.objectIndex, 1);
        this.selectedData[this.selectedData.length] = this.switchingObject;
      }
    }
    // this.switchingObject = null;
    this.dataEmitter();
  }

  dataEmitter() {
    this.availableRecords.emit(this.availableData);
    this.selectedRecords.emit(this.selectedData);
  }

}
