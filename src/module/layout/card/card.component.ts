import { AmexioFooterComponent } from './../../panes/action/pane.action.footer';
import { AmexioBodyComponent } from './../../panes/body/pane.action.body';
import { ContentChildren, QueryList } from '@angular/core';
import {AmexioHeaderComponent} from '../../panes/header/pane.action.header';
/**
 * Created by ketangote on 12/18/17.
 */

 /*
 Component Name : Amexio card
  Component Selector : <amexio-card>
 Component Description : Amexio Card which renders card based on title, body and actions user has configured

.

*/

import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'amexio-card', template: `

  <div class="card-container" *ngIf="show"  (window:resize)="onResize()">
    <header #cardHeader  [style.padding]="headerPadding"  class="card-header" *ngIf="header"

            [ngClass]="{'flex-start':(headeralign=='left'),'flex-end':(headeralign=='right'),'flex-center':(headeralign=='center')}">
      <ng-content select="amexio-header"></ng-content>
    </header>
<div class="card-body cardbody" [style.padding]="bodyPadding"  [ngStyle]="{'height.px' : height,'overflow-y' : height!= null ? 'auto' : '','min-height.px' : minHeight}">
      <ng-content select="amexio-body"></ng-content>
    </div>
    <footer  #cardFooter [style.padding]="footerPadding"  class="card-footer" *ngIf="footer"
            [ngClass]="{'flex-start':(footeralign=='left'),'flex-end':(footeralign=='right'),'flex-center':(footeralign=='center')}">
      <ng-content select="amexio-action"></ng-content>
    </footer>
  </div>



  `,
})
export class AmexioCardComponent implements OnInit {

  /*
Properties
name : header-align
datatype : string
version : 4.0 onwards
default : left
description : Align of item elements inside card header example : right,center,left.
*/
  @Input('header-align') headeralign: string;

    /*
Properties
name : header-align
datatype : string
version : 4.0 onwards
default : left
description : User can enable header of card by setting this flag to true..
*/
  @Input() header: boolean;

    /*
Properties
name : footer
datatype : boolean
version : 4.0 onwards
default : false
description : User can enable footer of card by setting this flag to true.
*/
  @Input() footer: boolean;

  /*
Properties
name : footer-align
datatype :  string
version : 4.0 onwards
default : left
description : Align of item elements inside card footer example : right,center,left..
*/
  @Input('footer-align') footeralign: string;

    /*
Properties
name : show
datatype :  boolean
version : 4.0 onwards
default : true
description : User can bind variable to this and hide/unhide card based on requirement..
*/
  @Input() show: boolean = true;

  /*
Properties
name : height
datatype :   any
version : 4.0 onwards
default :
description : User can set the height to body..
*/
  @Input()  height : any;

  /*
Properties
name : min-height
datatype :   any
version : 4.0 onwards
default :
description : Provides minimum card height.
*/
  @Input('min-height')  minHeight : any;

  /*
Properties
name : body-height
datatype :   any
version : 4.0 onwards
default :
description : Provides card height.
*/
  @Input('body-height') bodyheight : any;

  @ViewChild('cardHeader', {read: ElementRef}) public cardHeader: ElementRef;

  @ViewChild('cardFooter', {read: ElementRef}) public cardFooter: ElementRef;

  headerPadding:string;

  bodyPadding:string;

  footerPadding:string;

  @ContentChildren(AmexioHeaderComponent) amexioHeader:QueryList<AmexioHeaderComponent>;

  headerComponentList:AmexioHeaderComponent[];

  @ContentChildren(AmexioBodyComponent) amexioBody:QueryList<AmexioBodyComponent>;

  bodyComponentList:AmexioBodyComponent[];

  @ContentChildren(AmexioFooterComponent) amexioFooter:QueryList<AmexioFooterComponent>;

  footerComponentList:AmexioFooterComponent[];

  constructor() {
    this.headeralign = "left";
    this.footeralign = "right";

  }


  ngOnInit() {
    this.onResize();
  }


  ngAfterViewInit() {

    

  }

  ngAfterContentInit(){
    //FOR HEADER PADING
    this.headerComponentList = this.amexioHeader.toArray();
    this.headerComponentList.forEach((item:AmexioHeaderComponent,currentIndex)=>{
      if(item.padding){
        this.headerPadding=item.padding;
      }
    });

    //FOR BODY PADDING
    this.bodyComponentList = this.amexioBody.toArray();
    this.bodyComponentList.forEach((item:AmexioBodyComponent,currentIndex)=>{
      if(item.padding){
        this.bodyPadding=item.padding;
      }
    });
    //FOR FOOTER PADDING
    this.footerComponentList = this.amexioFooter.toArray();
    this.footerComponentList.forEach((item:AmexioFooterComponent,currentIndex)=>{
      if(item.padding){
        this.footerPadding=item.padding;
      }
    });
  }
  /**
   *  Calculate body size based on browser height
   **/
  onResize(){

    if(this.bodyheight){
      let h = (window.innerHeight/100)*this.bodyheight;

      if(this.cardHeader && this.cardHeader.nativeElement && this.cardHeader.nativeElement.offsetHeight)
        h = h - this.cardHeader.nativeElement.offsetHeight;

      if(this.cardFooter && this.cardFooter.nativeElement && this.cardFooter.nativeElement.offsetHeight)
        h = h - this.cardFooter.nativeElement.offsetHeight;


      if(this.bodyheight === 100)
        h = h - 40;

      this.minHeight = h;
      this.height = h;
    }
  }



}



