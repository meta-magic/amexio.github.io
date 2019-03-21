/**
 * Created by ketangote on 12/1/17.
 */

/*
Component Name : Amexio horizontal tree
Component Selector : <amexio-horizontal-treeviewnode>
Component Description : A Horizontal Tree Component.
*/
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'amexio-horizontal-treeviewnode', template: `
  <div #id class="horizontaltreeview-node">
  <div class="horizontaltreeview-node-entry" [ngClass]="{'sole':data.length==1}" *ngFor="let node of data; let i = index">
    <span id={{node.id}} tabindex="1" [attr.aria-expanded]="node.expand"
    class="horizontaltreeview-node-label" (click)="onClick(node)" (keyup.enter)="onEnterClick(node)"
    (keyup.arrowup)="onArrowUp(data,node,i)"
    (keyup.arrowdown)="onArrowDown($event,data,node,i)">
      {{node.text}}
      <span  *ngIf="node.children && (node.children.length>0)" class="float-right" (click)="onClick(node)" (keyup.enter)="onClick(node)">
        <amexio-c-icon *ngIf="node.expand" key="horizontal-tree-collapse"></amexio-c-icon>
        <amexio-c-icon *ngIf="!node.expand" key="horizontal-tree-expanded"></amexio-c-icon>
      </span>
    </span>
    <amexio-horizontal-treeviewnode *ngIf="node.expand && node.children && (node.children.length>0)"
                                    [data]="node.children"
                                    (onNodeClick)="onInnerClick($event)"></amexio-horizontal-treeviewnode>
  </div>
</div>
  `,
})
export class HorizontalTreeViewNodeComponent implements OnInit {

  /*
 Properties
 name : data
 datatype : any
 version : 4.0 onwards
 default : none
 description : Local Data binding.
 */
  @Input() data: any[];

  /*
Events
name : onNodeClick
datatype : none
version : none
default : none
description : It will gives you clicked node data.
*/
  @Output() onNodeClick: any = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  onClick(node: any) {
    node.expand = !node.expand;
    this.onNodeClick.emit(node);
  }

  onInnerClick(node: any) {
    this.onNodeClick.emit(node);
  }

  onArrowUp(data: any, node: any, index: any) {
    const newindex = index - 1;
    if (newindex >= 0) {
      const previousindex = data[newindex];
      this.setFocus(previousindex);
      this.focusToInnerLastItem(previousindex);
    } else {
      const id = node.id;
      const spiltID = this.splitID(id);
      const randomnumber = spiltID[0];
      const currentid = spiltID[1];
      const newid = parseInt(currentid.slice(0, -1), 10);
      const id2: any = newid;
      const focusid1 = randomnumber + '-' + id2;
      if (document.getElementById(focusid1)) {
        document.getElementById(focusid1).focus();
      }
    }

  }

  setFocus(focuselement: any) {
    if (document.getElementById(focuselement.id)) {
      document.getElementById(focuselement.id).focus();
    }
  }

  focusToInnerLastItem(node: any) {
    if (node.hasOwnProperty('expand') && node.expand && node['children']) {
      node['children'].forEach((innernode: any) => {
        this.focusToInnerLastItem(innernode);
      });
    } else {
      this.setFocus(node);
    }
  }

  splitID(id: any) {
    return id.split('-');
  }

  onArrowDown(event: any, data: any, node: any, index: any) {
    const incrementindex = index + 1;
    const itemid = data[incrementindex];
    if (node.expand === true && node['children']) {
      const data1 = node['children'][0];
      this.setFocus(data1);
    } else {
      if (incrementindex < data.length) {
        this.setFocus(itemid);
      } else {
        this.focusTONextParent(node);
      }
    }
  }

  focusTONextParent(node: any) {
    const sliceId = this.splitID(node.id);
    const randomnumber = sliceId[0];
    const currentid = sliceId[1];

    const newid = parseInt(currentid.slice(0, -1), 10);
    const currentitem: any = newid + 1;
    const focusid1 = randomnumber + '-' + currentitem;
    if (document.getElementById(focusid1)) {
      document.getElementById(focusid1).focus();
    } else {
      const nextnewid = parseInt(currentitem.toString().slice(0, -1), 10);
      const id3: any = nextnewid + 1;
      const focusid2 = randomnumber + '-' + id3;
      if (document.getElementById(focusid2)) {
        document.getElementById(focusid2).focus();
      }
    }
  }

  onEnterClick(node: any) {
    this.onClick(node);
    if (node.hasOwnProperty('expand') && node.expand && node['children']) {
      const sliceId = this.splitID(node.id);
      const randomnumber = sliceId[0];
      const currentid = sliceId[1];
      const nextId = currentid + 1;
      const focusid = randomnumber + '-' + nextId;
      if (document.getElementById(focusid)) {
        document.getElementById(focusid).focus();
      }
    }
  }
}
