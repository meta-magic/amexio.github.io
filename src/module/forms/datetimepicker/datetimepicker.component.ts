import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {NG_VALUE_ACCESSOR} from "@angular/forms";

const noop = () => {
};

export const CUSTOM_DATETIME_Style_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AmexioDateTimePicker),
  multi: true
};
@Component({
  selector: 'amexio-date-time-picker',
  template: `
    <div class="input-group">

      <ng-container *ngIf="datepicker && !timepicker">
        <input type="text"
               value="{{dateModel|date:dateFormat}}"
               (blur)="onBlur()"
               (focus)="onFocus()"
               class="input-control" placeholder="Choose Date"/>
      </ng-container>

      <ng-container *ngIf="timepicker">
        <input type="text"
               value="{{dateModel|date:dateFormat}} {{hrs + ' : ' + min}}"
               (blur)="onBlur()"
               (focus)="onFocus()"
               class="input-control" placeholder="Choose Time"/>
      </ng-container>


      <span class="input-control-feedback date-icon">
          <i class="fa fa-calendar" aria-hidden="true"></i>
   </span>

    </div>

    <div style="width: 42%;padding-top: 2px;" *ngIf="showToolTip">
      <div class="month">
        <ul style="list-style: none;">
          <li class="prev"><!--<amexio-icon key="datepicker_previous"></amexio-icon>-->
            <i (click)="prevYear($event)" class="fa fa fa-step-backward" aria-hidden="true"></i>
            <i (click)="prevMonth($event)" class="fa fa-chevron-left"></i>
          </li>
          <li class="next"><!--<amexio-icon key="datepicker_next"></amexio-icon>-->
            <i (click)="nextMonth($event)" class="fa fa-chevron-right"></i>
            <i (click)="nextYear($event)" class="fa fa-step-forward" aria-hidden="true"></i>
          </li>
          <li style="cursor:pointer;">{{selectedDate | date:'MMMM'}}<br>
            <span style="font-size:18px;cursor:pointer;">{{selectedDate | date:'y'}}</span>
          </li>
        </ul>
      </div>



      <ul class="weekdays">
        <li *ngFor="let dayTitle of daysTitle">{{dayTitle.text}}</li>
        <!-- Time Picker Div Here -->
      </ul>

      <ul (click)="onSelect()" class="days">
        <ng-container *ngFor="let dayArray of daysArray">
          <li *ngFor="let day of dayArray" (click)="onDateClick(day.date)" ><span [ngClass]="{'active':day.selected, 'currentMonth':day.isCurrentMonth, 'notCurrentMonth':!day.isCurrentMonth}">{{ day.date | date:'d' }}</span></li>
        </ng-container>
        <li class="date-today"><amexio-button label="TODAY" (onClick)="setToday()" size="small"></amexio-button></li>
        <table class="table datepicker" align="center" *ngIf="timepicker" style="cursor : pointer;text-align: center;padding: 5px;">
          <!--if picker is true-->
          <tr style="padding: 10px;">
            <td colspan="2">
            </td>
            <td (click)="plus('hrs', $event);">&#9650;</td>
            <td></td>
            <td (click)="plus('min', $event);">&#9650;</td>
            <td colspan="2">
            </td>
          </tr>
          <tr>
            <td colspan="2">
            </td>
            <td>{{hrs}}</td>
            <td>:</td>
            <td>{{min}}</td>
            <td colspan="2">
            </td>
          </tr>
          <tr>
            <td colspan="2">
            </td>
            <td (click)="minus('hrs', $event);">&#9660;</td>
            <td></td>
            <td (click)="minus('min', $event);">&#9660;</td>
            <td colspan="2">
            </td>
          </tr>

        </table>
      </ul>

    </div>
  `,
  providers : [CUSTOM_DATETIME_Style_CONTROL_VALUE_ACCESSOR]
})

export class AmexioDateTimePicker implements OnInit {

  @Input() dateFormat: string;

  @Input() datepicker: boolean;

  @Input() timepicker: boolean;

  @Input() fieldLabel: string;

  @Input() readonly: boolean;

  @Input() required: boolean;

  @Output() blur : EventEmitter<any> = new EventEmitter<any>();
  @Output() change : EventEmitter<any> = new EventEmitter<any>();
  @Output() input : EventEmitter<any> = new EventEmitter<any>();
  @Output() focus : EventEmitter<any> = new EventEmitter<any>();

  showToolTip : boolean;

  elementId: string;

  daysTitle: any[];

  daysArray: any;

  selectedDate: any;

  currrentDate: any;

  dateModel: any;

  hrs: number;
  min: number;



  constructor() {
    this.elementId = new Date().getTime() + "";
    this.selectedDate = new Date();
    this.currrentDate = new Date();
    this.daysTitle = [];
    this.daysArray = [];
    this.dateFormat = "yMMMMd";
    this.timepicker = false;
    this.hrs = this.currrentDate.getHours();
    this.min = this.currrentDate.getMinutes();
    this.initDaysTitle();
    this.createDaysForCurrentMonths(this.currrentDate);
  }


  ngOnInit() {
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
        let day : any = {
          'date': null, 'selected': false, 'isCurrentMonth': null
        };

        let isCurrentMonth : any = ((date.getMonth() === selectedPeriod.getMonth()));

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

  onFocus(){
    this.showToolTip = true;
  }

  onSelect(){
    this.showToolTip = false;
  }

}
