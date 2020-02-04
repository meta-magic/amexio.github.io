import {
  ChangeDetectorRef, Component,
  ElementRef, EventEmitter, Input,
  OnInit, Output, Renderer2,
} from '@angular/core';
import { ControlValueAccessor, Validators } from '@angular/forms';

import { DisplayFieldService } from '../../../services/data/display.field.service';

import { CommonDataService } from '../../../services/data/common.data.service';

import { EventBaseComponent } from '../event.base.component';

@Component({
  selector: 'multi-child-dropdown',
  templateUrl: 'multi-child-dropdown.component.html',
})

export class MultiChildDropdownComponent extends EventBaseComponent<any> implements OnInit, ControlValueAccessor, Validators {

  filteredOptions: any;

  @Input('field-label') fieldlabel: string;
  @Input('child-array-key') childArrayKey = 'childrens';

  _data: any;
  componentLoaded: boolean;
  childindex = 0;
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

  @Input('value-field') valuefield: string;

  @Input('display-label') displayfield: any;

  displayValue = '';

  @Output() onRecordSelect: any = new EventEmitter<any>();
  @Output() onChildRecordSelect: any = new EventEmitter<any>();

  showToolTip: boolean;

  posixUp: boolean;
  status = false;
  isValid: boolean;
  selectedindex = -1;
  responseData: any;
  previousData: any;
  viewData: any;
  componentId: string;
  multiselectValues: any[] = [];
  maskloader = true;
  activedescendant = 'aria-activedescendant';
  key = 'index';
  // The internal dataviews model

  @Output() isComponentValid: any = new EventEmitter<any>();

  @Output() sendDataToParent: any = new EventEmitter<any>();

  @Input('name') name: string;
  constructor(
    public dataService: CommonDataService, private displayFieldService: DisplayFieldService, public element: ElementRef,
    public renderer: Renderer2, _cd: ChangeDetectorRef,
  ) {
    super(renderer, element, _cd);

  }
  ngOnInit() {
    if (this.data) {
      this.previousData = JSON.parse(JSON.stringify(this.data));
      this.setData(this.data);
    }
    this.componentLoaded = true;
  }
  setData(responsedata: any) {
    if (responsedata && responsedata.length > 0) {
      setTimeout(() => {
        this.viewData = responsedata;
        this.sendDataToParent.emit(responsedata);
        this.filteredOptions = this.viewData;
        this.generateIndex(this.filteredOptions);
      }, 50);
    }
  }

  generateIndex(data: any) {
    data.forEach((element: any, index: number) => {
      element['index'] = this.componentId + 'listitem' + index;
    });
  }

  writeChangedValue(value: any) {
    if ((value !== this.innerValue) && this.viewData && this.viewData.length > 0) {
      this.viewData.forEach((item: any) => {
        if (item[this.valuefield] === value) {
          this.isValid = true;
          this.displayValue = this.displayFieldService.findValue(this.displayfield, item);
          this.status = true;
          return;
        } else if (item.hasOwnProperty('childrens') && item.childrens.length > 0) {
          item.childrens.forEach((data: any) => {
            if (data[this.valuefield] === value) {
              this.isValid = true;
              this.displayValue = this.displayFieldService.findValue(this.displayfield, data);
              this.status = true;
              return;
            }
          });
        }
      });
    }
    this.fromWriteChangedValue(value);
  }

  fromWriteChangedValue(value: any) {
    if (!this.status) {
      this.displayValue = '';
    }
    this.value = value;
  }
  onItemSelect(selectedItem: any) {

    event.preventDefault();
    event.stopPropagation();
    return this.onChildRecordSelect.emit(selectedItem);
  }
}
