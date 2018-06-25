
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

export class AmexioDateTimePicker implements OnInit  {


  /*
Properties
name : date-format
datatype : string
version : 4.0 onwards
default : 
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
default : 
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
version : 4.0 onwards
default : false
description : Disable Date/Time Picker field
*/
  @Input('read-only') readonly: boolean;
  /*
Properties
name : min-date
datatype : string
version : 4.2 onwards
default : none
description : sets minimum date range
*/
  @Input('min-date') minDate: string;
/*
Properties
name : max-date
datatype : string
version : 4.2 onwards
default : none
description : sets maximum date range
*/
  @Input('max-date') maxDate: string;
 /*
Properties
name : diabled-date
datatype :  any
version : 4.2 onwards
default : none
description : sets disabled dates range
*/ 
  @Input('diabled-date') diabledDate: any[]=[];
  /*
Properties
name : inline-datepicker
datatype :  boolean
version : 4.2 onwards
default : none
description : sets inline calender
*/  
  @Input('inline-datepicker') inlineDatepicker: boolean = false;
/*
Properties
name : dropdown-datepicker
datatype :  boolean
version : 4.2 onwards
default : none
description : sets dropdown datepicker
*/  
@Input('dropdown-datepicker') dropdownDatepicker: boolean = true;  
  
  /*
  Properties
  name : required
  datatype : boolean
  version : 4.0 onwards
  default : false
  description : Flag to allow blank field or not
  */
  @Input() required: boolean = false;

  posixUp: boolean;

  positionClass: any;

  /*
Events
name : blur
description : On blur event
*/
  @Output() blur: EventEmitter<any> = new EventEmitter<any>();

  /*
Properties
name : change
description : On field value change event
*/
  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  /*
Properties
name : input
description : On input event field.
*/
  @Output() input: EventEmitter<any> = new EventEmitter<any>();

  /*
Properties
name : focus
description : On field focus event
*/
  @Output() focus: EventEmitter<any> = new EventEmitter<any>();

  //diabledDate: any[];

  showToolTip: boolean;

  elementId: string;

  daysTitle: any[];

  daysArray: any;

  selectedDate: any;

  currrentDate: any;

  dateModel: any;

  isComponentValid: boolean;

  hrs: number;
  min: number;


  constructor(public element: ElementRef) {
    if(this.inlineDatepicker){
      this.showToolTip=true;
    }
    this.minDate = "";
    this.maxDate = "";
    
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
    if(this.inlineDatepicker){
      this.showToolTip=true;
    }
    this.isComponentValid = !this.required;
    if (this.dateformat != null) {
      this.dateformat = "dd/MM/yyyy";
    }
  }


  initDaysTitle() {
    this.daysTitle.push({ "text": "Mo" });
    this.daysTitle.push({ "text": "Tu" });
    this.daysTitle.push({ "text": "We" });
    this.daysTitle.push({ "text": "Th" });
    this.daysTitle.push({ "text": "Fr" });

    this.daysTitle.push({ "text": "Sa" });
    this.daysTitle.push({ "text": "Su" });
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
          'date': null, 'selected': false, 'isCurrentMonth': null, 'isDisabled': false
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
    this.isComponentValid = true;
    if(this.inlineDatepicker){
      this.showToolTip=true;
    }
    else{
    this.showToolTip = !this.showToolTip;
    }
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

  onInput(event: any) {
    if (event.target.value != null && event.target.value != '') {
      let timeValue = event.target.value.split(':');
      if (timeValue != null) {
        let hrs = parseInt(timeValue[0].trim());
        let mins = parseInt(timeValue[1].trim());
        this.selectedDate.setHours(hrs);
        this.selectedDate.setMinutes(mins);
        this.hrs = hrs;
        this.min = mins;
        this.value = this.selectedDate;
        this.change.emit(this.value);
        event.stopPropagation();
      }
    }
  }

  nextMonth(event: any) {
    this.setDateData("plus", 1, event);
    this.disableddays(this.diabledDate);
  }

  prevMonth(event: any) {
    this.setDateData("minus", 1, event);
    this.disableddays(this.diabledDate);

  }

  nextYear(event: any) {
    this.setDateData1("plus", 12, event);
  }

  prevYear(event: any) {
    this.setDateData1("minus", 12, event);
  }
  //this function validates month
  setDateData(state: string, mon: number, event: any) { 
    let d = new Date(this.currrentDate.getFullYear(), this.currrentDate.getMonth(), this.currrentDate.getDate());
    let min = new Date(this.minDate);
    let max = new Date(this.maxDate);
    //checks if selected date is within maximum range of month
    if (state === "plus") {
     
      if (this.maxDate.length > 0) {
        
        if (d.getFullYear() == max.getFullYear()) {
         
          if (d.getMonth() == max.getMonth()) {

            // event.stopPropagation();
          }
          else {
          
            //*********check here******************* */
            //logic to chk if year is valid
            if(d.getFullYear()<=max.getFullYear()){
              if(d.getMonth()<=max.getMonth()){

                d.setMonth(d.getMonth() + mon);
              }
            }
          }
        } else {
           
           //logic to chk if year is valid
           if(d.getFullYear()<=max.getFullYear())
          d.setMonth(d.getMonth() + mon);
        }
      }//outer ends
      else {
         
        d.setMonth(d.getMonth() + mon);
      }
    }
    //checks if selected date is within minimum range of month
    else if (state === "minus") {
       
      if (this.minDate.length > 0) {
        
        if (d.getFullYear() == min.getFullYear()) {
         
          if (d.getMonth() == min.getMonth()) {
            // event.stopPropagation();
          }
          else { //logic to chk if year is valid
          
           if(d.getFullYear()>=min.getFullYear()){
           
             if(d.getMonth()>=min.getMonth()){
            
              d.setMonth(d.getMonth() - mon);
             }
           }
           
          }
        } else {
          
          d.setMonth(d.getMonth() - mon);
        }
      }
      else {
        d.setMonth(d.getMonth() - mon);
      }
    }

    this.currrentDate = d;
    this.initDate();
    event.stopPropagation();
  }
  //this function validates year
  setDateData1(state: string, mon: number, event: any) {
    let d = new Date(this.currrentDate.getFullYear(), this.currrentDate.getMonth(), this.currrentDate.getDate());
    let min = new Date(this.minDate);
    let max = new Date(this.maxDate);
    //checks if selected date is within maximum range of year
    if (state === "plus") {

      if (this.maxDate.length > 0) {
        if (d.getFullYear() <= max.getFullYear() - 1) {
          d.setMonth(d.getMonth() + mon);
        }
      }
      else {
        d.setMonth(d.getMonth() + mon);
      }
    }

    //checks if selected date is within minimum range of year
    else if (state === "minus") {

      if (this.minDate.length > 0) {
        if (d.getFullYear() >= min.getFullYear() + 1) {

          d.setMonth(d.getMonth() - mon);
        }
      } else {
        d.setMonth(d.getMonth() - mon);
      }
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
    this.isComponentValid = true;
    this.change.emit(this.value);
    event.stopPropagation();

  }


  minus(type: string, event: any) {
    if (type === "min") {
      if (this.min == 0) {
        this.min = 60;
        this.hrs--;
      } 7
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
    this.isComponentValid = true;
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
      if (this.required && this.innerValue instanceof Date || ('number' == typeof this.innerValue)) {
        this.dateModel = this.innerValue;
        this.isComponentValid = true;
      } else {
        this.isComponentValid = false;
        this.hrs = 0;
        this.min = 0;

      }

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

  onFocus(elem: any) {
    // if (!this.readonly)
    // this.showToolTip = true;
    // this.posixUp = this.getListPosition(elem);
  }

  onFocusOut(value: any) {
    if (isNaN(Date.parse(value.value))) {
      this.isComponentValid = false;
      value.value = '';
    }
    else {
      this.value = Date.parse(value.value);
      this.isComponentValid = true;
    }
  }

  openPicker(elem: any) {
    if(this.inlineDatepicker){
      this.showToolTip=this.inlineDatepicker;
    }
    else{
this.showToolTip=true;
    }
    //this.showToolTip = true;
    this.posixUp = this.getListPosition(elem);

  }
  getListPosition(elementRef: any): boolean {
    let dropdownHeight: number = 350; //must be same in dropdown.scss
    if (window.innerHeight - (elementRef.getBoundingClientRect().bottom) < dropdownHeight) {

      if ((elementRef.getBoundingClientRect().top - dropdownHeight - elementRef.getBoundingClientRect().height) > 0) {
        this.positionClass = {
          'top': (elementRef.getBoundingClientRect().top - dropdownHeight - elementRef.getBoundingClientRect().height) + 'px'
        };
      }
      else if ((dropdownHeight - elementRef.getBoundingClientRect().top) > 0) {
        this.positionClass = {
          'top': (dropdownHeight - elementRef.getBoundingClientRect().top) + 'px'
        };
      } else if ((elementRef.getBoundingClientRect().top - dropdownHeight) > 0) {
        this.positionClass = {
          'top': (elementRef.getBoundingClientRect().top - dropdownHeight) + 'px'
        };
      }
      return true;
    }
    else {
      this.positionClass = {};
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

  validateDays(days: any) {
    let max = new Date(this.maxDate);
    let min = new Date(this.minDate);
    //check1: if min max is null return false

    if (this.maxDate.length <= 0 && this.minDate.length <= 0) {

      return false;
    }
    if ((this.maxDate.length > 0 && this.minDate.length <= 0) || (this.maxDate.length > 0 && this.minDate.length > 0)) {
      //check if days greater than max return 
      //1
      if (days.getDate() > max.getDate() &&
        days.getMonth() >= max.getMonth() && days.getFullYear() >= max.getFullYear()) {

        return true;
      }//2
      else if (days.getMonth() > max.getMonth() && days.getFullYear() == max.getFullYear()) {
        return true;
      }
    }

    if ((this.maxDate.length <= 0 && this.minDate.length > 0) || (this.maxDate.length > 0 && this.minDate.length > 0)) {//3
      if (days.getDate() < min.getDate() &&
        days.getMonth() == min.getMonth() && days.getFullYear() == min.getFullYear()) {
        return true;
      }//4
      else if (days.getMonth() < min.getMonth() && days.getFullYear() == min.getFullYear()) {
        return true;
      }
    }
    this.disableddays(this.diabledDate);


  }

  disableddays(dates: any) {

    dates.forEach((element:any) => {
      

      let From = new Date(element.from);
      let To = new Date(element.to);

      this.daysArray.forEach((element2:any) => {
        element2.forEach((element1:any) => {

          if (element1.date.getFullYear() <= To.getFullYear() && element1.date.getMonth() <= To.getMonth() && element1.date.getDate() <= To.getDate()) {
            if (element1.date.getFullYear() >= From.getFullYear() &&
              element1.date.getMonth() >= From.getMonth() &&
              element1.date.getDate() >= From.getDate()
            ) {

              element1.isDisabled = true;
            }
          }
        });
      });
    });
  }

 
 

}