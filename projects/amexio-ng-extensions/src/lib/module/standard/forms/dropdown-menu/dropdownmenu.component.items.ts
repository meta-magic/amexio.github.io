
/*
 Component Name : Amexio  Dropdown Menu
 Component Selector : <amexio-drop-down-menu-items>
 Component Description : Amexio Dropdown component with various modes and configurations .
 */

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
@Component({
  selector: 'amexio-drop-down-menu-item',
  templateUrl: `./dropdownmenu.component.items.html`,
})
export class AmexioDropDownitemsComponent implements OnInit {
  toggle: boolean;
/*
   Properties
   name : label
   datatype : string
   version : 4.2 onwards
   default :
   description : Label Dropdown
   */
  @Input() label: string;
  /*
   Properties
   name : icon
   datatype : string
   version : 4.2 onwards
   default :
   description : icon on DropDown Menu
   */
  @Input() icon: string;
  /*
   Properties
   name : label-align
   datatype : string
   version : 4.2 onwards
   default :
   description : Label-align for label right/left
   */
  @Input ('label-align') labelalign: string;
  /*
   Properties
   name : icon-align
   datatype : string
   version : 4.2 onwards
   default :
   description : icon-align for text field right/left
   */
  @Input ('icon-align') iconalign: string;
  /*
   Properties
   name : add-seperator
   datatype :  boolean
   version : 4.2 onwards
   default : false
   description : add divider to the dropdown menu list
   */
  @Input ('separator') separator: boolean;

  @Input('index') index: string;
  @Input('selected') selected: boolean;
  /*
   Properties
   name : add-seperator
   datatype :  boolean
   version : 4.2 onwards
   default : false
   description : add divider to the dropdown menu list
   */

  @Output() onClick: any = new EventEmitter<any>();
  ngOnInit() {
    if (this.iconalign && this.labelalign
      && this.iconalign.toLowerCase() === this.labelalign.toLowerCase()) {
      this.iconalign = null;
      this.labelalign = null;
    } else if (this.iconalign && this.iconalign === 'left') {
      this.labelalign = 'right';
      this.iconalign = null;
    } else if (this.iconalign && this.iconalign === 'right') {
      this.labelalign = null;
    }
  }
  onItemClick(clickEvent: any) {
  this.toggle = false;
  const e = {
      event: clickEvent,
      this: this,
    };
  this.onClick.emit(e);
  }
}
