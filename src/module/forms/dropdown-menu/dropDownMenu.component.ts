import {
  Component, EventEmitter, ContentChildren, Input, OnInit, QueryList, Output,
  AfterContentInit
} from '@angular/core';

import { AmexioDropDownOptionComponent } from './dropDownMenu.component.options'


@Component({
  selector: 'amexio-drop-down-menu',
  template: `

    <div class="dropdown-menu">
      <a class="dropdown-menu-button" [style.padding]="padding">
        <i *ngIf="icon" [ngClass]="icon"></i>{{title}}&nbsp;<i class="dropdownicon fa fa-angle-down"></i>
      </a>
      <div class="dropdown-menu-content">
          <a [ngClass]="{'divider':node.seprator}" *ngFor="let node of data" >
            <i [ngStyle]="{'float': iconposition === 'right' ? 'right':null }" 
               *ngIf="node.icon" [ngClass]="node.icon"></i>
            <span [ngStyle]="{'padding': iconposition === 'right' ? '0px': '10px' }">{{node.flagName}}</span>
          </a>
      </div>
    </div>

  `
})

export class AmexioDropDownMenuComponent implements AfterContentInit {

  dropDownPreviewData : any;

  /* for internal use*/
  @Input() dropDownMenuLocalData: any;

  /*
   Properties
   name : data
   datatype : string
   version : 4.0 onwards
   default :
   description : data what you want to add in list
   */
  @Input() data: string;
  /*
   Properties
   name : Title
   datatype : string
   version : 4.0 onwards
   default :
   description : title on Dropdown
   */
  @Input() title: string;
  /*
   Properties
   name : icon
   datatype : string
   version : 4.0 onwards
   default :
   description : icon on DropDown Menu
   */
  @Input() icon: string;

  /*
   Properties
   name : flag
   datatype : string
   version : 4.0 onwards
   default : right
   description : flag for icon position right/left
   */
  @Input('icon-position') iconposition : string;

  @Input()  padding : string;

  @ContentChildren(AmexioDropDownOptionComponent) dropdowns: QueryList<AmexioDropDownOptionComponent>;


  ngAfterContentInit() {
    this.dropDownPreviewData = this.dropdowns.toArray();

  }

  constructor() {
    this.iconposition ="left";
  }


}
