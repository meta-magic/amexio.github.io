import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'amexio-toolbar-item',
  template:`
  <div [ngClass]="{'toolbaritemseperatorright':(seperatorposition === 'right'),'toolbaritemseperatorleft':(seperatorposition === 'left')}">
  <ng-content></ng-content>
  </div>
   `,
})
export class ToolbaroneComponent implements OnInit {
  /*
Properties
name :seperator-position
datatype :string
version : 4.2onwards
default : 
description : This will seperate the toolbar right and left.
*/
@Input('seperator-position') seperatorposition:string;


  constructor() { 
  }
  ngOnInit() {
  }
 
}
