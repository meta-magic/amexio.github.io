/**
 * Created by pratik on 20/12/17.
 */
/**
 * Created by ketangote on 7/25/17.
 */
import {
  Component, EventEmitter, forwardRef, Input, OnInit, Output
} from '@angular/core';
import {NG_VALUE_ACCESSOR} from "@angular/forms";

const noop = () => {
};

export const CUSTOM_DATETIME_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AmexioDateTimeComponent),
  multi: true
};

@Component({
  selector: 'amexio-date-time-picker',
  template: `
    <div class="inputgroup">

      <label [style.font-style]="fontStyle" [style.font-family]="fontFamily" [style.font-size]="fontSize">
        {{fieldLabel}}
      </label>


      <input type="hidden"
             [ngModel]="value"
             (ngModelChange)="onChange($event)"
             #inp="ngModel"
      />

      <ng-container *ngIf="readonly && datepicker">
        <input type="text" class="input-control"
               [ngClass]="{'input-control-error' : inp.invalid && (inp.dirty || inp.touched),'input-control-success' : inp.valid && (inp.dirty || inp.touched)}"
               value="{{dateModel|date:dateFormat}}"
               (blur)="onBlur()"
               (focus)="onFocus()"
               [attr.placeholder]="placeholder"
               [attr.disabled]="disabled ? true: null"
               [required]="allowBlank ? true: null"/>
      </ng-container>

      <ng-container *ngIf="!readonly && datepicker">
        <ng-container *ngIf="!timepicker">
          <input type="text" class="input-control"
                 [ngClass]="{'input-control-error' : inp.invalid && (inp.dirty || inp.touched),'input-control-success' : inp.valid && (inp.dirty || inp.touched)}"
                 value="{{dateModel|date:dateFormat}}"
                 (blur)="onBlur()"
                 (focus)="onFocus()"
                 [attr.placeholder]="placeholder"
                 [attr.disabled]="disabled ? true: null"
                 [required]="allowBlank ? true: null"/>
        </ng-container>

        <ng-container *ngIf="timepicker">
          <input type="text" class="input-control"
                 [ngClass]="{'input-control-error' : inp.invalid && (inp.dirty || inp.touched),'input-control-success' : inp.valid && (inp.dirty || inp.touched)}"
                 value="{{dateModel|date:dateFormat}} {{hrs + ' : ' + min}}"
                 (blur)="onBlur()"
                 (focus)="onFocus()"
                 [attr.placeholder]="placeholder"
                 [attr.disabled]="disabled ? true: null"
                 [required]="allowBlank ? true: null"/>
        </ng-container>


        <span *ngIf="showToolTip" class="dropdown-datetime">
          <ul class="dropdown-list">
            <div class="datepicker" (click)="onCalendarClick()">
          <table class="table">
            <thead>
            <td class="navigation" (click)="prevYear($event)">&#8882;</td>
            <td class="navigation" (click)="prevMonth($event)">&#x22B4;</td>

            <!--if timepicker is true-->
            <ng-container *ngIf="timepicker">
              <td colspan="3">{{selectedDate | date:'MMMM y'}}<br/>{{hrs + ':' + min}}</td>
            </ng-container>

            <ng-container *ngIf="!timepicker">
              <td colspan="3">{{selectedDate | date:'MMMM y'}}<br/></td>
            </ng-container>

            <td class="navigation" (click)="nextMonth($event)">&#x22B5;</td>
            <td class="navigation" (click)="nextYear($event)">&#x22B3;</td>
            </thead>
            <tr>
              <td class="daysHeader" *ngFor="let dayTitle of daysTitle">
                <div>{{dayTitle.text}}</div>
              </td>
            </tr>
            <tr *ngFor="let dayArray of daysArray">
              <td *ngFor="let day of dayArray"
                  [ngClass]="{'dateSelected':day.selected, 'currentMonth':day.isCurrentMonth, 'notCurrentMonth':!day.isCurrentMonth}">
                <div (click)="onDateClick(day.date)">{{ day.date | date:'d' }}</div>
              </td>
            </tr>
            <tr>
              <td colspan="7" style="padding-top: 10px;">
                <button type="button" class="btn btn-primary" (click)="setToday()">TODAY</button>
              </td>
            </tr>

            <!--if picker is true-->
            <ng-container *ngIf="timepicker">
              <tr>
                <td colspan="7" class="navigation">
                  &#9719;
                </td>
              </tr>
              <tr>
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
            </ng-container>

          </table>
        </div>
          </ul>
        </span>

      </ng-container>

      <ng-container *ngIf="!datepicker">
        <input type="text" class="input-control"
               [ngClass]="{'input-control-error' : inp.invalid && (inp.dirty || inp.touched),'input-control-success' : inp.valid && (inp.dirty || inp.touched)}"
               value="{{hrs + ' : ' + min}}"
               (blur)="onBlur()"
               (focus)="onFocus()"
               [attr.placeholder]="placeholder"
               [attr.disabled]="disabled ? true: null"
               [required]="allowBlank ? true: null"/>

        <span *ngIf="showToolTip" class="dropdown-datetime">
          <ul class="dropdown-list">
            <div class="datepicker" [attr.id]="elementId">
          <table class="table">
            <!--if picker is true-->
            <tr>
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
        </div>
          </ul>
        </span>
      </ng-container>

      <span class="input-control-feedback">
          <i class="fa fa-calendar" aria-hidden="true"></i>
      </span>

      <!-- <span *ngIf="showToolTip" class="dropdown">
         <ul class="dropdown-list">
           &lt;!&ndash;<li class="list-items" *ngFor="let item of filteredResult" (click)="onItemSelect(item)"><div>{{item[displayField]}}</div></li>&ndash;&gt;
           Calendar here
         </ul>
       </span>-->

    </div>


    <!--   <span *ngIf="iconFeedBack && (inp.invalid && (inp.dirty || inp.touched) || inp.valid)"
             class="input-control-feedback">
           <span *ngIf="inp.invalid && (inp.dirty || inp.touched)">&#9888;</span>
           <span *ngIf="inp.valid && (inp.dirty || inp.touched)"> &#10004;</span>
   
       </span>
   
       <span *ngIf="showToolTip && enablePopOver" class="tooltiptext">
           <div [innerHTML]="helpInfoMsg"></div>
       </span>-->




  `, providers: [CUSTOM_DATETIME_CONTROL_VALUE_ACCESSOR],
  styles: [`


    .datepicker {
      padding: 10px 10px 0px 10px;
      width: 40vh;
      display: flex;
      justify-content: center;
    }

    .datepicker table, tr {

    }

    .datepicker table, tr, td {
      text-align: center;
      padding: 5px;
    }

    .datepicker table tr td:hover {
      font-weight: bold;
    }

    .datepicker .currentMonth {
      font-weight: bold;
    }

    .datepicker .notCurrentMonth {
      font-weight: inherit;
    }

    .datepicker .dateSelected {
      font-weight: bold;
      background-color: #dddddd;
    }

    .daysHeader {
      font-weight: bold;
    }

    .datepicker table, tr, td div {
      cursor: pointer;
    }

    .datepicker .navigation {
      font-size: 20px;
      font-weight: bold;
    }
    
  `]
})

export class AmexioDateTimeComponent implements OnInit {

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
        let day = {
          'date': null, 'selected': false, 'isCurrentMonth': null
        };

        let isCurrentMonth = ((date.getMonth() === selectedPeriod.getMonth()));

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

  onCalendarClick(){
    this.showToolTip = false;
  }

}
