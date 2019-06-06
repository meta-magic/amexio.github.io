import { Component , ContentChild, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';

@Component({
  selector: 'amexio-virtual-scroller',
  templateUrl: 'virtualscroller.component.html',
  styles: [`#scroll-content>div {
    height: 40px;
    margin-bottom: 5px;
  }`],
})
export class AmexioVirtualScrollerComponent implements OnInit {

  @Input('height') height: number;

  @Input('data') data: any[];

  @Input('item-size') itemSize: number;

  @Output() onScrollDown: any = new EventEmitter<any>();

  @ContentChild('amexioBodyTmpl') bodyTemplate: TemplateRef<any>;

  @ViewChild('virtualscoller') public virtualscoller: ElementRef;

  currentViewData: any[] = [];
  totalCount: number;
  pageSize: number;
  isOverloaded = false;
  constructor(public ngZone: NgZone) {}
  ngOnInit() {
    this.pageAndTotalCountCal();
    this.initLoad();
  }

  // TO CALCULATE PAGE AND TOTAL SIZE
  private pageAndTotalCountCal() {
    if (this.data && this.height && this.itemSize && this.data.length > 0) {
      this.totalCount = this.data.length;
      this.pageSize = Math.round(this.height / this.itemSize);
    }
  }

  // TO INIT LOAD DATA
  private initLoad() {
    this.ngZone.runOutsideAngular(() => {
      requestAnimationFrame(() => {
        if (this.currentViewData && this.currentViewData.length === 0) {
          for (let i = 0; i < this.pageSize; i++) {
            if (this.data && i < this.totalCount) {
              this.currentViewData.push(this.data[i]);
            }
          }
        }
      });
    });
  }

  // ON SCROLL HANDLE
  // tslint:disable-next-line:cognitive-complexity
  scrollHandler(event: any) {
    const scroller = this.virtualscoller.nativeElement;
    const height = scroller.clientHeight;
    const scrollHeight = scroller.scrollHeight - height;
    const scrollTop = scroller.scrollTop;
    const percent = Math.floor((scrollTop / scrollHeight) * 100);
    this.isOverloaded = false;
    if (percent >= 80 && percent <= 100) {
      this.isOverloaded = true;
      // EMIT EVENT WHEN TOTAL RECORDS ARE SHOWN
      if (this.currentViewData.length === this.totalCount - 1) {
        this.onScrollDown.emit();
      }
    }
    if (
      this.isOverloaded &&
      this.currentViewData &&
      this.currentViewData.length > 0 &&
      (this.currentViewData.length + this.pageSize) <= this.totalCount
    ) {
      const currentViewDataLength = this.currentViewData.length;
      const currentPageSize = currentViewDataLength + this.pageSize;
      for (let i = currentViewDataLength; i < currentPageSize; i++) {
        if (i <= this.totalCount) {
          this.currentViewData.push(this.data[i]);
        }
      }
    }
    if ((this.totalCount - this.currentViewData.length) < this.pageSize) {
       for (let i = this.currentViewData.length; i < this.totalCount ; i++) {
         if (i <= this.totalCount) {
           this.currentViewData.push(this.data[i]);
         }
       }
     }
  }

  // TO ADD DYAMIC NEW RECORDS
  addData(newData: any) {
    if (newData && newData.length > 0) {
      newData.forEach((record: any) => {
        this.data.push(record);
      });
    }
  }
}
