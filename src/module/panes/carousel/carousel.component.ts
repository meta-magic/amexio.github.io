/**
 * Created by pratik on 28/12/17.
 */
import {
  AfterContentInit, Component, ContentChildren, ElementRef, Input, OnInit, QueryList,
  TemplateRef, ViewChild
} from '@angular/core';
import {AmexioTemplate} from "./carousel.template";


@Component({
 selector: 'amexio-carousel',
 template: `   
<h4>{{headerName}}</h4>
   <div class="tabwrapper">
     <div class="carouselnavigation float-left" (click)="previous()"><i class="fa fa-angle-left fa-2x" aria-hidden="true"></i></div>
     <div class="carouselnavigation float-right" (click)="next()"><i class="fa fa-angle-right  fa-2x" aria-hidden="true"></i></div>
         <ul #tab class="tab">
           <li class="tablistitems" *ngFor="let item of data">
              <ng-template [amexioTemplateWrapper]="itemTemplate" [item]="item"></ng-template>
           </li>
         </ul>
   </div>
 `
})

export class AmexioCarouselComponent implements OnInit,AfterContentInit {

 @Input() header : string;

 @Input() mode : 'single' | 'multiple' = 'single';

 @Input() data : any;

 @Input() autoShuffleTime : number;

  public itemTemplate: TemplateRef<any>;

  @ContentChildren(AmexioTemplate) templates: QueryList<any>;

  @ViewChild('tab', { read: ElementRef }) public tabs: ElementRef;

 constructor() { }

 ngOnInit() {
   if(this.autoShuffleTime != null){
     setInterval(()=>{
       let carouselItemPosix = this.tabs.nativeElement;
       if( !((carouselItemPosix.scrollWidth - carouselItemPosix.offsetWidth - carouselItemPosix.scrollLeft ) <= 0)){
         //go next
         carouselItemPosix.scrollLeft=carouselItemPosix.scrollLeft+200;
       }
       else if (carouselItemPosix.scrollLeft > 0 ) {
         //go previous
         carouselItemPosix.scrollLeft=carouselItemPosix.scrollLeft-200;
       }
     },this.autoShuffleTime);
   }
 }

 ngAfterContentInit(){
   this.templates.forEach((item) => {
     switch(item.getType()) {
       case 'item':
         this.itemTemplate = item.template;
         break;

       default:
         this.itemTemplate = item.template;
         break;
     }
   });
 }

  next(){
    let nxt = this.tabs.nativeElement;
    nxt.scrollLeft=nxt.scrollLeft+200;
  }

  previous(){
    let prev = this.tabs.nativeElement;
    prev.scrollLeft=prev.scrollLeft-200;
  }

  shuffle(){


  }

}
