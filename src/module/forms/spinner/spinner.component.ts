/**
 * Created by kedar on 17/09/18.
 */
/*
Component Name : Amexio Spinner
Component Selector :  <amexio-spinner>
Component Description :
*/
import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
@Component({
  selector: 'amexio-spinner',
  templateUrl: './spinner.component.html',
})

export class AmexioSpinnerComponent implements OnInit {
  private _type: string;
  private _color: string;

  /*
  Events
  name : type
  datatype : any
  version : none
  default : none
  description : spinner have different type , specify the type as per user choice.
  */
  @Input('type') type: any;
  /*
   Events
   name : color
   datatype : string
   version : none
   default : none
   description : spinner want color
   */
  @Input('color')
  set color(v: string) {
    const ischanges: boolean = (this._color !== v);
    this._color = v;
    if (ischanges) {
      this.assignColor();
    }
  }
  get color() {
    return this._color;
  }
  /*
  Events
  name : show
  datatype : boolean
  version : none
  default : true
  description : if show  is true than and only than the spinner is enable, if false then it is disable.
  */
  @Input() show = true;

  @ViewChild('loadindicator') element: ElementRef;

  alpha = '0.2';

  constructor(private renderer: Renderer2) {
  }

  ngOnInit() {
    this.assignColor();
  }
  private assignColor() {
    if (this.type === 'spinnerRound' && this.color) {
      let newColor: any;
      const r = parseInt(this.color.slice(1, 3), 16);
      const g = parseInt(this.color.slice(3, 5), 16);
      const b = parseInt(this.color.slice(5, 7), 16);

      if (this.alpha) {
        newColor = `rgba(${r}, ${g}, ${b}, ${this.alpha})`;
      } else {
        newColor = `rgba(${r}, ${g}, ${b})`;
      }
      const inlinecss = 'margin: 60px auto;font-size: 10px;position: relative;text-indent: -9999em;border-top: 1.1em solid ' + newColor +
        '; border-right: 1.1em solid ' + newColor +
        ';border-left: 1.1em solid ;-webkit-transform: translateZ(0);-ms-transform: translateZ(0);border-bottom: 1.1em solid ' + newColor +
        ';transform: translateZ(0);  -webkit-animation: load8 1.1s infinite linear;animation: load8 1.1s infinite linear;';
      const inlinecssafter = ' border-radius: 50%; width: 10em; height: 10em;';
      this.insertStyleSheetRule('.dynamicclass { ' + inlinecss + inlinecssafter + '}');
      this.insertStyleSheetRule('@-webkit-keyframes load8 { 0% {  -webkit-transform: rotate(0deg);  transform: rotate(0deg);} ' +
        '100%{-webkit-transform: rotate(360deg); transform: rotate(360deg);} }');
      this.renderer.addClass(this.element.nativeElement, 'dynamicclass');
    }
  }

  insertStyleSheetRule(ruleText: any) {
    const sheets: any = document.styleSheets;
    if (sheets.length === 0) {
      const style = document.createElement('style');
      style.appendChild(document.createTextNode(''));
      document.head.appendChild(style);
    }
    const sheet: any = sheets[sheets.length - 1];
    sheet.insertRule(ruleText, sheet.rules ? sheet.rules.length : sheet.cssRules.length);
  }
}
