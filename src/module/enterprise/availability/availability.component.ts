import {
  AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input,
  OnChanges, OnInit, Output, SimpleChanges, ViewChild,
} from '@angular/core';

@Component({
  selector: 'amexio-availability',
  templateUrl: './availability.component.html',
})
export class AvailabilityComponent implements OnInit, AfterViewInit, OnChanges {
  @Input('start-date') startDate: string;
  @Input('end-date') endDate: string;
  @Input('start-time') startTime: number;
  @Input('end-time') endTime: number;
  @Input('time-zone-data') zoneData: any;
  @Input('undo-button') undoFlag = false;
  @Input('enable-drag') enableDrag = true;
  _labelData: any;
  @Input('label-data')
  set labelData(value: any[]) {
    this._labelData = value;
  }
  get labelData(): any[] {
    return this._labelData;
  }
  @Input('default-radio') defaultRadio = '';
  @Input('no-change') nocellchange = false;
  @ViewChild('datesdiv') elementView: ElementRef;
  @ViewChild('datesseconddiv') elementView1: ElementRef;
  @ViewChild('datesfirstdiv') elementView2: ElementRef;
  @Output() onClick: any = new EventEmitter<any>();
  @Output() onRadioClick: any = new EventEmitter<any>();
  @Output('onUndoClick') UndoBtnClick: any = new EventEmitter<any>();
  @Output('onDragStart') onDragStartEvent: any = new EventEmitter<any>();
  @Output('onDragOver') onDragOverEvent: any = new EventEmitter<any>();
  @Output('onDragEnd') onDragEndEvent: any = new EventEmitter<any>();

  radioValue = '';
  selectedIndexArr: any[];
  styleVar: any;
  completeNewArr: any[];
  datesArrlen = 0;
  slotTimeArr: any[];
  sDate = new Date();
  eDate = new Date();
  dateArr: any[];
  dateArr1: any[];
  completeTimeArr: any[];
  dateSpanHt = 18;
  dateSpanWt = 46;
  dateSpanlist: any[];
  legendArr: any[];

  dragStartObj: any;
  dragEndObj: any;
  dragFlag = false;
  legendObj = {};
  newTimeArr: any[];
  minIndex: number;
  maxIndex: number;
  count = 0;
  newTimeArr2: any = [];
  constructor(public cdf: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.generateData();
    if ((this.defaultRadio.length > 0)) {
      this.radioValue = this.defaultRadio;
      // this.styleVar will be initialized
      this.legendArr.forEach((element: any) => {
        if (element.label === this.defaultRadio) {
          this.styleVar = element;
          this.onRadioClick.emit(element);
        }
      });

    }
    this.newTimeArr2 = this.dateArr1[0].slots;
  }

  updateComponent() {
    // this.labelData = this._labelData
    this.generateData();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['labelData'] && changes.labelData.currentValue) {
      this.labelData = changes.labelData.currentValue;
    }
  }

  ngOnchanges() {
    this.generateData();

  }
  // generate data structure
  generateData() {
    this.selectedIndexArr = [];
    this.completeNewArr = [];
    this.slotTimeArr = [];
    this.dateArr = [];
    this.dateArr1 = [];
    this.completeTimeArr = [];
    this.dateSpanlist = [];
    this.legendArr = [];
    this.newTimeArr = [];
    this.sDate = new Date(this.startDate);

    this.eDate = new Date(this.endDate);
    let i = 0;
    this.dateArr = [{ dates: [], timearr: [] }];
    this.dateArr1 = [];
    let d;
    // if startdate is less than enddate
    if (this.sDate < this.eDate) {
      do {
        d = new Date(this.sDate.getFullYear(), this.sDate.getMonth(), this.sDate.getDate() + i);
        const dobj = { date: d };
        this.dateArr[0].dates.push(dobj);
        i++;
      } while (d < this.eDate);
    } else if (this.sDate === this.eDate) {
      // if startdate equals enddate
      d = new Date(this.sDate.getFullYear(), this.sDate.getMonth(), this.sDate.getDate() + i);
      const dobj = { date: d };
      this.dateArr[0].dates.push(dobj);
    }

    i = 0;
    const arr: any = [];
    this.sDate = new Date(this.startDate);
    this.eDate = new Date(this.eDate);
    if (this.sDate < this.eDate) {
      do {
        d = new Date(this.sDate.getFullYear(), this.sDate.getMonth(), this.sDate.getDate() + i);
        const dobj = { date: d, slots: arr };
        dobj.slots = this.setSlots1(d);
        this.dateArr1.push(dobj);
        i++;
      } while (d < this.eDate);
    } else if (this.sDate === this.eDate) {
      const arry: any = [];
      d = new Date(this.sDate.getFullYear(), this.sDate.getMonth(), this.sDate.getDate() + i);
      const dobj = { date: d, slots: arry };
      dobj.slots = this.setSlots1(d);
      this.dateArr1.push(dobj);
    }

    this.initializeTimeArr();

    this.generateTimeArr();
    this.datesArrlen = this.dateArr[0].dates.length;
    let j;
    for (j = 0; j < this.datesArrlen; j++) {
      this.dateSpanlist.push(j);
    }
    this.generateLegendArr();
    this.generateSlotTimeArr();
  }

  generateSlotTimeArr() {

    let i = this.startTime;
    while (i <= this.endTime) {
      let j = 0;
      while (j <= 1) {
        const d = new Date();
        d.setHours(i);
        if (j === 0) {
          d.setMinutes(0);
        }
        if (j === 1) {
          d.setMinutes(30);
        }
        this.newTimeArr.push(d);
        j++;
      }
      i++;
    }
  }

  setSlots1(d: Date) {

    const slot: any = [];

    const etime = this.endTime;

    let i = this.startTime;
    let j;
    while (i <= etime) {
      let previousendtime;
      for (j = 0; j <= 1; j++) {
        const obj = {};
        let objstarttime = new Date(d);
        const objendtime = new Date(d);

        if (j === 0) {
          objstarttime.setHours(i);
          objendtime.setHours(i);
          objstarttime.setMinutes(0);
          objendtime.setMinutes(30);
          previousendtime = objendtime;
        }
        if (j === 1) {
          objstarttime = previousendtime;
          objendtime.setHours(previousendtime.getHours() + 1);
          objendtime.setMinutes(0);
        }

        obj['starttime'] = objstarttime;
        obj['endtime'] = objendtime;
        obj['colorflag'] = false;
        slot.push(obj);

      }
      i++;
    }

    return this.chkLabels(d, slot);
  }

  chkLabels(d: Date, slotArray: any) {
    const minindex: any = null;
    const maxindex: any = null;
    let minflag = false;
    let maxflag = false;
    this.labelData.forEach((labelelement: any) => {

      if (labelelement.available) {
        labelelement.available.forEach((availableElement: any) => {
          if (availableElement.date) {
            let minmaxarr: any = [];
            const dt = new Date(availableElement.date);
            let retflagObj: any;
            if (availableElement.time) {
              retflagObj = this.availableTimeTest(availableElement, slotArray, dt, d, minmaxarr);
              minflag = retflagObj.minFlag;
              maxflag = retflagObj.maxFlag;
              minmaxarr = retflagObj.minmaxArr;
            }
            this.setRange(minflag, maxflag, slotArray, minmaxarr, labelelement);
          }

        });
      }
    });
    return slotArray;
  }

  setRange(minflag: boolean, maxflag: boolean, slotArray: any, minmaxarr: any, labelelement: any) {
    if (minflag && maxflag) {
      this.setColorRangeTest(slotArray, minmaxarr, labelelement);
    }
  }

  availableTimeTest(availableElement: any, slotArray: any, dt: Date, d: Date, minmaxarr: any) {
    let minindex = null;
    let maxindex = null;
    let minflag = false;
    let maxflag = false;
    availableElement.time.forEach((timeElement: any) => {
      minindex = null;
      maxindex = null;
      minflag = false;
      maxflag = false;
      const retminmaxObj = this.chkMinMaxIndexTest(slotArray, dt, d, timeElement);
      minflag = retminmaxObj.minFlag;
      maxflag = retminmaxObj.maxFlag;
      minindex = retminmaxObj.minIndex;
      maxindex = retminmaxObj.maxIndex;
      if (minflag && maxflag) {
        const minmaxobj = { minIndex: minindex, maxIndex: maxindex };
        minmaxarr.push(minmaxobj);
      }
    });
    return { minFlag: minflag, maxFlag: maxflag, minmaxArr: minmaxarr };
  }

  setColorRangeTest(slotArray: any, minmaxarr: any, labelelement: any) {
    slotArray.forEach((individualSlot: any, slotindex: any) => {

      minmaxarr.forEach((minmaxrange: any) => {

        if ((slotindex >= minmaxrange.minIndex) && (slotindex <= minmaxrange.maxIndex)) {
          if (individualSlot.label) {
            individualSlot.label = labelelement.label;
            individualSlot['color'] = labelelement.colorcode;
            individualSlot.colorflag = true;
          } else {
            individualSlot['label'] = labelelement.label;
            individualSlot['color'] = labelelement.colorcode;
            individualSlot.colorflag = true;
          }
        }
      });
    });
  }

  chkMinMaxIndexTest(slotArray: any, dt: Date, d: Date, timeElement: any) {
    let minindex: any = null;
    let maxindex: any = null;
    let minflag = false;
    let maxflag = false;
    slotArray.forEach((slotElement: any, slotIndex: number) => {
      if (
        (dt.getFullYear() === d.getFullYear()) &&
        (dt.getMonth() === d.getMonth()) && (dt.getDate() === d.getDate())) {
        //  u hav to modify ur condns here
        const starttimeobj = this.getHourMinuteFormat(timeElement.starttime);

        if (
          ((starttimeobj.hours === slotElement.starttime.getHours()) && (starttimeobj.minutes === slotElement.starttime.getMinutes()))
        ) {

          minindex = slotIndex;
          minflag = true;
        }

      }
      if ((dt.getFullYear() === d.getFullYear()) && (dt.getMonth() === d.getMonth()) &&
        (dt.getDate() === d.getDate())) {

        const endtimeobj = this.getHourMinuteFormat(timeElement.endtime);
        if ((endtimeobj.hours === slotElement.endtime.getHours()) && (endtimeobj.minutes === slotElement.endtime.getMinutes())) {
          maxindex = slotIndex;
          maxflag = true;

        }
        // start end
      }
    });
    return { minFlag: minflag, maxFlag: maxflag, minIndex: minindex, maxIndex: maxindex };
  }

  getHourMinuteFormat(usertime: number) {
    let arr = [];
    arr = usertime.toString().split('.');
    return { hours: parseInt((arr[0]), 10), minutes: arr[1] ? (parseInt((arr[1]), 10) * 10) : 0 };
  }
  ngAfterViewInit() {
    let divHt;
    let divWt;
    divHt = this.elementView.nativeElement.offsetHeight;
    divWt = this.elementView1.nativeElement.offsetWidth;
    this.dateSpanHt = Math.round(divHt / this.datesArrlen);
    this.dateSpanWt = Math.round((divWt) / this.newTimeArr.length);
  }

  generateLegendArr() {

    this.labelData.forEach((element: any) => {
      this.legendObj[element.label] = false;
    });

    this.labelData.forEach((element: any) => {
      const obj = { label: element.label, colorcode: element.colorcode, textcolor: element.textcolor ? element.textcolor : 'black' };
      this.legendArr.push(obj);
    });

    this.count++;
  }

  alterNoChangeFlag() {
    this.nocellchange = true;
  }

  negateNoChangeFlag() {
    this.nocellchange = false;

  }
  initializeTimeArr() {
    this.completeTimeArr = ['12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am',
      '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm',
      '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm',
    ];
  }

  generateTimeArr() {
    let startindex;
    let endindex;
    this.completeTimeArr.forEach((element: any, index: number) => {

      if (element === this.startTime) {
        startindex = index;
      }
      if (element === this.endTime) {
        endindex = index;
      }
    });
    this.setTimeArr(startindex, endindex);
  }

  setTimeArr(startindex: number, endindex: number) {
    const tarr: any = [];
    this.completeTimeArr.forEach((element: any, index: number) => {
      if ((index >= startindex) && (index <= endindex)) {
        const tobj = { time: element };
        tarr.push(tobj);
      }
    });
    this.dateArr[0].timearr = tarr;
  }

  onSelection(radioData: any) {
    this.styleVar = '';
    const obj = { label: radioData.label, colorcode: radioData.colorcode };
    this.styleVar = obj;
    this.onRadioClick.emit(obj);
  }

  clearColorFlag() {
    this.dateArr1.forEach((element: any) => {
      if (element.slots) {
        element.slots.forEach((individualSlot: any) => {
          individualSlot.colorflag = false;
        });
      }
    });
  }

  timeBlockWithoutUndo(parentiterateitem: any, parentindex: any, childiterateitem: any, childindex: any) {
    const flag = false;
    if (this.radioValue.length > 0) {
      if ((this.dateArr1[parentindex].slots[childindex].colorflag)) {

      } else {
        const newobj = this.dateArr1[parentindex].slots[childindex];
        newobj['label'] = this.styleVar.label;
        newobj['color'] = this.styleVar.colorcode;
        newobj.colorflag = true;
        this.dateArr1[parentindex].slots[childindex] = newobj;
      }
    }
    this.onClick.emit({
      time: this.dateArr1[parentindex].slots[childindex].time,
      label: this.dateArr1[parentindex].slots[childindex].label,
    });
    this.generateData();
  }
  timeBlockWithUndo(parentiterateitem: any, parentindex: any, childiterateitem: any, childindex: any) {
    const flag = false;
    if (this.radioValue.length > 0) {
      if ((this.dateArr1[parentindex].slots[childindex].label)) {
        // overriding logic wrks fr false
        // overiding logic starts here
        if (this.dateArr1[parentindex].slots[childindex].label === this.styleVar.label) {
          //  unselect logic
          // label exist and same label
          const newobj = {
            time: this.dateArr1[parentindex].slots[childindex].time, colorflag: false,
          };
          // assignment
          this.dateArr1[parentindex].slots[childindex] = newobj;

          // blank

        } else {
          // label exist and  diff label
          // blank

          const newobj2 = {
            time: this.dateArr1[parentindex].slots[childindex].time, colorflag: false,
          };

          this.dateArr1[parentindex].slots[childindex] = newobj2;

        }
        // overiding logic ends here
      }
    }
    this.onClick.emit({
      time: this.dateArr1[parentindex].slots[childindex].time,
      label: this.dateArr1[parentindex].slots[childindex].label,
    });
    this.generateData();

  }
  onTimeBlockClick(parentiterateitem: any, parentindex: any, childiterateitem: any, childindex: any) {

    this.onClick.emit({
      starttime: this.dateArr1[parentindex].slots[childindex].starttime,
      endtime: this.dateArr1[parentindex].slots[childindex].endtime,
      label: this.dateArr1[parentindex].slots[childindex].label ? this.dateArr1[parentindex].slots[childindex].label : 'not selected',
    });

    this.generateData();
  }

  onUndoClick() {
    this.UndoBtnClick.emit('');
    this.generateData();
  }

  onDragStart(event: any, iterate: any, parentindex: any, item: any, childindex: any) {
    const img = document.createElement('img');
    event.dataTransfer.setDragImage(img, 0, 0);
    this.dragFlag = true;
    this.dragStartObj = {
      dateObj: iterate,
      dragparentindex: parentindex, dragcell: item, dragchildindex: childindex,
    };

    this.onDragStartEvent.emit({
      starttime: this.dateArr1[parentindex].slots[childindex].starttime,
      endtime: this.dateArr1[parentindex].slots[childindex].endtime,
      label: this.dateArr1[parentindex].slots[childindex].label ? this.dateArr1[parentindex].slots[childindex].label : null,
    });

  }

  ondragover(event: any, iterate: any, parentindex: any, item: any, childindex: any) {
    this.dragEndObj = event;

    this.onDragOverEvent.emit({
      starttime: this.dateArr1[parentindex].slots[childindex].starttime,
      endtime: this.dateArr1[parentindex].slots[childindex].endtime,
      label: this.dateArr1[parentindex].slots[childindex].label ? this.dateArr1[parentindex].slots[childindex].label : null,
    });
    this.generateData();
  }

  onDragEnd(event: any, iterate: any, parentindex: any, item: any, childindex: any) {
    this.onDragEndEvent.emit('');
    this.generateData();
  }

}
