/**
 * Created by ketangote on 26/2/2018.
 */

 /*
 Component Name : Amexio Floating-Button
 Component Selector :  <amexio-floating-button>
 Component Description : A Floating button component with various position options (vertical/horizontal/top/bottom/left/right)
*/
import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'amexio-floating-button', templateUrl: './floatingbutton.component.html'
})
export class AmexioFloatingButtonComponent implements OnInit{

/*
Properties 
name : vertical-position
datatype : string
version : 4.1 onwards
default : none
description : Postion floating button vertically: top or bottom or center. This attribute is ignored if user specify position explicitly (using position-top/position-bottom/position-left/position-right)
*/ 
  @Input('vertical-position') verticalposition : string;
/*
Properties 
name : horizontal-position
datatype : none
version : 4.1 onwards
default : none
description : Postion floating button horizontally: left or right or center. This attribute is ignored if user specify position explicitly (using position-top/position-bottom/position-left/position-right)
*/ 
  @Input('horizontal-position') horizontalposition : string;
/*
Properties 
name : position-top
datatype : none
version : 4.1 onwards
default : none
description : Takes top position in percentage or pixel
*/ 
  @Input('position-top') top : string;
/*
Properties 
name : position-bottom
datatype : none
version : 4.1 onwards
default : none
description : Takes bottom position in percentage or pixel
*/ 
  @Input('position-bottom') bottom : string;
/*
Properties 
name : position-left
datatype : none
version : 4.1 onwards
default : none
description : Takes left position in percentage or pixel
*/ 
  @Input('position-left') left : string;
/*
Properties 
name : position-right
datatype : none
version : 4.1 onwards
default : none
description : Takes right position in percentage or pixel
*/ 
  @Input('position-right') right : string;
/*
Properties 
name : label
datatype : none
version : 4.1 onwards
default : none
description : Label on floating button, this is activated in case of block=square
*/ 
  @Input('label') label: string;
/*
Properties 
name : block
datatype : none
version : 4.1 onwards
default : none
description : Display button as round or square
*/ 
  @Input('block') block: string = "circle";
/*
Propertiee 
name : icon
datatype : string
version : 4.1 onwards
default : none
description : FaIcon class-name.
*/ 
  @Input('icon') icon : string;
/*
Properties 
name : type
datatype : string
version : 4.1 onwards
default : none
description : Type of button - default / theme-color / theme-backgroundcolor / green / red / yellow
*/ 
  @Input('type') type : string;
/*
Properties 
name : disabled
datatype : string
version : 4.1 onwards
default : none
description :Enable/Disables the button
*/ 
  @Input('disabled') disabled : string;
/*
Properties 
name : relative
datatype : boolean
version : 4.1 onwards
default : none
description : Place floating button at relative position
*/ 
  @Input('relative') relative : boolean = false;
  /*
Events
name : onClick
datatype : any
version : none
default : none
description : Event is fired when button is click
*/ 
  @Output() onClick : any = new EventEmitter<any>();

  positionclass : string;

  absoluteposition : boolean = false;


  constructor() {

  }
  ngOnInit()
  {
    this.addCSSClasses();
  }
// THIS METHOD IS USED FOR SETTING CSS CLASSSES
  addCSSClasses():any{

    if(this.top || this.bottom || this.right || this.left){
      this.absoluteposition = true;
    }

    this.positionclass = ""

    if(this.relative){
      this.positionclass = " floatingbutton-relative "
    }else{
      this.positionclass = " floatingbutton-fixed "
    }

    if(!this.absoluteposition && !this.relative){
      if (this.verticalposition == null) {
          this.verticalposition = 'top';
        } else if (this.horizontalposition == null) {
          this.horizontalposition = 'right'
        }
        this.positionclass = this.positionclass+ " floatingbutton-" + this.verticalposition + " floatingbutton-" + this.horizontalposition+" floatingbutton-default";
    }
    if(this.block === "circle"){
        this.positionclass = this.positionclass +" floatingbutton-circle";
        this.label="";
    }else if(this.block === "square")
    {
      this.positionclass = this.positionclass + " floatingbutton-square";
    }

    if(this.type === "theme-color"){
      if(this.disabled)
          this.positionclass = this.positionclass  + " floatingbutton-theme-color-disabled"
      else
          this.positionclass = this.positionclass + " floatingbutton-theme-color";
    }
    else if( this.type === "green"){
      if(this.disabled)
          this.positionclass = this.positionclass  + " floatingbutton-green-disabled"
      else
          this.positionclass = this.positionclass + " floatingbutton-green";
    }else if(this.type === "red"){
      if(this.disabled)
          this.positionclass = this.positionclass  + " floatingbutton-red-disabled"
      else
          this.positionclass = this.positionclass + " floatingbutton-red";
    }else if(this.type === "yellow"){
      if(this.disabled)
          this.positionclass = this.positionclass  + " floatingbutton-yellow-disabled"
      else
          this.positionclass = this.positionclass + " floatingbutton-yellow";
    }else{
      if(this.disabled)
          this.positionclass = this.positionclass  + " floatingbutton-default-disabled"
      else
          this.positionclass = this.positionclass + " floatingbutton-default";
    }
    return this.positionclass;
  }
  buttonClick(event:any){
      if(!this.disabled){
        this.onClick.emit({'this':this, 'event':event});
      }

  }
}
