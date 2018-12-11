/**
 * Created by pratik on 20/12/17.
 */

/*
Component Name : Amexio Tag Input
Component Selector :  <amexio-tag-input>
Component Description : Tags based multi input with typeahead facility.
*/
import {
  ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2, ViewChild,
} from '@angular/core';

import { CommonDataService } from '../../services/data/common.data.service';

import { BaseFormValidator } from '../../base/base.validator.component';

@Component({
  selector: 'amexio-tag-input', templateUrl: './tags.input.component.html',
})

export class AmexioTagsInputComponent extends BaseFormValidator<any> implements OnInit {
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
  @Input() data: any;
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

  selectedindex = 0;

  scrollposition = 30;

  showToolTip: boolean;

  responseData: any;

  previousData: any;

  viewData: any;

  filteredResult: any;

  @ViewChild('inp') inpHandle: any;

  /*
Properties
name : error-msg
datatype : string
version : 4.0 onwards
default :
description : Sets the error message for validation
*/
  @Input('error-msg') errormsg: string;

  @ViewChild('tagDropRef') tagDropRef: any;

  @ViewChild('dropdownitems', { read: ElementRef }) public dropdownitems: ElementRef;

  isValid: boolean;

  @Output() isComponentValid: any = new EventEmitter<any>();

  maskloader = true;

  constructor(
    public dataService: CommonDataService, public element: ElementRef,
    public renderer: Renderer2, _cd: ChangeDetectorRef,
  ) {
    super(renderer, element, _cd);
  }

  ngOnInit() {
    this.isComponentValid.emit(this.allowblank);

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

  }

  navigateKey(event: any) {

  }

  onKeyUp(event: any) {
    this.filteredResult = [];
    this.showToolTip = false;
    const keyword: any = event.target.value;
    if (keyword !== null && keyword !== ' ' && keyword.length >= this.triggerchar) {
      const search_term = keyword.toLowerCase();
      this.viewData.forEach((item: any) => {
        if (item != null && item[this.key].toLowerCase().startsWith(search_term)) {
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
      this.onItemSelect(this.filteredResult[this.selectedindex]);
    }

  }

  // Method when up arrow or down arrow is pressed

  keyUpDownMethod(event: any) {
    if (!this.showToolTip) {
      this.showToolTip = true;
    }
    let prevselectedindex = 0;
    if (this.selectedindex === 0) {
      this.selectedindex = 1;
    } else {
      prevselectedindex = this.selectedindex;
      if (event.keyCode === 40) {
        this.selectedindex++;
        if ((this.selectedindex > 5)) {
          this.dropdownitems.nativeElement.scroll(0, this.scrollposition);
          this.scrollposition = this.scrollposition + 30;
        }
      } else if (event.keyCode === 38) {
        this.keyUpMethod();
      }
    }

    if (this.filteredResult[this.selectedindex]) {
      this.filteredResult[this.selectedindex].selected = true;
    }
    if (this.filteredResult[prevselectedindex]) {
      this.filteredResult[prevselectedindex].selected = false;
    }
  }

  // Method when keyCode is 38 i.e Up
  keyUpMethod() {
    this.selectedindex--;
    if (this.scrollposition >= 0 && this.selectedindex > 1) {
      this.dropdownitems.nativeElement.scroll(0, this.scrollposition);
      this.scrollposition = this.scrollposition - 30;
    }
    if (this.selectedindex === 1) {
      this.scrollposition = 30;
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

  onItemSelect(row: any) {
    this.value = row[this.valuefield];
    this.displayValue = row[this.displayfield];
    this.showToolTip = false;
  }

  onInput(input: any) {
    this.input.emit();
  }

  // get accessor
  get value(): any {
    return this.innerValue;
  }

  // set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  onFocus(elem: any) {
    this.inpHandle.nativeElement.placeholder = '';
    this.showToolTip = true;
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
    this.maskloader = false;
  }

  setValue(value: any, ref: any) {
    this.inpHandle.nativeElement.value = '';
    this.onSelections.push(value);
    this.onChange.emit(this.onSelections);
    if (this.onSelections.length > 0) {
      this.isValid = true;
      this.isComponentValid.emit(true);
    }
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
      this.isComponentValid.emit(false);
    }
    this.onChange.emit(this.onSelections);
  }
  // THIS MEHTOD CHECK INPUT IS VALID OR NOT
  checkValidity(): boolean {
    return this.isValid;
  }

}
