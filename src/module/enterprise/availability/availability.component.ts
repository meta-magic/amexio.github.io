import { AfterViewInit, Component, ElementRef, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'amexio-availability',
    templateUrl: './availability.component.html',
})
export class AvailabilityComponent implements OnInit, AfterViewInit {
       
    @Input('start-date') startDate: string;
    @Input('end-date') endDate: string;
    @Input('start-time') startTime: number;
    @Input('end-time') endTime: number;
    // @Input() timezone: boolean;
    @Input('time-zone-data') zoneData: any;
    //  = 
    @Input('label-data') labelData: any;
    @ViewChild('datesdiv') elementView: ElementRef;
    @ViewChild('datesseconddiv') elementView1: ElementRef;
    @ViewChild('datesfirstdiv') elementView2: ElementRef;
    @Output() onClick: any = new EventEmitter<any>();
    radioValue = '';
    selectedIndexArr: any[];
    styleVar: any;
    completeNewArr: any[];
    datesArrlen: number = 0;
    slotTimeArr: any[];
    sDate = new Date();
    eDate = new Date();
    dateArr: any[];
    dateArr1: any[];
    completeTimeArr: any[];
    dateSpanHt: number = 18;
    dateSpanWt: number = 46;
  
    dateSpanlist: any[];
    legendArr: any[];
    legendObj = {};
    newTimeArr: any[];
    constructor() {
  
    }
  
    ngOnInit() {
        this.selectedIndexArr = [];

        this.completeNewArr = [];
    
        this.slotTimeArr = [];
        this.dateArr = [];
        this.dateArr1 = [];
        this.zoneData =[];
        this.completeTimeArr = [];
        this.dateSpanlist = [];
        this.legendArr = [];
        this.newTimeArr = []
      this.sDate = new Date(this.startDate);
      this.eDate = new Date(this.endDate);
      let i = 0;
      this.dateArr = [{ dates: [], timearr: [] }];
      this.dateArr1 = []
      let d;
      // make arr of dates frm sdate to edate
      if (this.sDate < this.eDate) {
        do {
          d = new Date(this.sDate.getFullYear(), this.sDate.getMonth(), this.sDate.getDate() + i);
          let dobj = { date: d };
          this.dateArr[0].dates.push(dobj);
          i++;
        } while (d < this.eDate);
      } else if (this.sDate === this.eDate) {
        d = new Date(this.sDate.getFullYear(), this.sDate.getMonth(), this.sDate.getDate() + i);
        let dobj = { date: d };
        this.dateArr[0].dates.push(dobj);
      }
  
      // ###########3panda starts
      // this.newTimeArr = [];
      i = 0;
      let arr: any = [];
      this.sDate = new Date(this.startDate);
      this.eDate = new Date(this.eDate);
      if (this.sDate < this.eDate) {
        do {
          d = new Date(this.sDate.getFullYear(), this.sDate.getMonth(), this.sDate.getDate() + i);
          let dobj = { date: d, slots: arr };
          dobj.slots = this.setSlots(d);
          this.dateArr1.push(dobj);
          i++;
        } while (d < this.eDate);
      } else if (this.sDate === this.eDate) {
          let arry: any = [];
        d = new Date(this.sDate.getFullYear(), this.sDate.getMonth(), this.sDate.getDate() + i);
        let dobj = { date: d, slots: arry };
        dobj.slots = this.setSlots(d);
        this.dateArr1.push(dobj);
      }
  
      // ########3panda ends
  
  
      // generate time arr
      this.initializeTimeArr();
      this.generateTimeArr();
      this.datesArrlen = this.dateArr[0].dates.length;
      // dateSpanlist
      let j;
      for (j = 0; j < this.datesArrlen; j++) {
        this.dateSpanlist.push(j);
      }
  
      // generate legends arr
      this.generateLegendArr();
  
      this.dateArr
      // gennerate complete new ds 
      // this.generateCompleteArr();
  
      this.generateSlotTimeArr();
  
      // this.setLabelData();
    }
  
  
    // setLabelData() {
    //   this.labelData.forEach((labelElement: any) => {
    //     if(labelElement.available) {
    //       labelElement.available.forEach((availableElement: any) => {
    //          if (availableElement.date) {
    //           let d = new Date(availableElement.date);
    //           availableElement.time.forEach((labelDataTime: any) => {
  
    //           this.dateArr1.forEach((dataElement: any) => {
    //             if((dataElement.date.getDate() === d.getDate()) &&
    //               (dataElement.date.getMonth() === d.getMonth()) &&
    //               (dataElement.date.getFullYear() === d.getFullYear())) {
    //                if (dataElement.slots) {
    //               dataElement.slots.forEach((slotElement: any) => {
    //                 slotElement.starttime
  
    //               });
  
    //             }
    //             }
    //           });
  
    //         });
    //         }
    //       });
    //     }
    //   });
    // }
  
    generateSlotTimeArr() {
      this.startTime;
      this.endTime;
      let i = this.startTime;
      while (i <= this.endTime) {
        // this.newTimeArr.push(i);
  
        // 2 iterations fr every hr
        let j = 0;
        while (j <= 1) {
          let d = new Date();
          d.setHours(i);
          if (j == 0) {
            d.setMinutes(0);
          }
          if (j == 1) {
            d.setMinutes(30);
          }
          this.newTimeArr.push(d);
          j++;
        }
  
        i++;
      }
      this.newTimeArr;
  
    }
  
    setSlots(d: Date) {
  
      // consider start time and end time
      let slot = [];
      let start = d;
  
      let difference = this.startTime - this.endTime;
      // let stime = this.startTime - 1
      if (difference < 0) {
        difference = difference * (-1);
      }
      // difference = difference + 1;
      let i = 0;
      let labels = this.legendObj;
      while (i <= difference) {
        // let date2 = new Date(d.getFullYear(), d.getMonth(), d.getDate());
        // date1.setHours(stime + i);
        // date2.setHours(stime + i + 1);
        // obj['starttime'] = date1;
        // obj['endtime'] = date2;
        let j = 0
        for (j == 0; j <= 1; j++) {
          let obj = {};
  
          let date1 = new Date(d.getFullYear(), d.getMonth(), d.getDate());
          // let date2 = Object.assign([], date1);
  
          date1.setHours(this.startTime + i);
  
          if (j === 0) {
            date1.setMinutes(0);
          } // if ends for j = 0
          if (j === 1) {
            date1.setMinutes(30);
          } // if ends for j = 1
          obj['time'] = date1;
          obj['colorflag'] = true;
          // obj['isselected'] = false;
          slot.push(obj);
          // j = 0;
        }
        i++;
      }
      let newobj = this.chkLabels(d, slot);
      return newobj;
    }
  
  
    chkLabels(d: Date, slotArray: any) {
      let minindex: number;
      let maxindex: number;
      let minflag = false;
      let maxflag = false;
      this.labelData.forEach((labelelement: any) => {
        if (labelelement.available) {
          labelelement.available.forEach((availableElement: any) => {
  
            if (availableElement.date) {
              let dt = new Date(availableElement.date);
              if (availableElement.time) {
                availableElement.time.forEach((timeElement: any) => {
                  // timeElement.starttime
                  slotArray.forEach((slotElement: any, slotIndex: number) => {
                    // slotElement.starttime.getHours()
                    // timeElement.starttime
                    if (
                      (dt.getFullYear() === d.getFullYear()) &&
                      (dt.getMonth() === d.getMonth()) &&
                      (dt.getDate() === d.getDate())
  
                    ) {
  
                      let obj = this.getHourMinuteFormat(timeElement.starttime);
                      if (
                        // (timeElement.starttime === slotElement.time.getHours())
                        ((obj.hours === slotElement.time.getHours()) &&
                          (obj.minutes === slotElement.time.getMinutes())
                        )
  
  
                        //   (timeElement.starttime === slotElement.endtime.getHours()) 
                        // || 
                        // (timeElement.starttime === slotElement.starttime.getHours())
                      ) {
                        minindex = slotIndex;
                        minflag = true;
                      }
                    }
                    //  timeElement.endtime
                    //  slotElement.endtime.getHours()
                    if (
                      (dt.getFullYear() === d.getFullYear()) &&
                      (dt.getMonth() === d.getMonth()) &&
                      (dt.getDate() === d.getDate())
  
                    ) {
                      let obj = this.getHourMinuteFormat(timeElement.endtime);
                      if (
                        (obj.hours === slotElement.time.getHours()) &&
                        (obj.minutes === slotElement.time.getMinutes())
  
                        // timeElement.endtime === slotElement.time.getHours()
                        //  timeElement.endtime === slotElement.endtime.getHours()
                      ) {
                        maxindex = slotIndex;
                        maxflag = true;
                      }
                    }
  
                  });
                });
              }
  
              if (minflag && maxflag) {
                //  minindex = minindex - 1;
                slotArray.forEach((individualSlot: any, slotindex: number) => {
  
                  if ((slotindex >= minindex) && (slotindex <= maxindex)) {
                    if (individualSlot.label) {
                      individualSlot.label = labelelement.label;
                      individualSlot['color'] = labelelement.colorcode;
                      // individualSlot.colorflag = true;
                    } else {
                      individualSlot['label'] = labelelement.label;
                      individualSlot['color'] = labelelement.colorcode;
                      // individualSlot.colorflag = true;
                    }
                  }
                });
              }
            }
  
          });
        }
      });
      return slotArray;
    }
  
    getHourMinuteFormat(usertime: number) {
      let arr = [];
      arr = usertime.toString().split('.');
      let timeobj = { hours: parseInt(arr[0]), minutes: arr[1] ? (parseInt(arr[1]) * 10) : 0 }
      return timeobj
    }
    ngAfterViewInit() {
        let divHt;
        let divWt;
        let divWt1;
        let widthDifference = 0;
        divHt = this.elementView.nativeElement.offsetHeight;
        divWt = this.elementView1.nativeElement.offsetWidth;
        divWt1 = this.elementView2.nativeElement.offsetWidth;
    
        widthDifference = divWt - divWt1;
    
        if (widthDifference < 0) {
          widthDifference = widthDifference * (-1);
        }
    
        this.dateSpanHt = Math.round(divHt / this.datesArrlen);
        this.dateSpanWt = Math.round((divWt - divWt1) / this.newTimeArr.length);
     }
  
    generateLegendArr() {
  
      this.labelData.forEach((element: any) => {
        // this.legendArr.push(element.label);
        this.legendObj[element.label] = false;
      });
  
      this.labelData.forEach((element: any) => {
        // this.legendArr.push(element.label);
        let obj = { label: element.label, colorcode: element.colorcode };
  
        // this.legendArr['label'] = element.label;
        // this.legendArr['colorcode'] = element.colorcode;
        this.legendArr.push(obj);
      });
      // this.legendArr.push({label:'All', colorcode: ''});
      // this.legendArr.push({label:'Undo', colorcode: ''})
    }
  
    // generateCompleteArr() {
  
    //   let isAbsentInLabeldata = false;
  
    //   this.dateArr[0].dates.forEach((individualDate: any) => {
    //      this.labelData.forEach((labelElement: any) => {
    //        if (labelElement.available) {
    //          labelElement.available.forEach(availableElement => {
    //            let obj = { date: individualDate, time: {}, labels: this.legendObj };
    //           //  case handled date in date range array match with date in labeldata 
    //           if (new Date(availableElement.date) === individualDate) {
    //              let isredundant = false;
    //             //  case: chk fr redundancy in array ur gng to push
    //             if (this.completeNewArr.length > 0) {
    //               // this case is valid for more thn one element existance in completeNewArr
    //               // isredundant = this.chkRedundancy(availableElement.date);
    //               // sorted
    //               if (!isredundant) {
    //                 // make ds and push it 
    //                 let obj = { date: individualDate, time: [], labels: this.legendObj };
    //                 if (availableElement.time) {
    //                   obj.time = availableElement.time;
    //                   // updated obj labels according to labelElement.label
    //                   for (let [key, value] of Object.entries(obj.labels)) {
    //                     if (key === labelElement.label) {
    //                       obj.labels[key] = true;
    //                     }
    //                   } // object for ends
    //                     // push the obj in completearr
    //                     this.completeNewArr.push(obj);
    //                 }
  
    //               } else {
    //                 // case: date exist in completeNewArr
    //                 //  dont generate structure and alter only tht dates tht flag
    //                 // iterate completeNewArr structure
    //                 // update obj flag of respective label
    //               }
    //               // 
    //             } else {
    //               // 
    //               // create object fr new 
    //               isredundant = true;
    //             }
  
    //             //  negate isredundant flag
    //             isredundant = false;
    //           } else {
    //             isAbsentInLabeldata = true;
    //           }
    //         });
    //       }
    //     });
    //     if (isAbsentInLabeldata) {
    //       // case handled: if date in daterange array is absent in labeldata 
    //       //  directly make obj and push it directly
    //       let obj = { date: individualDate, time: [], labels: this.legendObj };
    //       this.completeNewArr.push(obj);
    //     }
    //     isAbsentInLabeldata = false;
    //   });
    // }
  
    initializeTimeArr() {
      this.completeTimeArr = ['12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am',
        '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm',
        '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm'
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
      let tarr: any = [];
      this.completeTimeArr.forEach((element: any, index: number) => {
        if ((index >= startindex) && (index <= endindex)) {
          let tobj = { time: element };
          tarr.push(tobj);
        }
      });
      // update dateArr
      this.dateArr[0].timearr = tarr;
    }
  
    onSelection(radioData: any) {
      this.styleVar = '';
  
      this.newTimeArr;
      this.dateArr1
      let obj = { label: radioData.label, colorcode: radioData.colorcode };
  
      this.styleVar = obj;
  
      // this.clearColorFlag();
      //  this.dateArr1.forEach((element: any) => {
      //    if (element.slots) {
      //     element.slots.forEach((individualSlot: any) => {
      //       if ((individualSlot.label && (individualSlot.label === radioData.label)) &&
      //         (individualSlot.color && (individualSlot.color === radioData.colorcode))) {
      //         individualSlot.colorflag = true;
      //       }
      //     });
      //   }
  
      // });
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
      let indexobj = { parentsindex: parentindex, childsindex: childindex };
      this.selectedIndexArr.push(indexobj);
      if (this.radioValue.length > 0) {
        if (this.dateArr1[parentindex].slots[childindex].label) {
          // make new obj slots[childindex]
  
          if (this.dateArr1[parentindex].slots[childindex].label === this.styleVar.label) {
            // unselect
            let newobj = { time: this.dateArr1[parentindex].slots[childindex].time, colorflag: false }
            this.dateArr1[parentindex].slots[childindex] = newobj;
          } else {
            this.dateArr1[parentindex].slots[childindex].label = this.styleVar.label;
            this.dateArr1[parentindex].slots[childindex].color = this.styleVar.colorcode;
            this.dateArr1[parentindex].slots[childindex].colorflag = true;
          }
        } else {
          let newobj = this.dateArr1[parentindex].slots[childindex];
          newobj['label'] = this.styleVar.label;
          newobj['color'] = this.styleVar.colorcode;
          newobj.colorflag = true;
          // this.dateArr1[parentindex].slots[childindex]['label'] = this.styleVar.label;
          // this.dateArr1[parentindex].slots[childindex]['color'] = this.styleVar.colorcode;
          this.dateArr1[parentindex].slots[childindex] = newobj;
        }
      }
      this.onClick.emit({ time: this.dateArr1[parentindex].slots[childindex].time, label: this.dateArr1[parentindex].slots[childindex].label });
    }
  
    onUndoClick() {
      this.selectedIndexArr
      this.dateArr1
      this.selectedIndexArr.forEach((element: any) => {
        let newobj = {
          time: this.dateArr1[element.parentsindex].slots[element.childsindex],
          colorflag: false
        };
  
        this.dateArr1[element.parentsindex].slots[element.childsindex] = newobj;
  
      });
    }
  
}
