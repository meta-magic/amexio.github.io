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
* Created by pratik on 20/12/17.
*/

import { animate, state, style, transition, trigger } from '@angular/animations';
import {
  ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2, ViewChild,
} from '@angular/core';
import { EventBaseComponent } from '../../base/event.base.component';
import { CommonDataService } from '../../services/data/common.data.service';
import { DisplayFieldService } from '../../services/data/display.field.service';

@Component({
  selector: 'amexio-tag-input',
  templateUrl: './tags.input.component.html',
  animations: [
    trigger('changeState', [
      state('visible', style({
        'max-height': '200px',
      })),
      state('hidden', style({
        'max-height': '0px',
      })),
      transition('*=>*', animate('200ms')),
    ]),
  ],
})

export class AmexioTagsInputComponent extends EventBaseComponent<string> implements OnInit {
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
Properties
name : allow-blank
datatype : string
version : 4.0 onwards
default :
description : Sets if field is required
*/
  @Input('allow-blank') allowblank: boolean;
  /*
Properties
name : data
datatype : string
version : 4.0 onwards
default :
description : Input data source
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
  }  /*
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

  @Input('place-holder') placeholder: string;

  @Input() disabled: boolean;

  @Input('icon-feedback') iconfeedback: boolean;
  /*
Properties
name : font-style
datatype : string
version : 4.0 onwards
default :
description : Set font-style to field
*/
  @Input('font-style') fontstyle: string;
  /*
Properties
name : font-family
datatype : string
version : 4.0 onwards
default :
description : Set font-family to field
*/
  @Input('font-family') fontfamily: string;
  /*
Properties
name : font-size
datatype : string
version : 4.0 onwards
default :
description : Set font-size to field
*/
  @Input('font-size') fontsize: string;
  /*
Properties
name : enable-popover
datatype : string
version : 4.0 onwards
default :
description : Set enable / disable popover.
*/
  @Input('enable-popover') enablepopover: boolean;
  /*
Properties
name : key
datatype : string
version : 4.0 onwards
default :
description : Key as input to tags
*/
  @Input() key: any;
  /*
  Properties
  name : trigger-char
  datatype : number
  version : 4.0 onwards
  default :
  description : Sets the trigger char length
  */
  @Input('trigger-char') triggerchar: number;

  /*
 Properties
 name : has-label
 datatype : boolean
 version : 4.0 onwards
 default : false
 description : flag to set label
 */
  @Input('has-label') haslabel = true;
  /*
 Events
 name : input
 datatype : any
 version : none
 default :
 description :	On input event field.
 */
  @Output() input: any = new EventEmitter<any>();
  /*
Events
name : onChange
datatype : any
version : none
default :
description : on change event
*/
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();
  /*
Events
name : focus
datatype : any
version : none
default :
description : On field focus event
*/
  @Output() focus: any = new EventEmitter<any>();

  onSelections: any[] = [];

  displayValue: any;

  activeindex = 0;

  currentActive: any;

  posixUp: boolean;

  selectedindex = -1;

  scrollposition = 30;

  showToolTip: boolean;

  responseData: any;

  previousData: any;

  viewData: any;

  filteredResult: any;

  componentId: string;

  @ViewChild('inp') inpHandle: any;

  @ViewChild('tagDropRef') tagDropRef: any;

  @ViewChild('dropdownitems', { read: ElementRef }) public dropdownitems: ElementRef;

  isValid: boolean;

  maskloader = true;

  constructor(
    private displayFieldService: DisplayFieldService,
    public dataService: CommonDataService, public element: ElementRef,
    public renderer: Renderer2, _cd: ChangeDetectorRef,
  ) {
    super(renderer, element, _cd);
  }

  ngOnInit() {
    this.componentId = this.createCompId('taginput', this.displayfield);
    if (this.placeholder === '' || this.placeholder === null) {
      this.placeholder = 'Choose Option';
    }
    if (!this.triggerchar) {
      this.triggerchar = 1;
    }
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

  navigateKey(event: any) {
  }
  focusToLastElement(event: any) {
    this.filteredResult[this.selectedindex].selected = false;
    this.selectedindex = this.filteredResult.length - 1;
    this.filteredResult[this.filteredResult.length - 1].selected = true;
    this.setAriaActiveDescendant(this.selectedindex);
    this.setScrollToList(this.selectedindex);
  }
  focusToFirstElement(event: any) {
    this.filteredResult[this.selectedindex].selected = false;
    this.selectedindex = 0;
    this.filteredResult[0].selected = true;
    this.setAriaActiveDescendant(this.selectedindex);
    this.setScrollToList(this.selectedindex);
  }
  closeOnEScapeList(event: any) {
    this.showToolTip = false;
    this.hide();
  }

  onKeyUp(event: any) {
    this.filteredResult = [];
    this.showToolTip = false;
    const keyword: any = event.target.value;
    if (keyword !== null && keyword !== ' ' && keyword.length >= this.triggerchar) {
      const search_term = keyword.toLowerCase();
      this.viewData.forEach((item: any) => {
        if (item != null && this.displayFieldService.findValue(this.key, item).toLowerCase().startsWith(search_term)) {
          this.filteredResult.push(item);
        }
      });
      if (this.filteredResult.length > 0) {
        this.showToolTip = true;
        this.onBaseFocusEvent({});
      } else {
        this.showToolTip = this.onBaseBlurEvent({});
      }
    }
    if (event.keyCode === 40 || event.keyCode === 38 || event.keyCode === 13) {
      this.navigateUsingKey(event);
    }
  }
  navigateUsingKey(event: any) {
    if (this.selectedindex > this.filteredResult.length) {
      this.selectedindex = 0;
    }
    if (event.keyCode === 40 || event.keyCode === 38 && this.selectedindex < this.filteredResult.length) {
      this.keyUpDownMethod(event);
    }
    if (event.keyCode === 13 && this.filteredResult[this.selectedindex]) {
      this.onItemSelect(this.filteredResult[this.selectedindex], this.selectedindex);
    }
    this.setScrollToList(this.selectedindex);
  }
  // Method when up arrow or down arrow is pressed

  keyUpDownMethod(event: any) {
    if (!this.showToolTip) {
      this.showToolTip = true;
    }
    let prevselectedindex = -1;
    prevselectedindex = this.selectedindex;
    if (event.keyCode === 40) {
      this.selectedindex++;
    } else if (event.keyCode === 38) {
      this.selectedindex--;
    }
    if (this.filteredResult[this.selectedindex]) {
      this.filteredResult[this.selectedindex].selected = true;
      this.setAriaActiveDescendant(this.selectedindex);
    }
    if (this.filteredResult[prevselectedindex]) {
      this.filteredResult[prevselectedindex].selected = false;
      this.toNavigateFirstAndLastOption();
    }

  }
  toNavigateFirstAndLastOption() {
    if (this.selectedindex === -1) {
      this.selectedindex = this.filteredResult.length - 1;
      this.filteredResult[this.filteredResult.length - 1].selected = true;
    } else if (this.selectedindex === this.filteredResult.length) {
      this.selectedindex = 0;
      this.filteredResult[this.selectedindex].selected = true;
    }
    this.setAriaActiveDescendant(this.selectedindex);
  }
  setAriaActiveDescendant(rowindex: any) {
    if (this.filteredResult.length > 0) {
      const inputid = document.getElementById(this.componentId);
      inputid.setAttribute('aria-activedescendant', this.filteredResult[rowindex].index);
    } else if (this.displayValue.length < 1) {
      const inputid = document.getElementById(this.componentId);
      inputid.setAttribute('aria-activedescendant', 'listitem');
    }
  }
  setScrollToList(rowindex: any) {
    const listitems = this.element.nativeElement.getElementsByClassName('list-items')[rowindex];
    if (listitems) {
      listitems.scrollIntoView({ behavior: 'smooth' });
    }
  }
  showAllData(activerow: number) {
    let i = 0;
    this.viewData.forEach((item: any) => {
      if (item != null) {
        if (i === activerow) {
          item.active = true;
          this.currentActive = item;
        } else {
          item.active = false;
        }
        item.activerow = activerow;
        this.filteredResult.push(item);
      }
      i++;
    });

    if (this.filteredResult.length > 0) {
      this.showToolTip = true;
    }
  }

  onItemSelect(row: any, index: any) {
    this.value = row[this.valuefield];
    this.displayFieldService.findValue(this.displayfield, row);
    this.setValue(row, {}, index);
    this.showToolTip = false;
  }
  onInput(input: any) {
    if (this.selectedindex > -1) {
      this.filteredResult[this.selectedindex].selected = false;
    }
    this.selectedindex = -1;
    this.input.emit();
  }

  onFocus(elem: any) {
    this.inpHandle.nativeElement.placeholder = '';
    this.onBaseFocusEvent({});
    this.posixUp = this.getListPosition(elem);
    this.focus.emit(this.value);

  }

  getListPosition(elementRef: any): boolean {

    const dropdownHeight = 325;
    // must be same in dropdown.scss
    if (elementRef) {
      if (window.screen.height - (elementRef.getBoundingClientRect().bottom) < dropdownHeight) {
        return true;
      } else {
        return false;
      }
    }
  }

  setData(httpResponse: any) {
    let responsedata = httpResponse;
    if (this.datareader != null) {
      const dr = this.datareader.split('.');
      for (const ir of dr) {
        responsedata = responsedata[ir];
      }
    } else {
      responsedata = httpResponse;
    }

    this.viewData = responsedata;
    this.generateIndex(this.viewData);
    this.maskloader = false;
  }
  generateIndex(data: any) {
    data.forEach((element: any, index: number) => {
      element['index'] = this.componentId + 'listitem' + index;
    });
  }
  setValue(value: any, ref: any, index: any) {
    this.inpHandle.nativeElement.value = '';
    this.onSelections.push(value);
    this.onChange.emit(this.onSelections);
    if (this.onSelections.length > 0) {
      this.isValid = true;
    }
    this.hide();
    if (index) {
      this.filteredResult[index].selected = false;
    }
    this.selectedindex = -1;
    this.showToolTip = false;
  }

  removePill(item: any) {
    let indexToRemove: number = null;
    this.onSelections.forEach((selectedVal, index) => {
      if (selectedVal === item) {
        indexToRemove = index;
      }
    });
    this.onSelections.splice(indexToRemove, 1);
    if (this.onSelections.length === 0) {
      this.isValid = false;
    }
    this.onChange.emit(this.onSelections);
  }
  // THIS MEHTOD CHECK INPUT IS VALID OR NOT
  checkValidity(): boolean {
    return this.isValid;
  }

}
