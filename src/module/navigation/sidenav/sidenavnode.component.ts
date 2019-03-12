/*
* Copyright [2019] [Metamagic]
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
* Created by ketangote on 12/1/17.
*/

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DeviceQueryService } from '../../services/device/device.query.service';
import { IconLoaderService } from './../../services/icon/icon.service';
@Component({
  selector: 'amexio-sidenav-node', templateUrl: './sidenavnode.component.html',
})
export class SideNavNodeComponent implements OnInit {
  /*
    Properties
    name : nodedata
    datatype : any
    version : 5.2.0 onwards
    default :
    description : node data pass on click event.
    */
  @Input('node') nodedata: any;

  @Input('currentdivref') currentdivref: any;

  /*
   Properties
   name : badge
   datatype : string
   version : 5.2.0 onwards
   default :
   description : badge Input for the side nav.
   */
  @Input('badge') badge: string;
  /*
    Properties
    name : icon
    datatype : string
    version : 5.2.0 onwards
    default :
    description :  icon Input for the side nav.
    */
  @Input('icon') icon: string;
  /*
    Properties
    name : label
    datatype : string
    version : 5.2.0 onwards
    default :
    description :  label Input for the side nav.
    */
  @Input('label') label: string;

  /*
   Properties
   name : enableborder
   datatype : boolean
   version : 5.2.0 onwards
   default : false
   description :  border for the side nav .
   */
  @Input('enable-border') enableborder: boolean;

  /*
  Properties
  name : active
  datatype : boolean
  version : 5.2.0 onwards
  default : false
  description :  active the data in the side nav .
  */
  @Input('active') active: boolean;

  /*
   Properties
   name : collapsable
   datatype : boolean
   version : 5.2.0 onwards
   default : false
   description :  collapsable arrow at right side of side nav .
   */
  @Input('collapsable') collapsable: boolean;
  /*
   Properties
   name : data
   datatype : any
   version : 4.0 onwards
   default : none
   description : Local data for sidenav.
   */
  @Input('data') node: any[];
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
   name : nodeClick
   datatype : none
   version : none
   default : none
   description : Fire when sidenav bar menu click
   */
  @Output() nodeClick: any = new EventEmitter<any>();
  /*
   Events
   name : onDrag
   datatype : none
   version : 4.2.9
   default : none
   description : Fire when you drag node
   */
  @Output() onDrag: any = new EventEmitter<any>();
  @Output() nodeEmitToSideNav: any = new EventEmitter<any>();
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
  @Input() expand = false;
  @Input('icon-color') iconcolor: string;
  @Input('show-only-icon') isShowOnlyIcon: boolean;
  isMobile = false;
  isDefaultUserIcon = false;
  constructor(public matchMediaService: DeviceQueryService, private iconService: IconLoaderService) {
    this.displaykey = 'text';
    this.childarraykey = 'children';
    if (this.matchMediaService.IsTablet() || this.matchMediaService.IsPhone()) {
      this.isMobile = true;
    }
  }

  ngOnInit() {
    if (!this.node && !this.label) {
      this.expand = true;
      this.collapsable = false;
    }
  }

  onClick(node: any) {
    this.expand = !this.expand;
    if (this.nodedata) {
      if (this.nodedata.children && this.expand === false) {
        this.nodedata.children.forEach((element: any) => {
            element['tabindex'] = '-1';
        });
      } else if (this.nodedata.children && this.expand === true) {
        this.nodedata.children.forEach((element: any) => {
          element['tabindex'] = '1';
      });
      }
    }

    this.nodeClick.emit(node);
  }

  onNodeClick(node: any) {
    this.nodeClick.emit(node);
  }

  dragStartEvent(event: any) {
    if (this.enabledrag) {
      event.event.dataTransfer.setData('dragData', JSON.stringify(event.data));
      this.onDrag.emit(event);
    }
  }

  emittednodedata(allNodeData: any) {
    this.nodeEmitToSideNav.emit(allNodeData);
  }

  onenterClick(divref: any, nodedata: any) {
    if (divref.tabIndex === 1 && nodedata.children) {
      nodedata.expand = !nodedata.expand;
    }
    if (nodedata.children && nodedata.expand === true) {
      nodedata.children.forEach((element: any, index: any) => {
        element['tabindex'] = '1';
      });
    }
    this.onClick(nodedata);
  }

  setShowOnlyIconFlag(isIcon: any) {
    let icon: any = '';
    const iconObject = this.iconService.getIconObject('sidenavnode-icon');
    if (this.iconService.iconToUse === 'fa') {
      icon = iconObject.fa;
     } else {
      icon = iconObject.mat;
     }
    if (this.isDefaultUserIcon && this.icon === 'fa fa-user-circle') {
      this.icon = '';
      this.isDefaultUserIcon = false;
    } else if ((!this.icon || this.icon === '') && !this.isDefaultUserIcon) {
      this.icon = icon;
      this.isDefaultUserIcon = true;
    }
    this.isShowOnlyIcon = isIcon;
  }
}
