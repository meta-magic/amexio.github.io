/**
 * Created by pratik on 14/12/17.
 */
/*
 * Copyright 2016-2017 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Author - Pratik Kelwalkar
 *
 */

/*
Component Name : Amexio panel
Component Selector : <amexio-panel>
Component Description : Panel provides an easy way to organize big forms by
grouping the fields in panel
*/
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { AmexioPanelHeaderComponent } from './../panel/panel.header.component';

@Component({
  selector: 'amexio-panel',
  templateUrl: './panel.component.html',
})

export class AmexioPanelComponent implements OnInit {

  /*
Properties
name : title
datatype : string
version : 4.0 onwards
default :
description : Title for panel.
*/
  @Input() title: any;

  /*
Properties
name : header
datatype :  boolean
version : 4.0 onwards
default : true
description : 	Enable/Disabled header.
*/
  @Input() header: boolean;
  /*
Properties
name : paneltitle
datatype :  boolean
version : 4.0 onwards
default : true
description : 	Enable/Disabled header.
*/
  // @Input() paneltitle: boolean;
  /*
Properties
name : expanded
datatype :  boolean
version : 4.0 onwards
default : false
description : Pane will expand or collapse based on the boolean.
*/
  @Input() expanded: boolean;
  /*
 Properties
 name : border
 datatype :  boolean
 version : 4.0 onwards
 default : false
 description : Pane will expand or collapse based on the boolean.
 */
  @Input() border: boolean;

  /*
Properties
name : collapsible
datatype :  boolean
version : 4.0 onwards
default : false
description : Pane will expand or collapse based on the boolean.
*/
  @Input() collapsible = true;
  /*
Properties
name : height
datatype :  number
version : 4.0 onwards
default : none
description : Height of panel must be in px ex.100, 250..
*/
  @Input() height: number;

  /*
 Properties
 name :  context-menu
 datatype : string
 version : 5.0.1 onwards
 default :
 description : Context Menu provides the list of menus on right click.
 */
  @Input('context-menu') contextmenu: any[];

  @Input() parentRef: any;
  /*
Events
name : onClick
datatype : none
version : none
default : none
description : Fires the on accordion pane click event.
*/

  @Input('fit') fit = true;

  @Output() onClick: EventEmitter<any> = new EventEmitter();

  @Output() nodeRightClick: any = new EventEmitter<any>();

  @Output() rightClick: any = new EventEmitter<any>();

  iconclassKey: string;

  flag: boolean;

  posixUp: boolean;

  rightClickNodeData: any;

  contextStyle: any;

  mouseLocation: { left: number; top: number } = { left: 0, top: 0 };

  private faFaIconUPCss = 'fa fa-caret-up';

  private faFaIconDownCss = 'fa fa-caret-down';

  panelstyle: any;

  constructor() {
    this.panelstyle = { visibility: 'visible' };
  }
  ngOnInit() {
    if (!this.collapsible) {
      this.expanded = true;
    }
    this.iconclassKey = this.expanded ? this.faFaIconUPCss : this.faFaIconDownCss;
    if (this.height) {
      return this.height;
    }
    this.updatestyle();
  }

  onTabClick(btn: any) {
    btn.classList.toggle('active-accordion');
    if (this.iconclassKey === this.faFaIconDownCss) {
      this.iconclassKey = this.faFaIconUPCss;
    } else if (this.iconclassKey === this.faFaIconUPCss) {
      this.iconclassKey = this.faFaIconDownCss;
    }
    this.expanded = !this.expanded;
    this.updatestyle();
    this.onClick.emit();
  }

  private updatestyle() {
    if (this.fit && this.expanded) {
      this.panelstyle = { visibility: 'visible' };
    } else if (this.fit && !this.expanded) {
      this.panelstyle = { visibility: 'hidden' };
    } else if (!this.fit && this.expanded) {
      this.panelstyle = { display: 'block' };
    } else if (!this.fit && !this.expanded) {
      this.panelstyle = { display: 'none' };
    } else {
      this.panelstyle = { visibility: 'visible' };
    }
  }
  getContextMenu() {
    if (this.contextmenu && this.contextmenu.length > 0) {
      this.flag = true;
    }
  }

  getListPosition(elementRef: any): boolean {
    const height = 240;
    if ((window.screen.height - elementRef.getBoundingClientRect().bottom) < height) {
      return true;
    } else {
      return false;
    }
  }
  loadContextMenu(rightClickData: any) {
    console.log('check data', rightClickData);
    this.mouseLocation.left = rightClickData.event.clientX;
    this.mouseLocation.top = rightClickData.event.clientY;
    this.getContextMenu();
    this.posixUp = this.getListPosition(rightClickData.ref);
    rightClickData.event.preventDefault();
    rightClickData.event.stopPropagation();
    this.rightClickNodeData = rightClickData.data;
    this.contextStyle = this.getContextMenuStyle();
    this.nodeRightClick.emit(rightClickData);
  }

  onContextNodeClick(itemConfig: any) {
    if (!itemConfig.disabled) {
      const obj = {
        menuData: itemConfig,
        NodeData: this.rightClickNodeData,
      };
      this.rightClick.emit(obj);
    }
  }

  @HostListener('document:click')
  onWindowClick() {
    this.flag = false;
  }

  @HostListener('document:scroll')
  onscroll() {
    this.flag = false;
  }

  getContextMenuStyle() {
    return {
      'cursor': 'default',
      'position': 'fixed',
      'display': this.flag ? 'block' : 'none',
      'left': this.mouseLocation.left + 'px',
      'top': this.mouseLocation.top + 'px',
      'box-shadow': '1px 1px 2px #000000',
      'width': '15%',
    };
  }
}
