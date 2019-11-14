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

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'amexio-sidenav-innernode',
  templateUrl: './sidenavinnernode.component.html',
})
export class AmexioSideNavInnerNodeComponent implements OnInit {

  @Input('display-key') displaykey: string;

  @Input('icon') icon: string;

  @Input('child-array-key') childarraykey: string;

  @Input('data') data: any;

  @Output() onClick: any = new EventEmitter<any>();

  @Input('enable-drag') enabledrag: boolean;

  @Output() onDrag: any = new EventEmitter<any>();

  @Output() emitNode: any = new EventEmitter<any>();

  ngOnInit() {
  }

  onNodeClick(node: any) {
    node.expand = !node.expand;
    if (node.children && node.expand === false) {
      node.children.forEach((element: any) => {
        element['tabindex'] = '-1';
      });
    } else if (node.children && node.expand === true) {
      node.children.forEach((element: any) => {
        element['tabindex'] = '1';
      });
    }
    this.getOnClick(node);
    this.emitNode.emit(this.data);
  }

  onenterNodeClick(event: any, node: any) {
    event.stopImmediatePropagation();
    node.expand = !node.expand;
    if (node.children && node.expand === true) {
      node.children.forEach((element: any, index: any) => {
        element['tabindex'] = '1';
      });
    }
    this.getOnClick(node);
    this.emitNode.emit(this.data);
  }

  getOnClick(node: any) {
    this.onClick.emit(node);
    this.activateNode(this.data, node);
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

  dragStartEvent(event: any) {
    if (this.enabledrag) {
      event.event.dataTransfer.setData('dragData', JSON.stringify(event.data));
      this.onDrag.emit(event);
    }
  }
}
