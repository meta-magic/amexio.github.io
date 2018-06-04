


/*
 Component Name : Amexio  Dropdown Menu
 Component Selector : <amexio-drop-down-menu-items>
 Component Description : Amexio Dropdown component with various modes and configurations .
 */

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'amexio-drop-down-menu-item',
  template: `
    <div *ngIf="!(icon && label)" class="divider" >
      <ng-content></ng-content>
    </div>
    <a  *ngIf="icon && label" (click)="onItemClick($event)" [ngClass]="{'divider':separator}" >
      <i [style.float]="iconalign" [ngClass]="icon"></i>
      <span [style.float]="labelalign"   style="padding: 5px;">
        {{label}}
      </span>
    </a>

  `
})

export class AmexioDropDownitemsComponent implements OnInit{


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
  @Input ('label-align') labelalign : string;
  /*
   Properties
   name : icon-align
   datatype : string
   version : 4.2 onwards
   default :
   description : icon-align for text field right/left
   */
  @Input ('icon-align') iconalign : string;
  /*
   Properties
   name : add-seperator
   datatype :  boolean
   version : 4.2 onwards
   default : false
   description : add divider to the dropdown menu list
   */
  @Input ('separator') separator : boolean;

  /*
   Properties
   name : add-seperator
   datatype :  boolean
   version : 4.2 onwards
   default : false
   description : add divider to the dropdown menu list
   */

  ngOnInit() {
    if(this.iconalign && this.labelalign
      && this.iconalign.toLowerCase() === this.labelalign.toLowerCase()){
      this.iconalign = null;
      this.labelalign = null;
    }
    else if(this.iconalign && this.iconalign == "left"){
      this.labelalign = "right";
      this.iconalign = null;
    }
    else if(this.iconalign && this.iconalign == "right"){
      this.labelalign = null;
    }
  }

  @Output() onClick: any = new EventEmitter<any>();

  onItemClick( event :any) {

    let e = {
      'event':event,
      'this':this
    };
    this.onClick.emit(e);
  }

}
