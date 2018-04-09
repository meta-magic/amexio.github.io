/**
 * Created by pratik on 28/12/17.
 */

/*
 Component Name : Amexio carousel
 Component Selector : <amexio-carousel>
 Component Description : The CarouselView displays a collection of images or other content in a horizontal layout with built-in navigation between the items..

*/
import {
  AfterContentInit, Component, ContentChildren, ElementRef, Input, OnInit, QueryList, TemplateRef, ViewChild
} from '@angular/core';
import {AmexioTemplate} from "./carousel.template";


@Component({
  selector: 'amexio-carousel', template: `
    <h4>{{header}}</h4>
    <div class="tabwrapper">
      <div class="carouselnavigation float-left" (click)="previous()">
        <amexio-pane-icon key="carousel_previous"></amexio-pane-icon>
      </div>
      <div class="carouselnavigation float-right" (click)="next()">
        <amexio-pane-icon key="carousel_next"></amexio-pane-icon>
      </div>
      <ul #tab class="tab">
        <li class="tablistitems" *ngFor="let item of data" (mouseover)="stopTimeInterval($event)"
            (mouseleave)="startTimeInterval($event)">
          <ng-template [amexioTemplateWrapper]="itemTemplate" [item]="item"></ng-template>
        </li>
      </ul>
    </div>
  `
})

export class AmexioCarouselComponent implements OnInit, AfterContentInit {

    /*
Properties 
name : header
datatype : string
version : 4.0 onwards
default : none
description : User can bind title for accordion tab.
*/
  @Input() header: string;

   /*
  @Input() mode: 'single' | 'multiple';
  */

/*
Properties 
name : data
datatype : any
version : 4.0 onwards
default : none
description : Data Containing Image Path, Information and Video URL Refer the DataSource Tab 
*/
  @Input() data: any;

  /*
  Properties 
name : shuffle-interval
datatype : number
version : 4.0 onwards
default : none
description : time interval for shuffling images 
*/
  @Input('shuffle-interval') shuffleinterval: number;

  timeInterval: any;

  public itemTemplate: TemplateRef<any>;

  @ContentChildren(AmexioTemplate) templates: QueryList<any>;

  @ViewChild('tab', {read: ElementRef}) public tabs: ElementRef;

  constructor() {
  }

  ngOnInit() {
    // if (this.mode == null) {
    //   this.mode = 'single';
    // }
    if (this.shuffleinterval != null) {
      this.timeInterval = setInterval(() => {
        let carouselItemPosix = this.tabs.nativeElement;
        if (!((carouselItemPosix.scrollWidth - carouselItemPosix.offsetWidth - carouselItemPosix.scrollLeft ) <= 0)) {
          //go next
          carouselItemPosix.scrollLeft = carouselItemPosix.scrollLeft + 200;
        } else if (carouselItemPosix.scrollLeft > 0) {
          //go previous
          carouselItemPosix.scrollLeft = carouselItemPosix.scrollLeft - 200;
        }
      }, this.shuffleinterval);
    }
  }

  ngAfterContentInit() {
    this.templates.forEach((item: any) => {
      switch (item.getType()) {
        case 'item':
          this.itemTemplate = item.template;
          break;

        default:
          this.itemTemplate = item.template;
          break;
      }
    });
  }

  scrollData() {

  }

  next() {
    let nxt = this.tabs.nativeElement;
    nxt.scrollLeft = nxt.scrollLeft + 200;
  }

  previous() {
    let prev = this.tabs.nativeElement;
    prev.scrollLeft = prev.scrollLeft - 200;
  }

  shuffle() {


  }

  stopTimeInterval() {
    clearTimeout(this.timeInterval);
  }

  startTimeInterval() {
    if (this.shuffleinterval != null) {
      this.timeInterval = setInterval(() => {
        let carouselItemPosix = this.tabs.nativeElement;
        if (!((carouselItemPosix.scrollWidth - carouselItemPosix.offsetWidth - carouselItemPosix.scrollLeft ) <= 0)) {
          //go next
          carouselItemPosix.scrollLeft = carouselItemPosix.scrollLeft + 200;
        } else if (carouselItemPosix.scrollLeft > 0) {
          //go previous
          carouselItemPosix.scrollLeft = carouselItemPosix.scrollLeft - 200;
        }
      }, this.shuffleinterval);
    }
  }


}
