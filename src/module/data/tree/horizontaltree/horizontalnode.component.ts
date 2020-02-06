/**
 * Created by Kedar on 6-2-2020.
 */
/*
Component Name : Amexio horizontal tree
Component Selector : <amexio-horizontal-treeviewnode>
Component Description : A Horizontal Tree Component.
*/
import { AfterViewInit, Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'amexio-horizontal-treeviewnode',
  templateUrl: './horizontalnode.component.html',
})
export class HorizontalTreeViewNodeComponent implements AfterViewInit, OnInit {

  @Input() templates: any;
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

  treetemplates: any;
  @ContentChild('amexioTreeTemplate') parentTmp: TemplateRef<any>;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.parentTmp != null) {
        this.treetemplates = { treeNodeTemplate: this.parentTmp };
      } else if (this.treetemplates != null) {
        this.parentTmp = this.treetemplates.treeNodeTemplate;
      }
    });
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
