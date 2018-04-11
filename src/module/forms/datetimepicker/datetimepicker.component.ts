
 /*
 Component Name : Amexio Date time picker
 Component Selector :  <amexio-date-time-picker>
 Component Description : This component is flexible for both Date and time picker with all required configurations in Style.

 
*/

import {Component, ElementRef, EventEmitter, forwardRef, HostListener, Input, OnInit, Output} from '@angular/core';
import {NG_VALUE_ACCESSOR} from "@angular/forms";

const noop = () => {
};

export const CUSTOM_DATETIME_Style_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AmexioDateTimePicker), multi: true
};
@Component({
  selector: 'amexio-date-time-picker',
  templateUrl: './datetimepicker.component.html',
  providers: [CUSTOM_DATETIME_Style_CONTROL_VALUE_ACCESSOR]
})

export class AmexioDateTimePicker implements OnInit {


  /*
Properties 
name : date-format
datatype : string
version : 4.0 onwards
default : none 
description : The label of this field
*/
  @Input('date-format') dateformat: string;

    /*
Properties 
name : date-picker
datatype : boolean
version : 4.0 onwards
default : false
description : Enable/Disable Date Picker
*/
  @Input('date-picker') datepicker: boolean;

   /*
Properties 
name : time-picker
datatype : boolean
version : 4.0 onwards
default : false
description : Enable/Disable Time Picker
*/
  @Input('time-picker') timepicker: boolean;

   /*
Properties 
name : field-label
datatype : string
version : 4.0 onwards
default : none
description : 	The label of this field
*/
  @Input('field-label') fieldlabel: string;

  /*
Properties 
name : disabled
datatype : boolean
version : 4.1.5 onwards
default : false
description : Disable Date/Time Picker field
*/
  @Input('disabled') disabled: boolean;
  /*
Properties 
name : read-only
datatype : boolean
version : 4.1.5 onwards
default : false
description : Disable Date/Time Picker field
*/
  @Input('read-only') readonly: boolean;

/* 
Properties 
name : required
datatype : boolean
version : 4.0 onwards
default : false
description : flag to allow blank field or not
*/
  @Input() required: boolean;

  posixUp : boolean;

  positionClass : any;

    /*
Properties 
name : blur
datatype : none
version : none
default : none
description : On blur event
*/
  @Output() blur: EventEmitter<any> = new EventEmitter<any>();

   /*
Properties 
name : change
datatype : none
version : none
default : none
description : On field value change event
*/
  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  
   /*
Properties 
name : input
datatype : none
version : none
default : none
description : On input event field.
*/
  @Output() input: EventEmitter<any> = new EventEmitter<any>();
 
  /*
Properties 
name : focus
datatype : none
version : none
default : none
description : On field focus event
*/
  @Output() focus: EventEmitter<any> = new EventEmitter<any>();

  showToolTip: boolean;

  elementId: string;

  daysTitle: any[];

  daysArray: any;

  selectedDate: any;

  currrentDate: any;

  dateModel: any;

  isComponentValid : boolean;

  hrs: number;
  min: number;


  constructor(public element: ElementRef) {
    this.elementId = new Date().getTime() + "";
    this.selectedDate = new Date();
    this.currrentDate = new Date();
    this.daysTitle = [];
    this.daysArray = [];
    this.timepicker = false;
    this.hrs = this.currrentDate.getHours();
    this.min = this.currrentDate.getMinutes();
    this.initDaysTitle();
    this.createDaysForCurrentMonths(this.currrentDate);
  }


  ngOnInit() {
    this.isComponentValid = ! this.required;
    if (this.dateformat != null) {
      this.dateformat = "dd/MM/yyyy";
    }
  }


  initDaysTitle() {
    this.daysTitle.push({"text": "Mo"});
    this.daysTitle.push({"text": "Tu"});
    this.daysTitle.push({"text": "We"});
    this.daysTitle.push({"text": "Th"});
    this.daysTitle.push({"text": "Fr"});

    this.daysTitle.push({"text": "Sa"});
    this.daysTitle.push({"text": "Su"});
  }

  createDaysForCurrentMonths(selectedPeriod: any) {

    let date = new Date(selectedPeriod.getFullYear(), selectedPeriod.getMonth(), 1, 0, 0, 0, 0); // Starting at the 1st of the month
    let extras = (date.getDay() + 6) % 7; // How many days of the last month do we need to include?
    date.setDate(date.getDate() - extras); // Skip back to the previous monday

    //let startDate =  new Date(selectedPersion.getFullYear(),selectedPersion.getMonth(),1,0,0,0,0);

    let month = selectedPeriod.getMonth();
    let year = selectedPeriod.getFullYear();
    while (1) {
      let rowDays = [];
      for (let i = 0; i < 7; i++) {
        let day: any = {
          'date': null, 'selected': false, 'isCurrentMonth': null
        };

        let isCurrentMonth: any = ((date.getMonth() === selectedPeriod.getMonth()));

        day.date = new Date(date.getTime());
        day.isCurrentMonth = isCurrentMonth;

        if ((date.getMonth() === this.currrentDate.getMonth()) && (date.getDate() === this.currrentDate.getDate())) {
          day.selected = true;
        }
        rowDays.push(day);
        date.setDate(date.getDate() + 1);
      }
      this.daysArray.push(rowDays);

      if (date.getMonth() > month || this.daysArray.length > 6) {
        break;
      }

    }

  }


  onDateClick(dateObj: any) {
    this.selectedDate = dateObj;
    this.selectedDate.setHours(this.hrs);
    this.selectedDate.setMinutes(this.min);
    this.resetSelection(dateObj);
    this.dateModel = this.selectedDate;
    this.value = this.selectedDate;
    this.showToolTip = !this.showToolTip;
  }

  resetSelection(dateObj: any) {
    for (let i = 0; i < this.daysArray.length; i++) {
      for (let j = 0; j < this.daysArray[i].length; j++) {
        let day = this.daysArray[i][j];
        if (day.date.getTime() === dateObj.getTime()) {
          day.selected = true;
        } else {
          day.selected = false;
        }

      }

    }
  }

  onInput(event : any){
    if(event.target.value != null && event.target.value != ''){
      let timeValue = event.target.value.split(':');
      if(timeValue != null){
        let hrs = parseInt(timeValue[0].trim());
        let mins = parseInt(timeValue[1].trim());
        this.selectedDate.setHours(hrs);
        this.selectedDate.setMinutes(mins);
        this.hrs = hrs;
        this.min = mins;
        this.value = this.selectedDate;
        this.change.emit(this.value);
        event.stopPropagation();
        this.isComponentValid = true;
      }
    }
  }

  nextMonth(event: any) {
    this.setDateData("plus", 1, event);
  }

  prevMonth(event: any) {
    this.setDateData("minus", 1, event);
  }

  nextYear(event: any) {
    this.setDateData("plus", 12, event);
  }

  prevYear(event: any) {
    this.setDateData("minus", 12, event);
  }

  setDateData(state: string, mon: number, event: any) {
    let d = new Date(this.currrentDate.getFullYear(), this.currrentDate.getMonth(), this.currrentDate.getDate());

    if (state === "plus") {
      d.setMonth(d.getMonth() + mon);
    } else if (state === "minus") {
      d.setMonth(d.getMonth() - mon);
    }

    this.currrentDate = d;
    this.initDate();
    event.stopPropagation();
  }

  setToday() {
    this.currrentDate = new Date();
    this.initDate();
    this.showToolTip = !this.showToolTip;
  }

  initDate() {
    this.daysArray = [];
    this.createDaysForCurrentMonths(this.currrentDate);
    this.selectedDate = this.currrentDate;
    this.dateModel = this.selectedDate;
    this.value = this.selectedDate;
  }

  plus(type: string, event: any) {
    if (type === "min") {
      if (this.min == 59) {
        this.min = -1;
        this.hrs++;
      }
      this.min++;
    }

    if (type === "hrs") {
      this.hrs++;
    }

    if (this.hrs === 24) {
      this.hrs = 0;
    }
    this.selectedDate.setHours(this.hrs);
    this.selectedDate.setMinutes(this.min);
    this.value = this.selectedDate;
    this.change.emit(this.value);
    event.stopPropagation();

  }


  minus(type: string, event: any) {
    if (type === "min") {
      if (this.min == 0) {
        this.min = 60;
        this.hrs--;
      }
      this.min--;
    }

    if (type === "hrs") {
      this.hrs--;
    }

    if (this.hrs === 0) {
      this.hrs = 23;
    }

    this.selectedDate.setHours(this.hrs);
    this.selectedDate.setMinutes(this.min);
    this.value = this.selectedDate;
    this.change.emit(this.value);
    event.stopPropagation();
  }


  //The internal dataviews model
  private innerValue: any = '';

  //Placeholders for the callbacks which are later provided
  //by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  //get accessor
  get value(): any {
    return this.innerValue;
  };

  //set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  //Set touched on blur
  onBlur() {
    this.onTouchedCallback();
  }

  //From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
      this.dateModel = this.innerValue;
    }
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  onFocus(elem : any) {
    // if (!this.readonly)
      // this.showToolTip = true;
    // this.posixUp = this.getListPosition(elem);
  }

  onFocusOut(value : any){
    if(isNaN(Date.parse(value.value)))
      value.value = '';
    else
      this.value = Date.parse(value.value);
  }

  openPicker(elem : any){
    this.showToolTip = true;
    this.posixUp = this.getListPosition(elem);
  }
  getListPosition(elementRef : any) :boolean{
    let dropdownHeight : number = 350; //must be same in dropdown.scss
    if(window.innerHeight - (elementRef.getBoundingClientRect().bottom) < dropdownHeight){

      if((elementRef.getBoundingClientRect().top - dropdownHeight - elementRef.getBoundingClientRect().height)>0){
        this.positionClass={
          'top' : (elementRef.getBoundingClientRect().top - dropdownHeight - elementRef.getBoundingClientRect().height)+'px'
        };
      }
      else if((dropdownHeight - elementRef.getBoundingClientRect().top)>0){
        this.positionClass={
          'top' : (dropdownHeight - elementRef.getBoundingClientRect().top)+'px'
        };
      }else if((elementRef.getBoundingClientRect().top- dropdownHeight)>0){
        this.positionClass={
          'top' : (elementRef.getBoundingClientRect().top-dropdownHeight)+'px'
        };
      }
      return true;
    }
    else{
      this.positionClass ={};
      return false;
    }
  }

  onSelect() {
    this.showToolTip = false;
  }

  @HostListener('document:click', ['$event.target']) @HostListener('document: touchstart', ['$event.target'])
  public onElementOutClick(targetElement: HTMLElement) {
    let parentFound = false;
    while (targetElement != null && !parentFound) {
      if (targetElement === this.element.nativeElement) {
        parentFound = true;
      }
      targetElement = targetElement.parentElement;
    }
    if (!parentFound) {
      this.showToolTip = false;
    }
  }
}
