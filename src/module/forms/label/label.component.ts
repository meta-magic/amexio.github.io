/**
 * Created by pratik on 7/2/18.
 */
import {Component, Input, OnInit} from '@angular/core';

@Component({
 selector: 'amexio-label',
 template: `
 <label class="label-content {{styleClass}}" [ngStyle]="{'color' : fontColor}">
   <ng-content></ng-content>
 </label>
 `
})

export class AmexioLabelComponent implements OnInit {

 @Input('style')  styleClass : 'large' | 'medium' | 'small' | 'bold' | 'large-bold' | 'medium-bold' | 'small-bold';

 @Input('font-color')   fontColor : string;

 constructor() { }

 ngOnInit() {
   if(this.styleClass == null)
     this.styleClass = 'small';
 }
}
