import { Component , ContentChild, ElementRef, EventEmitter, Input, OnDestroy,
  OnInit, Output, Renderer2, TemplateRef, ViewChild} from '@angular/core';

@Component({
 selector: 'amexio-virtual-scroller',
 templateUrl: 'virtualscroller.component.html',
})
export class AmexioVirtualScrollerComponent implements OnInit, OnDestroy {

 @Input('height') height: number;

 @Input('data') data: any[];

 @Input('item-size') itemSize: number;

 @Input('window-scroll') windowScroll = true;

 @Output() onScrollDown: any = new EventEmitter<any>();

 @ContentChild('amexioBodyTmpl') bodyTemplate: TemplateRef<any>;

 @ViewChild('virtualscoller') public virtualscoller: ElementRef;

 windowscrolllistener: any;
 divscrolllistener: any;
 currentViewData: any[] = [];
 totalCount: number;
 pageSize: number;
 isOverloaded = false;
 show = true;
 newheight: string;
 constructor(private renderer: Renderer2) {
   this.newheight = '100%';
 }

 ngOnInit() {
   setTimeout(() => {
     this.pageAndTotalCountCal();
     this.initLoad();
     this.bindDocumentClickListener();
   }, 500);
 }

 // TO CALCULATE PAGE AND TOTAL SIZE
 private pageAndTotalCountCal() {
   const el = this.virtualscoller.nativeElement;
   this.height = this.windowScroll ? el.clientHeight : this.height;
   if ( this.height === 0) {
    this.height = 450;
   }
   if (this.data && this.height && this.itemSize && this.data.length > 0) {
     this.totalCount = this.data.length;
     this.pageSize = Math.round(this.height / this.itemSize);
   }
   this.newheight = this.height + ' px';
 }

 // TO INIT LOAD DATA
 private initLoad() {
   if (this.currentViewData && this.currentViewData.length === 0) {
     for (let i = 0; i < this.pageSize; i++) {
       if (this.data && i < this.totalCount) {
         this.currentViewData.push(this.data[i]);
       }
     }
   }
 }

 // ON SCROLL HANDLE
 handleDivScrollListener(event: any) {
   if (!this.windowScroll) {
     const scroller = this.virtualscoller.nativeElement;
     const height = scroller.clientHeight;
     const scrollHeight = scroller.scrollHeight - height;
     const scrollTop = scroller.scrollTop;
     const percent = Math.floor((scrollTop / scrollHeight) * 100);
     this.isOverloaded = false;
     this.loadNewData(percent);
   }
 }

 //  TO LAOD NEW DATA ONCE SCROLL IS 80 to 90 %
// tslint:disable-next-line:cognitive-complexity
private loadNewData(percent: any) {
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
// Listener FOR WINDOW
 bindDocumentClickListener() {
   if (this.windowScroll) {
        this.windowscrolllistener = this.renderer
                                         .listen('window', 'scroll', (event: any) => this.handleDocumentListener(event));
  }
}
// UNBIND DOCUMENT
unbindDocumentClickListener() {
 if (this.windowscrolllistener) {
     this.bindDocumentClickListener();
     this.windowscrolllistener = null;
 }
}
//  TO HANDEL DOCUMENT LISTNER
private handleDocumentListener(event: any) {
  if (this.windowScroll) {
   const percent = Math.floor(this.getScrollPercent());
   this.isOverloaded = false;
   this.loadNewData(percent);
  }
}
// GET WINDOW GET SCROLLER PERCENTAGE
private getScrollPercent() {
 // tslint:disable-next-line:one-variable-per-declaration
 const h = document.documentElement,
     b = document.body,
     st = 'scrollTop',
     sh = 'scrollHeight';
 return (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
}

// TO DESTROY
ngOnDestroy(): void {
  this.unbindDocumentClickListener();
}

}
