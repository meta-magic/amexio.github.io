/**
 * Created by sagar on 6/9/17.
 */


 /*
 Component Name : Amexio Dockbar
 Component Selector : <amexio-dockbar-item>
 Component Description : describes dockar items
*/
import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'amexio-dockbar-item', template: `
    <div *ngIf="active"  [style.width]="width" class="dockbar-active-content dockbar-height" [style.min-height]="height"  [style.max-height]="height">
      <ng-container *ngIf="active && title">
        <div class="dockbar-title">
          {{title}}
          <span class="dockbar-item-close-bar" (click)="onBarIconClick()">
            <amexio-nav-icon key="dockbar_close"></amexio-nav-icon>
            <!--
                        <i class="fa fa-times" aria-hidden="true"></i>
            -->
          </span>
        </div>
      </ng-container>
      <ng-content>
      </ng-content>
    </div>
  `
})

export class DockbarComponent implements OnInit {


  /*
Properties 
name : active
datatype : boolean
version : 4.0 onwards
default : none
description : sets dockbar item active
*/ 
  @Input() active: boolean;

  /*
Properties 
name : label
datatype : string
version : 4.0 onwards
default : none
description : sets label name for dockbar item
*/ 
  @Input() label: string;

  /*
Properties 
name : icon
datatype : string
version : 4.0 onwards
default : none
description : Icon for link, button and menu header
*/
  @Input() icon: string;

  /* not in use */
  @Input() mda: string;

  /*
Properties 
name : sets width
datatype : string
version : 4.0 onwards
default : none
description : Width of dockbar item.
*/
  @Input() width: string;

  /*
Properties 
name : title
datatype : string
version : 4.0 onwards
default : none
description : Title of dockbar item.
*/
  @Input() title: string;


  /*
Properties 
name : path
datatype : any
version : 4.0 onwards
default : none
description : Specifies the URL of an image.Use this attribute only for images.
*/
  @Input() path: any;

  /*
Properties 
name : height
datatype : any
version : 4.0 onwards
default : none
description : Height of dockbar item
*/
  @Input() height: string;

  elementId: string;

  //Close the  dockbar item
  onBarIconClick() {
    this.active = false;
  }

  constructor() {
    this.elementId = 'dockbar-item-id' + Math.floor(Math.random() * 90000) + 10000;
  }

  ngOnInit() {
  }
}
