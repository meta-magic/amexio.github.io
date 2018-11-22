/**
 * Created by ketangote on 11/23/17.
 */
/*

 Component Name : Amexio Button
 Component Selector : <amexio-button>
 Component Description : A button component with various modes and configurations.
*/
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
export const COMPONENT_CLASS_MAP: any = {
  primary: 'btn-primary-badge',
  secondary: 'btn-secondary-badge',
};
@Component({
  selector: 'amexio-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class AmexioButtonComponent implements OnInit {
  badgeclsname: any;
  /*
  Properties
  name : label
  datatype : string
  version : 4.0 onwards
  default :
  description : Label on button
  */
  @Input() label: string;
  /*
  Properties
  name :  badge
  datatype : number
  version : 4.1.9 onwards
  default :
  description : Badge  describes the badge value that has to be displayed on button
  */
  @Input('badge') badge: number;

  /*
  Properties
  name :  icon
  datatype : string
  version : 4.0 onwards
  default :
  description : FaIcon classname
  */
  @Input() icon: string;
  /*
  Properties
  name : type
  datatype : string
  version : 4.1 onwards
  default :
  description : Type of button  default / theme-color / theme-backgroundcolor /
  green / red / yellow ( primary / secondary /success / danger &
    warning Depricated v4.1 onwards)
  */
  @Input() type: string;
  /*
  Properties
  name : tooltip
  datatype : string
  version : 4.1 onwards
  default :
  description : Tooltip on button hover
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
  default :
  description : To bind button to form
  */
  @Input('form-bind') formbind: string;
  /*
  Properties
  name : size
  datatype :  string
  version : 4.0 onwards
  default :
  description : Different Sizes of Buttons availabe : large, default, small & xsmall
  */
  @Input() size: string;
  /*
  Properties
  name : loading
  datatype :  boolean
  version : 4.0 onwards
  default :
  description : Loading attribute can be used for async task
  */
  @Input() loading: boolean;
  /*
  Events
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
default : false
description : Set true to show buttom block
*/
  @Input() block: boolean;

  badgeCssClass = '';

  // THIS METHOD IS USED FOR ADDING CSS CLASS DYNAMICALLY
  constructor() { }
  buttonClick(event: any) {
    if (!this.disabled) {
      this.onClick.emit(event);
    }
  }
  ngOnInit(): void {
    this.badgeCssClass = this.badgeClass();
  }

  badgeClass(): string {
    let className = '';
    if (this.type === 'primary' || this.type === 'theme-color') {
      className = 'btn-primary-badge';
    }
    if (this.type === 'secondary' || this.type === 'theme-backgroundcolor') {
      className = 'btn-secondary-badge';
    }
    if (this.type === 'success' || this.type === 'green') {
      className = 'btn-success-badge';
    }
    if (this.type === 'danger' || this.type === 'red') {
      className = 'btn-danger-badge';
    }
    if (this.type === 'warning' || this.type === 'yellow') {
      className = 'btn-warning-badge';
    }
    if (this.type === 'transparent') {
      className = 'btn-transparent-badge';
    }
    return className;
  }

  // THIS METHOD SET DISABLED PROPERTY FOR BUTTON
  setDisabled(disabled: boolean) {
    this.disabled = disabled;
  }
}
