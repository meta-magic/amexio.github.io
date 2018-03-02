/**
 * Created by ketangote on 1/4/18.
 */

import {Component, Input, OnInit, Output, EventEmitter, forwardRef, ViewEncapsulation, ContentChildren, QueryList, AfterViewInit, AfterContentInit, ElementRef} from '@angular/core';

import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import { AmexioNavMenuComponent } from './navmenu.component';

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AmexioNavItemComponent), multi: true
};

@Component({
  selector: 'amexio-nav-item', 
  templateUrl: 'navitem.component.html',
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None
})
export class AmexioNavItemComponent implements OnInit , ControlValueAccessor, AfterViewInit, AfterContentInit{

  @Input() type : string;

  @Input() title : string;

  @Input() icon : string;

  @Input() data : any[];
  
  @Output() onNavItemClick : any = new EventEmitter<any>();

  mobilemode : boolean = false;
  
  
  isAction : boolean = false;
  isTextField : boolean = false;
  isMenu : boolean = false;
  isMenuContainer : boolean = false;
  right : number;
  navbarwidth : number;
  enablerightclass: boolean;

  constructor(private elementref : ElementRef) {

  }

  ngOnInit() {
    if(this.type === "link" || this.type === "button"){
      this.isAction = true;
    }else if(this.type === "textfield"){
      this.isTextField = true;
    }else if(this.type === "menu"){
      this.isMenu = true;
    }else if(this.type === "menucontainer"){
      this.isMenuContainer = true;
    }
  }

  ngAfterViewInit(){
   this.right = this.elementref.nativeElement.getBoundingClientRect().right;
  }
  ngAfterContentInit(){
    
  }

  navItemClick(event:any){
    this.onNavItemClick.emit(event);
  }

  setMobileMode(flag : boolean){
    this.mobilemode = flag;
  }

  setNavbarWidth(navbarwidth:number){
    this.navbarwidth = navbarwidth;
    if(((this.navbarwidth - this.elementref.nativeElement.getBoundingClientRect().left))<165){
      this.enablerightclass = true;
    }
  }

  /**MODEL BINDING FOR TEXT FIELD **/
  // The internal dataviews model
  private innerValue: any = '';

  //Placeholders for the callbacks which are later provided
  //by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  //get accessor
  get value(): any {
    return this.innerValue;
  }

  //set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }
 
  //From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }


}
