/**
 * Created by ketangote on 11/23/17.
 */

  /*
 Component Name : Amexio Button 
 Component Selector : <amexio-button>
 Component Description : A button component with various modes and configurations.

*/
import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'amexio-button', templateUrl: './button.component.html', styleUrls: ['./button.component.scss']
})
export class AmexioButtonComponent {

   /*
Properties
name : label
datatype : string
version : 4.0 onwards
default : none
description : Label on button
*/
  @Input() label: string;

    /*
Propertiee
name :  icon
datatype : string
version : 4.0 onwards
default : none
description : FaIcon classname
*/
  @Input() icon: string;

   /*
Properties
name : type
datatype : string
version : 4.1 onwards
default : none
description : Type of button  default / theme-color / theme-backgroundcolor / green / red / yellow ( primary / secondary /success / danger & warning Depricated v4.1 onwards)
*/
  @Input() type: string;
   /*
Properties 
name : tooltip
datatype : string
version : 4.1 onwards
default : none
description : tooltip on button hover
*/
  @Input() tooltip: string;

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
name : form-bind
datatype : string
version : 4.1.6 onwards
default : none
description : to bind button to form
*/
@Input('form-bind') formbind: string;

  /*
Properties 
name : size
datatype :  string
version : 4.0 onwards
default : none
description : Different Sizes of Buttons availabe : large, default, small & xsmall
*/ 
  @Input() size: string;

 /*
Properties 
name : loading
datatype :  boolean
version : 4.0 onwards
default : none
description : loading attribute can be used for async task 
*/ 
  @Input() loading:boolean;

  /*
Properties 
name : onClick
datatype :  none
version : none
default : none
description : Fire when button click 
*/ 
  @Output() onClick: any = new EventEmitter<any>();

  /*
Properties 
name : block
datatype :  boolean
version : 4.0 onwards
default : none
description : set true to show buttom block
*/ 
  @Input() block: boolean;

  constructor() {

  }

  buttonClick(event: any) {
    if (!this.disabled) {
      this.onClick.emit(event);
    }
  }


}
