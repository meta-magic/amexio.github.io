/**
 * Created by pratik on 18/12/17.
 */
/**
 * Created by ketangote on 12/18/17.
 */


import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'amexio-card', template: `

  <div class="card-container" *ngIf="show"  (window:resize)="onResize()">
    <header #cardHeader class="card-header" *ngIf="header"
            [ngClass]="{'flex-start':(headeralign=='left'),'flex-end':(headeralign=='right'),'flex-center':(headeralign=='center')}">
      <ng-content select="amexio-header"></ng-content>
    </header>
    <div class="card-body cardbody" [ngStyle]="{'height.px' : height,'overflow-y' : height!= null ? 'auto' : '','min-height.px' : minHeight}">
      <ng-content select="amexio-body"></ng-content>
    </div>
    <footer  #cardFooter class="card-footer" *ngIf="footer"
            [ngClass]="{'flex-start':(footeralign=='left'),'flex-end':(footeralign=='right'),'flex-center':(footeralign=='center')}">
      <ng-content select="amexio-action"></ng-content>
    </footer>
  </div>



  `
})
export class AmexioCardComponent implements OnInit {


  @Input('header-align') headeralign: string;

  @Input() header: boolean;

  @Input() footer: boolean;

  @Input('footer-align') footeralign: string;

  @Input() show: boolean = true;

  @Input()  height : any;

  @Input('min-height')  minHeight : any;

  @Input('body-height') bodyheight : any;

  @ViewChild('cardHeader', {read: ElementRef}) public cardHeader: ElementRef;

  @ViewChild('cardFooter', {read: ElementRef}) public cardFooter: ElementRef;



  constructor() {
    this.headeralign = "left";
    this.footeralign = "right";
  }


  ngOnInit() {
  }


  ngAfterViewInit() {
    this.onResize();
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



