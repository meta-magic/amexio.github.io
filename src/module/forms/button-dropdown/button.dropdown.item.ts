/**
 * Created by pratik on 13/12/17.
 */


/*
 Component Name : Amexio Button Dropdown
 Component Selector : <amexio-btn-dropdown-item>
 Component Description : Amexio Dropdown Button component with various modes and configurations .

*/
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'amexio-btn-dropdown-item', template: ''
})

export class AmexioButtonDropDownItemComponent implements OnInit {

 
  
  @Input() label: string;

  /*
Properties 
name : disabled
datatype : boolean
version : 4.0 onwards
default : false
description : Enable/Disables the button
*/
  @Input() disabled: boolean;

   /*
Properties 
name :  icon
datatype : string
version : 4.0 onwards
default : none
description : Fa icon class name
*/
  @Input() icon: string;

  
   /*
Events 
name : onClickRoute
datatype : string
version : 4.0 onwards
default : none
description : routes on click of button
*/
  @Input() onClickRoute: string;


  iconStyleClass: string;

     /*
Events 
name : onItemClick
datatype : none
version : none
default : none
description : Fire when button-dropdown item button/link click
*/
  @Output() onItemClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }
}
