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

import {
  AfterContentInit, ChangeDetectorRef, Component, ContentChild, ElementRef,
  EventEmitter, Input, OnInit, Output, Renderer2, ViewChild,
} from '@angular/core';
import { AmexioSearchAdvanceComponent } from '../advancesearch/searchadvance.component';

import { BaseFormValidator } from '../../base/base.validator.component';
import { CommonDataService } from '../../services/data/common.data.service';
@Component({
  selector: 'amexio-searchbox',
  templateUrl: './searchboxtool.component.html',
})
export class SearchboxtoolComponent extends BaseFormValidator<string> implements OnInit, AfterContentInit {
  private componentLoaded: boolean;
  /*
   Properties
   name : data
   datatype : any
   version : 4.2 onwards
   default : none
   description : Local data for dropdown.
   */
  _data: any;
  @Input('data')
  set data(value: any[]) {
    this._data = value;
    if (this.componentLoaded) {
      this.updateComponent();
    }
  }
  get data(): any[] {
    return this._data;
  }
  /*
   Properties
   name : data-reader
   datatype : string
   version : 4.2 onwards
   default : none
   description : Key in JSON datasource for records
   */
  @Input('data-reader') datareader: any;
  /*
   Properties
   name : http-url
   datatype : string
   version : 4.2 onwards
   default : none
   description : REST url for fetching datasource.
   */
  @Input('http-url') httpurl: string;
  /*
   Properties
   name : place-holder
   datatype : string
   version : 4.2 onwards
   default : none
   description : Show place-holder inside dropdown component
   */
  @Input('place-holder') placeholder: string;
  /*
   Properties
   name : display-field
   datatype : string
   version : 4.2 onwards
   default : none
   description : Sets key inside response data to display.
   */
  @Input('display-field') displayfield: string;
  /*
   Properties
   name : http-method
   datatype : string
   version : 4.2 onwards
   default : none
   description : Type of HTTP call, POST,GET.
   */
  @Input('http-method') httpmethod: string;
  /*
   Properties
   name : title
   datatype : string
   version : 4.2 onwards
   default : none
   description : sets title to advance search form
   */
  @Input() title = 'Advance Search';
  /*
   Properties
   name : value-field
   datatype : string
   version : 4.2 onwards
   default : none
   description : Name of key inside response data.use to send to backend
   */
  @Input('value-field') valuefield: string;
  /*
   Properties
   name : width
   datatype : number
   version : 4.2 onwards
   default : none
   description : Sets width to auto recommendation list.
   */
  @Input() width = 500;
  /*
   Properties
   name : enablefilter
   datatype : boolean
   version : 5.11 onwards
   default : none
   description : Enable.
   */
  @Input('enable-global-filter') enablefilter: boolean;
  /*
   Events
   name : keyup
   description : Fires when keyup event occurs
   */
  @Output() keyup: any = new EventEmitter<any>();
  /*
   Events
   name : onSearchItemClick
   description : Fires when search item is selected
   */
  @Output() onSearchItemClick: any = new EventEmitter<any>();
  /*
   Events
   name : onSearchClick
   description : Fires when search button is clicked
   */
  @Output() onSearchClick: any = new EventEmitter<any>();
  @ContentChild(AmexioSearchAdvanceComponent) advanceSearchRef: AmexioSearchAdvanceComponent;
  @ViewChild('dropdownitems', { read: ElementRef }) public dropdownitems: ElementRef;
  @ViewChild('inp', { read: ElementRef }) public inp: ElementRef;
  value: string;
  responseData: any;
  searchformString = '';
  viewData: any;
  textValue: any;
  localData: any;
  caretFlag = false;
  isListFlag = false;
  searchFlag = false;
  searchTextBox = false;
  displayValue: any;
  isComponentValid: boolean;
  selectedValue: any = '';
  advanceSearchFlag = false;
  labelValue: string;
  previousData: any;
  selectedindex = -1;
  scrollposition = 30;
  enableAdvanceSearch = false;
  advanceButtonLabel: string;
  enableAdvnSearch: boolean;
  componentId: string;
  keystrokeflag = false;
  a: any;

  isadvsearchbtnpressed = false;
  constructor(
    public element: ElementRef, private dataService: CommonDataService,
    public renderer: Renderer2, _cd: ChangeDetectorRef,
  ) {
    super(renderer, element, _cd);
  }

  ngAfterContentInit() {
    this.advanceSearchRef.formwidth = this.width;
    this.enableAdvnSearch = this.advanceSearchRef.advanceSearchFlag;
    this.enableAdvanceSearch = true;
    if (this.advanceSearchRef) {
      this.enableAdvanceSearch = true;
      if (this.advanceSearchRef.title) {
        this.advanceButtonLabel = this.advanceSearchRef.title;
      } else if (!this.advanceSearchRef.title || this.advanceSearchRef.title === '') {
        this.advanceButtonLabel = 'Advance Search';
      }
    }
  }

  ngOnInit() {

    this.componentId = this.displayfield + Math.floor(Math.random() * 1000 + 999);
    if (this.httpmethod && this.httpurl) {
      this.dataService.fetchData(this.httpurl, this.httpmethod).subscribe((response) => {
        this.responseData = response;
      }, (error) => {
      }, () => {
        this.setData(this.responseData);
      });
    } else if (this.data) {
      this.previousData = JSON.parse(JSON.stringify(this.data));
      this.setData(this.data);
    }
    this.componentLoaded = true;
  }
  updateComponent() {
    if (JSON.stringify(this.previousData) !== JSON.stringify(this.data)) {
      this.previousData = JSON.parse(JSON.stringify(this.data));
      this.setData(this.data);
    }
  }
  onSelectClick() {
    this.advanceSearchFlag = false;
  }
  onInputClick(event: any) {
    this.searchFlag = true;
    this.onBaseFocusEvent({});
    const keyword: any = event.target.value;
    this.viewData = [];
    this.isListFlag = false;
    if (keyword != null && keyword !== ' ') {
      const search_term = keyword.toLowerCase();
      this.localData.forEach((item: any) => {
        this.tempOnInputClick(item, search_term);
      });
      this.keyup.emit(event);
    }
    // logic for arrow keys and enter key press
    // 40=down-arrow and 38=up-arrow and 13=enter
    if (event.keyCode === 40 || event.keyCode === 38 || event.keyCode === 13) {
      // if key pressed is up down or enter then process accordingly
      // call function for process
      this.navigateKeys(event);
    }
    if (!this.selectedValue || this.selectedValue === '') {
      this.viewData = [];
      this.isListFlag = false;
    }
  }
  tempOnInputClick(item: any, search_term: any) {
    let filterCounter = true;
    for (const [key, value] of Object.entries(item)) {
      let val: any;
      val = value;
      this.a = key;
      // For New Input enable-filter
      if (filterCounter && item && (this.enablefilter) && (val.startsWith(search_term))
       && item !== null && item[this.displayfield]) {
        this.isListFlag = true;
        filterCounter = false;
        this.viewData.push(item);
      } else {
        if (filterCounter && (!this.enablefilter) && item !== null && val.startsWith(search_term)
        && item[this.displayfield].toLowerCase().startsWith(search_term)) {
          this.isListFlag = true;
          filterCounter = false;
          this.viewData.push(item);
        }
      }
    }
  }
  onFocus() {
    if (this.selectedValue.length > 0) {
      const keyword = this.selectedValue;
      this.viewData = [];
      this.isListFlag = false;
      if (keyword != null && keyword !== ' ') {
        const search_term = keyword.toLowerCase();
        this.localData.forEach((item1: any) => {
          this.tempOnInputClick(item1, search_term);
        });
        this.searchFlag = true;
        this.onBaseFocusEvent({});
        this.keyup.emit(event);
      }
      this.selectedValueOnFocus();
    }
  }

  // If Selected Value is blank, then view data will be reset
  selectedValueOnFocus() {
    if (!this.selectedValue || this.selectedValue === '') {
      this.viewData = [];
      this.isListFlag = false;
    }
  }

  navigateKeys(event: any) {
    if (this.selectedindex > this.viewData.length) {
      this.selectedindex = 0;
    }
    if (event.keyCode === 40 ||
      event.keyCode === 38
      && this.selectedindex < this.viewData.length) {
      this.navigateKeysCondition(event);
    }

    if (event.keyCode === 13 && this.viewData[this.selectedindex]) {
      this.onItemSelect(this.viewData[this.selectedindex]);
    }
  }

  // Method will be called when keycode will be 40 or 38
  navigateKeysCondition(event: any) {
    let prevselectedindex = -1;
    if (this.selectedindex === -1) {
      this.selectedindex = 0;
    } else {
      prevselectedindex = this.selectedindex;
      if (event.keyCode === 40) {
        // mtd 1 start
        if (this.selectedindex >= this.viewData.length - 1) {
          this.selectedindex = 0;
        } else {
          this.selectedindex++;
        }
        // mtd 1 ends
        if ((this.selectedindex > 5)) {
          this.dropdownitems.nativeElement.scroll(0, this.scrollposition);
          this.scrollposition = this.scrollposition + 30;
        }
      } else if (event.keyCode === 38) {
        this.eventKeyCodeCondition();
      }
    }
    if (this.viewData[this.selectedindex]) {
      this.viewData[this.selectedindex].selected = true;
      this.setAriaActiveDescendant(this.selectedindex);

    }
    if (this.viewData[prevselectedindex]) {
      this.viewData[prevselectedindex].selected = false;
    }
  }

  // If keycode is 38
  eventKeyCodeCondition() {
    this.selectedindex--;
    if (this.selectedindex === -1) {
      this.selectedindex = this.viewData.length - 1;
      this.setAriaActiveDescendant(this.selectedindex);
    }
    if (this.scrollposition >= 0 && this.selectedindex > 1) {
      this.dropdownitems.nativeElement.scroll(1, this.scrollposition);
      this.scrollposition = this.scrollposition - 30;
    }
    if (this.selectedindex === 1) {
      this.scrollposition = 30;
    }
  }

  onSearchButtonClick(event: any) {
    this.onSearchClick.emit(event);
  }
  selectCssClass(): string {
    if (this.viewData.length > 5) {
      return 'dropdown-list scroll';
    } else {
      return 'dropdown-list';
    }
  }
  onItemSelect(item: any) {
    this.value = item[this.valuefield];
    this.selectedValue = item[this.displayfield];
    this.searchFlag = this.onBaseBlurEvent({});
    this.onSearchItemClick.emit(item);
  }
  advanceSearch() {
    this.isadvsearchbtnpressed = !this.isadvsearchbtnpressed;
    this.searchformString = 'advance search form opened';
    this.advanceSearchRef.advanceSearchFlag = true;
    this.advanceSearchFlag = true;
    this.searchFlag = this.onBaseBlurEvent({});
  }

  closeSearchForm() {
    this.advanceSearchFlag = false;
  }
  getResponseData(httpResponse: any) {
    let responsedata = httpResponse;
    if (this.datareader != null) {
      const dr = this.datareader.split('.');
      if (dr != null) {
        for (const ir of dr) {
          responsedata = responsedata[dr[ir]];
        }
      }
    } else {
      responsedata = httpResponse;
    }
    return responsedata;
  }
  setData(httpResponse: any) {
    let responsedata = httpResponse;
    // Check if key is added?
    if (this.datareader != null) {
      const dr = this.datareader.split('.');
      for (const ir of dr) {
        responsedata = responsedata[dr[ir]];
      }
    } else {
      responsedata = httpResponse;
    }
    this.viewData = responsedata;
    this.generateIndex();
    this.localData = JSON.parse(JSON.stringify(this.viewData));
  }

  closeOnEscape() {
    this.viewData = [];
  }

  closeFormOnEscape() {
    this.advanceSearchRef.closeSearchForm();
    this.viewData = [];
    this.advanceSearchFlag = false;
    this.selectedindex = -1;
  }

  generateIndex() {
    this.viewData.forEach((element: any, index: number) => {
      element['index'] = this.componentId + 'listitem' + index;
    });
  }

  setAriaActiveDescendant(rowindex: any) {
    if (this.viewData.length > 0) {
      const inputid = document.getElementById(this.componentId);
      inputid.setAttribute('aria-activedescendant', this.viewData[rowindex].index);
    } else if (this.displayValue.length < 1) {
      const inputid = document.getElementById(this.componentId);
      inputid.setAttribute('aria-activedescendant', 'listitem');
    }
  }

  // will be fired on end key press
  focustolast() {
    if (this.viewData.length > 0) {
      this.viewData[this.selectedindex].selected = false;
      this.selectedindex = this.viewData.length - 1;
      this.viewData[this.selectedindex].selected = true;
      this.setAriaActiveDescendant(this.selectedindex);
    }
  }

  // will be fired on home key press
  focustofirst() {
    if (this.viewData.length > 0) {
      this.viewData[this.selectedindex].selected = false;
      this.selectedindex = 0;
      this.viewData[this.selectedindex].selected = true;
      this.setAriaActiveDescendant(this.selectedindex);
    }
  }

}
