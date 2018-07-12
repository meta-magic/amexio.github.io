/**
 * Created by anaghak07 on 6/3/18.
 */

/*
 Component Name : Amexio Box
 Component Selector : amexio-box
 Component Description : Amexio Box can be easily wrapped around any other component and configure using the different responsive styling.

*/
import {Component, Input, OnInit} from '@angular/core';
import {IconLoaderService} from '../../services/icon/icon.service';

@Component({
 selector: 'amexio-box',
 template: `
 <div class="box-content" *ngIf="close"
 [style.height] = "height ? height:'none'"
 [style.width] = "width ? width:'none'"
 [style.align] = "align ? align:'none'"
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
 'bg-theme-color' : bgColor =='theme-color',

 'border-theme-color' : borderColor =='theme-color',
 'border-red' : borderColor =='red',
 'border-yellow' : borderColor =='yellow',
 'border-green' : borderColor =='green',
 'border-blue' : borderColor =='blue',
 'border-brown' : borderColor =='brown',
 'border-purple' : borderColor =='purple',
 'padding' : padding,
 'border-dotted' : borderDotted
  }" >
  <span *ngIf="closable" class="box-close">
  <amexio-layout-icon key="tab_close" (onClick)="closeBox($event)"></amexio-layout-icon>
  </span>
   <ng-content></ng-content>

 </div>
 `,
})

export class AmexioBoxComponent implements OnInit {
/*
Properties
name : border
datatype : string
version : 4.1 onwards
default : none
description : Can set border position : top / right / left / bottom / all / top-bottom / left-right
*/
 @Input('border')   border: string;
/*
Properties
name : border-color
datatype : string
version : 4.1 onwards
default : theme's border color
description : Can use amexio colors : red / blue / green / yellow / brown / purple
*/
 @Input('border-color') borderColor: string;
/*
Properties
name : background-color
datatype : string
version : 4.1 onwards
default : theme's background color
description : Can use amexio colors : red / blue / green / yellow / brown / purple

*/
 @Input('background-color') bgColor: string;
/*
Properties
name : padding
datatype : boolean
version : 4.1 onwards
default : false
description : Padding to all sides
*/
 @Input('padding') padding: boolean = false;
/*
Properties
name : box-height
datatype : string
version : 4.1.2 onwards
default :
description : Height to box
*/
 @Input('box-height') height: string;
 /*
Properties
name : box-width
datatype : string
version : 4.1.2 onwards
default :
description : Width to box
*/
 @Input('box-width') width: string;

 /*
Properties
name : border-dotted
datatype : boolean
version : 4.1.8 onwards
default : false
description : Dotted border
*/
 @Input('border-dotted') borderDotted: boolean = false;

/*
Properties
name : align
datatype : string
version : 4.1.8 onwards
default : left
description : Align to box "left" "right" "center"
*/
 @Input('align') align: string;
/*
Properties
name : closable
datatype : boolean
version : 4.1.8 onwards
default : false
description : closable box
*/
 @Input('closable') closable: boolean = false;

 constructor() { }
 close: boolean = true;
 ngOnInit() {
  if (this.borderColor == null) {
   this.borderColor = 'box-default';
  }
  if (this.borderColor != null && this.bgColor == null) {
   this.bgColor = this.borderColor;
  }
 }
  closeBox(event: any) {
    this.close = false;
    this.closable = false;
  }
}
