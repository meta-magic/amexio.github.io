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
* Created by ketangote on 1/4/18.
*/

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'amexio-nav-menu',
  templateUrl: 'navmenu.component.html',
})
export class AmexioNavMenuComponent implements OnInit {
  /*
   Properties
   name : type
   datatype : string
   version : 4.0 onwards
   default : none
   description : Indicate the type of menu-items (link / button / textfield /menu )
   */
  @Input() type: string;

  /*
   Properties
   name : title
   datatype : string
   version : 4.0 onwards
   default : none
   description : Title for link, button and menu header
   */
  @Input() title: string;

  /*
   Properties
   name : data
   datatype : string
   version : 4.0 onwards
   default : none
   description : Standard JSON format array data which is used for rendering menus. This is used when type=menu is defined.
   */
  @Input() data: any;

  /*
   Properties
   name : icon
   datatype : string
   version : 4.0 onwards
   default : none
   description : Icon for link, button and menu header
   */
  @Input() icon: string;

  /*
   Events
   name : navLinkClick
   datatype : any
   version : none
   default : none
   description : Fire when nav item is clicked, This event is fired when nav item type is defined as 'link/button/menu'
   */
  @Output() navLinkClick: any = new EventEmitter<any>();
  @Output() onNavItemClick: any = new EventEmitter<any>();
  @Input('sub-menu-height-padding') subMenuPadding = '10px';
  @Input() mobilemode = false;
  mobileToggleModel: boolean;
  issubmenu = false;
  divid: any;
  position = 'right';
  ishovered = true;
  @Input() rightflag: boolean;

  @Input('color') color: string;
  constructor() {

  }

  ngOnInit() {
  }

  setMobileMode(flag: boolean) {
    this.mobilemode = flag;
  }
  dataObject(n: any, _event: any): any {
    return { data: n, event: _event };
  }
  onHeaderClick(event: any) {
    const node = {
      header: true,
      title: this.title,
      icon: this.icon,
    };
    this.mobileToggleModel = !this.mobileToggleModel;
    this.onClick(node, event);
  }

  onNodeHover(node: any, event: any) {
    if (!this.mobilemode) {
      node['isExpanded'] = true;
    }

    this.ishovered = false;
    // clear hover flag;
    this.data.forEach((element: any) => {
      this.clearNodeHover(element);
    });

    if (node.submenus && (node.submenus.length > 0)) {
      node.ishover = true;
      this.data.forEach((element: any) => {
        if (node === element) {
          this.setNodeHover(node);
        }
      });
    }
    this.position = this.getMenuPosition(event);
    event.stopPropagation();
  }

  setNodeHover(node: any) {
    node.ishover = true;
    if (node.submenus && (node.submenus.length > 0)) {
      this.setNodeHover(node.submenus);
    }
  }

  clearNodeHover(node: any) {
    node.ishover = false;
    if (node.submenus && (node.submenus.length > 0)) {
      node.submenus.forEach((element: any) => {
        this.clearNodeHover(element);
      });
    }

  }

  getMenuPosition(event: any) {
    const remainingleft = event.currentTarget.getBoundingClientRect().left;
    const remainingright = window.screen.width - event.currentTarget.getBoundingClientRect().right;
    let directionflag: string;
    if (remainingright > remainingleft) {
      directionflag = 'right';
    } else {
      directionflag = 'left';
    }
    return directionflag;
  }

  clearhover() {
    setTimeout(() => {
      this.data.forEach((element: any) => {
        this.clearNodeHover(element);
      });
    }, 0);
  }

  onMouseoverTitle(event: any) {
    this.position = this.getMenuPosition(event);
  }

  onClick(_node: any, _event: any) {
    const n = {
      title: this.title,
      data: this.data,
      icon: this.icon,
      node: _node,
      mobileToggleModel: this.mobileToggleModel,
      mobilemode: this.mobilemode,
    };
    this.onNavItemClick.emit(this.dataObject(n, _event));
    this.onIconClick(_event, _node);
  }

  navItemClick(event: any) {
    event.event.stopPropagation();
    this.onNavItemClick.emit(event);
  }

  onIconClick(event: any, node: any) {
    event.stopPropagation();
    if (node.hasOwnProperty('isExpanded')) {
      node.isExpanded = !node.isExpanded;
    } else {
      node['isExpanded'] = true;
    }

  }
}
