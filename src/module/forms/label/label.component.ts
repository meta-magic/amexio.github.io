/**
 * Created by pratik on 7/2/18.
 */
import {Component, Input, OnInit} from '@angular/core';

@Component({
 selector: 'amexio-label',
 template: `
 <label class="label-content {{styleClass}}" 
 [ngStyle]="{'color' : fontColor}"
 [ngClass]="{'border-topbar': border=='top',
 'border-bottombar': border=='bottom',
 'border-rightbar': border=='right',
 'border-leftbar': border=='left',
 'bg-yellow': bgcolor=='highlight',
 'bg-light-grey': bgcolor=='grey',
 'bg-pale-red': bgcolor=='red',
 'bg-pale-green': bgcolor=='green',
 'bg-pale-yellow': bgcolor=='yellow',
 'bg-pale-blue': bgcolor=='blue'
  }" >
   <ng-content></ng-content>
 </label>
 `
})

export class AmexioLabelComponent implements OnInit {

 @Input('size')  styleClass : 'large' | 'medium' | 'small' | 'bold' | 'large-bold' | 'medium-bold' | 'small-bold';

 @Input('font-color')   fontColor : string;

 @Input('border')   border : string;

 @Input('background-color') bgcolor : string;

 constructor() { }

 ngOnInit() {
   if(this.styleClass == null)
     this.styleClass = 'small';
 }
}
