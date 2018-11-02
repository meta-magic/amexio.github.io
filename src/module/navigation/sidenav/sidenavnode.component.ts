/**
 * Created by ketangote on 12/1/17.
 */

/*
 Component Name : Amexio sidenav node
 Component Selector : <amexio-sidenav-node>
 Component Description : The Side Nav Bar Component is a familiar side
 navigation pattern for users. Side nav bar can be placed on left or right side.
 It can fit as many navigation links as needed, scrolling when the content
 exceeds the viewport. Take a look at Datastructure format which this component can consume in datasource tab.
*/
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'amexio-sidenav-node', templateUrl: './sidenavnode.component.html',
})
export class SideNavNodeComponent implements OnInit {
  /*
     Properties
     name : separator
     datatype : any
     version : 5.3 onwards
     default : none
     description : separator for component separator.
     */
  @Input('separator') separator = false;
  /*
     Properties
     name : expandIcon
     datatype : any
     version : 5.3 onwards
     default : none
     description : expandIcon icon for right side of sidenav.
     */
  @Input('expand-icon') expandIcon: boolean;
  /*
   Properties
   name : data
   datatype : any
   version : 4.0 onwards
   default : none
   description : Local data for sidenav.
   */
  @Input() data: any[];

  /*
   Properties
   name : label
   datatype : any
   version : 5.2 onwards
   default : none
   description : Lable for sidenav.
   */
  @Input('label') label: any;

  /*
   Properties
   name : icon
   datatype : any
   version : 5.2 onwards
   default : none
   description : icon for sidenav.
   */
  @Input('icon') icon: any;

  /*
   Properties
   name : badge
   datatype : any
   version : 5.2 onwards
   default : none
   description : badges for sidenav.
   */
  @Input('badge') badge: any;

  /*
   Properties
   name : enable-drag
   datatype : boolean
   version : 5.0.0 onwards
   default : false
   description : nodes can be dragged
   */
  @Input('enable-drag') enabledrag: boolean;

  /*
   Events
   name : onClick
   datatype : none
   version : none
   default : none
   description : fires on the click event
   */
  @Output() onClick: any = new EventEmitter<any>();

  /*
   Events
   name : nodeClick
   datatype : none
   version : none
   default : none
   description : Fire when sidenav bar menu click
   */
  @Output() nodeClick: any = new EventEmitter<any>();
  /*
  Events
  name : sidenavNodeClick
  datatype : none
  version : none
  default : none
  description : Fire when sidenav node bar menu click
  */
  @Output() sidenavNodeClick: any = new EventEmitter<any>();

  /*
   Events
   name : onDrag
   datatype : none
   version : 4.2.9
   default : none
   description : Fire when you drag node
   */
  @Output() onDrag: any = new EventEmitter<any>();

  /*
   Properties
   name : display-key
   datatype : string
   version : 5.2.0 onwards
   default : text
   description : Name of key inside response data to display on ui.
   */
  @Input('display-key') displaykey: string;
  /*
   Properties
   name : child-array-key
   datatype : string
   version : 5.2.0 onwards
   default : children
   description : Name of key for child array name inside response data to display on ui.
   */
  @Input('child-array-key') childarraykey: string;
  constructor() {
  }

  ngOnInit() {
  }

  getOnClick(node: any) {
    this.onClick.emit(node);
  }

  activateNode(data: any[], node: any) {
    for (const i of data) {
      if (node === i && !i[this.childarraykey]) {
        i['active'] = true;
      } else {
        i['active'] = false;
      }

      if (i[this.childarraykey]) {
        this.activateNode(i[this.childarraykey], node);
      }
    }
  }

  getOnNodeClick(node: any) {
    this.nodeClick.emit(node);
  }

  dragStartEvent(nodeData: any) {
    this.onDrag.emit(nodeData);
  }

  clickData(event: any) {
    const object = {
      'label': this.label,
      'icon': this.icon,
      'badge': this.badge,
      'expand-icon': this.expandIcon,
    };
    this.sidenavNodeClick.emit(object);
  }
}
