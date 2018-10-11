/**
 * Created by dattaram on 10/10/18.
 */


import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {CommonDataService} from "../../services/data/common.data.service";

const noop = () => {
};

@Component({
  selector: 'amexio-radio-group',
  templateUrl: './radiogroup.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AmexioRadioGroupComponent), multi: true,
  }],
})

export class AmexioRadioGroupComponent implements OnInit {

  /*
   Properties
   name : allow-blank
   datatype : string
   version : 4.0 onwards
   default :
   description : Sets if field is required
   */
  @Input('allow-blank') allowblank = true;
  /*
   Properties
   name :name
   datatype : string
   version : 4.0 onwards
   default : false
   description :
   */
  @Input() name: string;

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
   name : data-reader
   datatype : string
   version : 4.0 onwards
   default :
   description : 	Key in JSON datasource for records
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
   description : 	REST url for fetching datasource.
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
  /*
   Properties
   name : default-value
   datatype : string
   version : 4.0 onwards
   default :
   description : Default Value to be checked
   */
  @Input('default-value') defaultSelectedValue = '';
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
   name : data
   datatype : any
   version : 4.0 onwards
   default :
   description : 	Local data for radio group.
   */
  @Input() data: any[] = [];
  /*
   Properties
   name : disabled
   datatype : boolean
   version : 4.0 onwards
   default : false
   description : true to disable the field.
   */
  @Input() disabled: boolean;
  /*
   Events
   name : onBonSelectionlur
   datatype : any
   version : 4.0 onwards
   default :
   description : Fires selection event
   */
  @Output() onSelection: any = new EventEmitter<any>();
  /*
   Events
   name : input
   datatype : any
   version : none
   default :
   description : 	On input event field.
   */
  @Output() input: any = new EventEmitter<any>();

  isValid: boolean;

  // Placeholders for the callbacks which are later provided
  // by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  @Output() isComponentValid: any = new EventEmitter<any>();

  constructor(public amxHttp: CommonDataService) {
  }

  ngOnInit() {

    this.isValid = this.allowblank;
    this.isComponentValid.emit(this.allowblank);

    if (this.httpmethod && this.httpurl) {
      let responseData: any;
      this.amxHttp.fetchData(this.httpurl, this.httpmethod).subscribe((response) => {
        responseData = response;
      }, (error) => {
      }, () => {
        this.data = this.getResponseData(responseData);
      });
    } else if (this.data != null) {
      this.data = this.getResponseData(this.data);
    }
  }

  checkDefaultValidation(viewData: any) {

    viewData.forEach((opt: any) => {
      if (opt[this.valuefield] === this.defaultSelectedValue || (opt.hasOwnProperty('selected') && opt.selected)) {
        this.isValid = true;
        this.isComponentValid.emit(true);
        return;
      }
    });
  }

  checkSelectedFlag(viewData: any) {
    viewData.forEach((opt: any) => {
      if (this.defaultSelectedValue == '' && (opt.hasOwnProperty('selected') && opt.selected)) {
        this.value = opt[this.valuefield];
        return;
      }
    });
  }

  getResponseData(httpResponse: any) {
    let responsedata = httpResponse;
    if (this.datareader != null) {
      const dr = this.datareader.split('.');
      if (dr != null) {
        for (const ir of dr) {
          responsedata = responsedata[ir];
        }
      }
    } else {
      responsedata = httpResponse;
    }
    this.checkSelectedFlag(responsedata);

    if (!this.allowblank) {
      this.checkDefaultValidation(responsedata);
    }

    return responsedata;
  }

  // From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.defaultSelectedValue) {
      this.defaultSelectedValue = value;
    }
  }

  // From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  // From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  // get accessor
  get value(): any {
    return this.defaultSelectedValue;
  }

  // set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.defaultSelectedValue) {
      this.defaultSelectedValue = v;
      this.onChangeCallback(v);
    }
  }

  onClick(row: any) {
    this.isValid = true;
    //this.defaultSelectedValue = row[this.valuefield];
    this.isComponentValid.emit(true);
    this.onSelection.emit(row);
  }

}
