import {
  Component, EventEmitter, ContentChildren, Input, OnInit, QueryList, Output,
  AfterContentInit
} from '@angular/core';

import { AmexioDropDownOptionComponent } from './dropDownMenu.component.options'


@Component({
  selector: 'amexio-drop-down-menu',
  templateUrl: `./dropDownMenu.component.html`
})

export class AmexioDropDownMenuComponent implements AfterContentInit {

  dropDownPreviewData : any;
  toggle : boolean;
  
  

  /* for internal use*/
  @Input() dropDownMenuLocalData: any;

  /*
   Properties
   name : data
   datatype : string
   version : 4.2 onwards
   default :
   description : data what you want to add in list
   */
  @Input() data: string;
  /*
   Properties
   name : title
   datatype : string
   version : 4.2 onwards
   default :
   description : title on Dropdown
   */
  @Input() title: string;
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
   name : iconposition
   datatype : string
   version : 4.2 onwards
   default : right
   description : iconposition for  icon postion right/left
   */
  @Input('icon-position') iconposition : string;

   /*
   Properties
   name : padding
   datatype : string
   version : 4.2 onwards
   default : 
   description : padding for hover button
   */
  @Input()  padding : string;


    /*
   Properties
   name : icon
   datatype : string
   version : 4.2 onwards
   default :
   description : icon for menu
   */
  @Input('down-arrow-icon') downArrowIcon : boolean=true;

  /*
   Properties
   name : transparent
   datatype : string
   version : 4.2 onwards
   default :
   description : transparent style for menu
   */

  @Input () transparent :boolean =false;

 /*
   Properties
   name : height
   datatype :   any
   version : 4.2 onwards
   default :
   description : User can set the height to menu body..
   */
  @Input()  height : any;



   /*
Events
name : onClick
datatype : any
version :none
default :
description : On record select event.this event is only for normal dropdown.

*/
@Output() onClick: any = new EventEmitter<any>();

  @ContentChildren(AmexioDropDownOptionComponent) dropdowns: QueryList<AmexioDropDownOptionComponent>;



  ngAfterContentInit() {
    this.dropDownPreviewData = this.dropdowns.toArray();

  }

  constructor() {
    this.iconposition ="left";
  }

  toggleDrawerPanel(event : any)
  {
    this.toggle=!this.toggle;
  }

  onDropDownMenuClick(event: any) {
    this.onClick.emit(event);
  }
}
