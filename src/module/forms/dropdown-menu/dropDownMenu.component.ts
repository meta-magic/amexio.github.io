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

  `,
  styles:
    [`
      
      li {
        list-style-type: none;
      }
      
      .dropdown-menu-button {
        background-color: #91ABF9;
        color: white;
        padding: 16px;
        cursor: pointer;
      }
      .dropdown-menu {
        position: relative;
        display: inline-block;
      }
      .dropdown-menu-content {
        display: none;
        position: fixed;
        flex-direction: column;
        background-color: lightcyan ;
        min-width: 180px;
        cursor: pointer;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
        padding: 10px;
      }
      .dropdown-menu-content .divider{
        border-bottom: solid 1px #1a1a1a;
        
      }
      .dropdown-menu-content a {
        color: black;
        padding: 5px 6px;
        text-decoration: none;
        display: inline-block; 
        min-width:inherit; 
        padding: 10px;
        display: block;
      }
      .dropdown-menu-content a:hover {
        background-color:  #05B4F6;
      }
      .dropdown-menu:hover .dropdown-menu-content {
        display: flex;
      }
      .dropdown-menu:hover .dropdown-menu-button {
        background-color: #F87DB7;
      }
    `]
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
