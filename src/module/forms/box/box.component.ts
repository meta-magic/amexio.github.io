/**
 * Created by anaghak07 on 6/3/18.
 */
import {Component, Input, OnInit} from '@angular/core';

@Component({
 selector: 'amexio-box',
 template: `
 <div class="box-content {{styleClass}}"
 [attr.disabled]="padding ? true: null"
 [ngClass]="{
 'border-default': borderColor=='default' || borderColor ==null,
 'border-topbar': border=='top',
 'border-bottombar': border=='bottom',
 'border-rightbar': border=='right',
 'border-leftbar': border=='left',
 'bg-yellow': bgcolor=='highlight',
 'bg-light-grey': bgcolor=='grey',
 'bg-pale-red': bgcolor=='red',
 'bg-pale-green': bgcolor=='green',
 'bg-pale-yellow': bgcolor=='yellow',
 'bg-pale-blue': bgcolor=='blue',
 'border-amber' : borderColor =='amber',
 'border-aqua' : borderColor =='aqua',
 'border-blue' : borderColor =='blue',
 'border-light-blue' : borderColor =='light-blue',
 'border-brown' : borderColor =='brown',
 'border-cyan' : borderColor =='cyan',
 'border-blue-grey' : borderColor =='blue-grey',
 'border-green' : borderColor =='green',
 'border-indigo' : borderColor =='indigo',
 'border-light-green' : borderColor =='light-green',
 'border-khaki' : borderColor =='khaki',
 'border-lime' : borderColor =='lime',
 'border-orange' : borderColor =='orange',
 'border-deep-orange' : borderColor =='deep-orange',
 'border-pink' : borderColor =='pink',
 'border-purple' : borderColor =='purple',
 'border-red' : borderColor =='red',
 'border-sand' : borderColor =='sand',
 'border-teal' : borderColor =='teal',
 'border-yellow' : borderColor =='yellow',
 'border-white' : borderColor =='white',
 'border-black' : borderColor =='black',
 'border-grey' : borderColor =='grey',
 'border-light-grey' : borderColor =='light-grey',
 'border-dark-grey' : borderColor =='dark-grey',
 'border-pale-red' : borderColor =='pale-red',
 'border-pale-green' : borderColor =='pale-green',
 'border-pale-yellow' : borderColor =='pale-yellow',
 'border-pale-blue' : borderColor =='pale-blue',
 'padding' : padding
  }" >
   <ng-content></ng-content>
 </div>
 `
})

export class AmexioBoxComponent implements OnInit {

 @Input('border')   border : string;

 @Input('border-color') borderColor : string;

 @Input('background-color') bgcolor : string;

 @Input('padding') padding: boolean;
 
 constructor() { }

 ngOnInit() {
  if (this.borderColor == null)
   this.borderColor = 'border-default';
 }
}
