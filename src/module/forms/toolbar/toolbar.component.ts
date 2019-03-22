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
*/

import { AfterContentInit, Component, ContentChildren, ElementRef,
EventEmitter, HostBinding, Input, OnInit, Output, QueryList, ViewChild } from '@angular/core';
import { AmexioFormHeaderComponent } from './../../panes/form/form.header.component';
import { AmexioPanelHeaderComponent} from './../../panes/panel/panel.header.component';
import { AmexioWindowHeaderComponent } from './../../panes/window/window.pane.header.component';
import { ToolBarActionComponent } from './toolbaraction.component';
import { ToolbaroneComponent } from './toolbarone.component';

@Component({
  selector: 'amexio-toolbar',
  templateUrl: `./toolbar.component.html`,
})
export class ToolbarComponent implements AfterContentInit, OnInit {

  @HostBinding('attr.class') className = 'toolbar-header';

  /*
Properties
name : seperator
datatype :boolean
version : 4.2onwards
default :
description : This will seperate the toolbar.
*/
  @Input('seperator') seperator: boolean;
  /*
  Properties
  name :toolbarposition
  datatype :string
  version : 4.0 onwards
  default :
  description : This will allign the toolbar.
  */
  @Input('toolbar-position') toolbarposition: string;
  /*
  Events
  name : onClick
  datatype : none
  version : none
  default : none
  description : Callback to invoke on activated tab event.
  */
  @Output() onClick: any = new EventEmitter<any>();
  @Input() tabLocalData: any;
  tabPreviewData: any;

  constructor() {
    this.toolbarposition = 'top';
    this.seperator = false;
  }

  @ContentChildren(ToolbaroneComponent) queryTool: QueryList<ToolbaroneComponent>;
  toolCollection: ToolbaroneComponent[];

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.toolCollection = this.queryTool.toArray();
    for (const i of this.toolCollection) {
      [i]['position'] = this.getToolbaritemposition([i]['position']);
    }
  }
  getToolbaritemposition(position: any): any {

    if (position === 'right') {
      return 'main-right';
    }
    if (position === 'left') {
      return 'main-left';
    }
    if (position === 'center') {
      return 'main-center';
    }
    if (position === '') {
      return 'main-center';
    }
  }
  onToolClick(tool: any) {
    if (!tool.disabled) {
      for (const i of this.toolCollection) {
        if ([i] === tool) {
          [i]['active'] = true;
          this.onClick.emit(tool);
        } else {
          [i]['active'] = false;
        }
      }
    }
  }

  // THIS METHOD IS  FOR APPLIED SPERATOR CLASS
  getSeperatotClass(toolnode: any): any {
    let cssName = '';
    if (this.seperator) {
      cssName = 'seperator-line';
    }
    cssName = cssName + toolnode.position;
    return cssName;
  }

  getToolbarPosition() {
    if (this.toolbarposition === 'top') {
      return '';
    }
    if (this.toolbarposition === 'right') {
      return '';
    }
    if (this.toolbarposition === 'bottom') {
      return '';
    }
  }
}
