import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'amexio-availability',
  templateUrl: './availability.component.html',
})
export class AvailabilityComponent implements OnInit, AfterViewInit {

  @Input('start-date') startDate: string;
  @Input('end-date') endDate: string;
  @Input('start-time') startTime: number;
  @Input('end-time') endTime: number;
  @Input('time-zone-data') zoneData: any;
  @Input('label-data') labelData: any;
  @ViewChild('datesdiv') elementView: ElementRef;
  @ViewChild('datesseconddiv') elementView1: ElementRef;
  @ViewChild('datesfirstdiv') elementView2: ElementRef;
  @Output() onClick: any = new EventEmitter<any>();
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
  legendObj = {};
  newTimeArr: any[];
  minIndex: number;
  maxIndex: number;
  constructor() {
  }

  ngOnInit() {
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
    if (this.sDate < this.eDate) {
      do {
        d = new Date(this.sDate.getFullYear(), this.sDate.getMonth(), this.sDate.getDate() + i);
        const dobj = { date: d };
        this.dateArr[0].dates.push(dobj);
        i++;
      } while (d < this.eDate);
    } else if (this.sDate === this.eDate) {
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
        dobj.slots = this.setSlots(d);
        this.dateArr1.push(dobj);
        i++;
      } while (d < this.eDate);
    } else if (this.sDate === this.eDate) {
      const arry: any = [];
      d = new Date(this.sDate.getFullYear(), this.sDate.getMonth(), this.sDate.getDate() + i);
      const dobj = { date: d, slots: arry };
      dobj.slots = this.setSlots(d);
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

  setSlots(d: Date) {
    const slot = [];
    let difference = this.startTime - this.endTime;
    if (difference < 0) {
      difference = difference * (-1);
    }
    let i = 0;
    while (i <= difference) {
      let j = 0;
      for (j === 0; j <= 1; j++) {
        const obj = {};

        const date1 = new Date(d.getFullYear(), d.getMonth(), d.getDate());
        date1.setHours(this.startTime + i);

        if (j === 0) {
          date1.setMinutes(0);
        }
        if (j === 1) {
          date1.setMinutes(30);
        }
        obj['time'] = date1;
        obj['colorflag'] = false;
        slot.push(obj);
      }
      i++;
    }
    return this.chkLabels(d, slot);
  }
  chkLabels(d: Date, slotArray: any) {
    let slot;
    this.labelData.forEach((labelelement: any) => {
      slot = this.lblElementAvaillable(labelelement, d, slotArray);
    });
    slotArray = slot;
    return slotArray;
  }

  lblElementAvaillable(labelelement: any, d: Date, slotArray: any) {
    let retslot;
    const minflag = false;
    const maxflag = false;
    let flgUpdateObj: any;
    if (labelelement.available) {
      labelelement.available.forEach((availableElement: any) => {
        if (availableElement.date) {
          const dt = new Date(availableElement.date);
          if (availableElement.time) {
            flgUpdateObj = this.isTimeAvailable(slotArray, availableElement, dt, d, { minFlag: minflag, maxFlag: maxflag });

          }

          // minflag maxflag minindex maxindex slotArray reqd
          if (flgUpdateObj.minflag && flgUpdateObj.maxflag) {
            retslot = this.iterateSlots(flgUpdateObj, slotArray, labelelement);
          }
        }

      });
    }
    retslot = slotArray;
    return slotArray;
  }

  iterateSlots(flgUpdateObj: any, slotArray: any, labelelement: any) {
    slotArray.forEach((individualSlot: any, slotindex: number) => {

      if ((slotindex >= flgUpdateObj.minindex) && (slotindex <= flgUpdateObj.maxindex)) {
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
    return slotArray;
  }

  isTimeAvailable(slotArray: any, availableElement: any, dt: Date, d: Date, flagObj: any) {
    let minIndex: number;
    let retObj = {};
    availableElement.time.forEach((timeElement: any) => {
      slotArray.forEach((slotElement: any, slotIndex: number) => {

        if (
          (dt.getFullYear() === d.getFullYear()) &&
          (dt.getMonth() === d.getMonth()) &&
          (dt.getDate() === d.getDate())

        ) {

          const obj = this.getHourMinuteFormat(timeElement.starttime);
          if (
            ((obj.hours === slotElement.time.getHours()) &&
              (obj.minutes === slotElement.time.getMinutes())
            )
          ) {
            minIndex = slotIndex;
            flagObj.minFlag = true;
          }
        }
        if (
          (dt.getFullYear() === d.getFullYear()) &&
          (dt.getMonth() === d.getMonth()) &&
          (dt.getDate() === d.getDate())

        ) {
          retObj = this.chkMax(timeElement, slotElement, flagObj, slotIndex);
        }

      });
    });
    return {
      minindex: minIndex, maxindex: retObj['maxindex'],
      minflag: flagObj.minFlag, maxflag: retObj['maxflag'],
    };
  }

  chkMax(timeElement: any, slotElement: any, flagObj: any, slotIndex: number) {
    let maxIndex;
    const obj = this.getHourMinuteFormat(timeElement.endtime);
    if (
      (obj.hours === slotElement.time.getHours()) &&
      (obj.minutes === slotElement.time.getMinutes())

    ) {
      maxIndex = slotIndex;
      flagObj.maxFlag = true;
    }
    return { maxflag: flagObj.maxFlag, maxindex: maxIndex };
  }

  chkMinMax(slotArray: any, minindex: number, maxindex: number, labelelement: any) {
    slotArray.forEach((individualSlot: any, slotindex: number) => {
      if ((slotindex >= minindex) && (slotindex <= maxindex)) {
        if (individualSlot.label) {
          individualSlot.label = labelelement.label;
          individualSlot['color'] = labelelement.colorcode;
        } else {
          individualSlot['label'] = labelelement.label;
          individualSlot['color'] = labelelement.colorcode;
        }
      }
    });
    return slotArray;
  }

  getHourMinuteFormat(usertime: number) {
    let arr = [];
    arr = usertime.toString().split('.');
    return { hours: parseInt((arr[0]), 10), minutes: arr[1] ? (parseInt((arr[1]), 10) * 10) : 0 };
  }
  ngAfterViewInit() {
    let divHt;
    let divWt;
    let divWt1;
    divHt = this.elementView.nativeElement.offsetHeight;
    divWt = this.elementView1.nativeElement.offsetWidth;
    divWt1 = this.elementView2.nativeElement.offsetWidth;

    this.dateSpanHt = Math.round(divHt / this.datesArrlen);
    this.dateSpanWt = Math.round((divWt - divWt1) / this.newTimeArr.length);
  }

  generateLegendArr() {
    this.labelData.forEach((element: any) => {
      this.legendObj[element.label] = false;
    });

    this.labelData.forEach((element: any) => {
      const obj = { label: element.label, colorcode: element.colorcode };
      this.legendArr.push(obj);
    });

  }

  initializeTimeArr() {
    this.completeTimeArr = ['12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am',
      '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm',
      '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm',
    ];
  }

  chkRedundancy(sentdate: any) {

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
  }

  chkBGColor(parentitem: any, item: any, parentindex: any, childindex: any) {
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

  onTimeBlockClick(parentiterateitem: any, parentindex: any, childiterateitem: any, childindex: any) {
    const indexobj = { parentsindex: parentindex, childsindex: childindex };
    this.selectedIndexArr.push(indexobj);
    if (this.radioValue.length > 0) {
      if (this.dateArr1[parentindex].slots[childindex].label) {
        if (this.dateArr1[parentindex].slots[childindex].label === this.styleVar.label) {
          const newobj = { time: this.dateArr1[parentindex].slots[childindex].time, colorflag: false };
          this.dateArr1[parentindex].slots[childindex] = newobj;
        } else {
          this.dateArr1[parentindex].slots[childindex].label = this.styleVar.label;
          this.dateArr1[parentindex].slots[childindex].color = this.styleVar.colorcode;
          this.dateArr1[parentindex].slots[childindex].colorflag = true;
        }
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
  }

  onUndoClick() {
    this.selectedIndexArr.forEach((element: any) => {
      const newobj = {
        time: this.dateArr1[element.parentsindex].slots[element.childsindex],
        colorflag: false,
      };

      this.dateArr1[element.parentsindex].slots[element.childsindex] = newobj;

    });
  }

}
