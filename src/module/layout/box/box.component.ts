/**
 * Created by anaghak07 on 6/3/18.
 */
import {Component, Input, OnInit} from '@angular/core';

@Component({
 selector: 'amexio-box',
 template: `
 <div class="box-content"
 [attr.disabled]="padding ? true: null"
 
 [ngClass]="{
    
 'box-default': borderColor=='default' || borderColor ==null,
 'border-topbar': border=='top',
 'border-bottombar': border =='bottom',
 'border-rightbar': border =='right',
 'border-leftbar': border =='left',
 'border-all' : border =='all',
 'border-top-bottom' : border =='top-bottom' || border =='bottom-top',
 'border-right-left' : border =='right-left' || border =='left-right',
 
 'bg-brown': bgColor=='brown',
 'bg-red': bgColor=='red',
 'bg-green': bgColor=='green',
 'bg-yellow': bgColor=='yellow',
 'bg-blue': bgColor=='blue',
 'bg-purple': bgColor=='purple',

 'border-red' : borderColor =='red',
 'border-yellow' : borderColor =='yellow',
 'border-green' : borderColor =='green',
 'border-blue' : borderColor =='blue',
 'border-brown' : borderColor =='brown',
 'border-purple' : borderColor =='purple',
 'padding' : padding
  }" >
   <ng-content></ng-content>
 </div>
 `
})

export class AmexioBoxComponent implements OnInit {

 @Input('border')   border : string;

 @Input('border-color') borderColor : string;

 @Input('background-color') bgColor : string;

 @Input('padding') padding: boolean;
 
 constructor() { }

 ngOnInit() {
  if (this.borderColor == null)
   this.borderColor = 'box-default';
 

  if (this.borderColor != null && this.bgColor == null){
   this.bgColor = this.borderColor;
  }
 }
}
