/**
 * Created by ketangote on 12/1/17.
 */

 /*
 Component Name : Amexio horizontal tree
 Component Selector : <amexio-horizontal-treeviewnode>
 Component Description : A Horizontal Tree Component.
*/
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'amexio-horizontal-treeviewnode', template: `
    <div class="horizontaltreeview-node">
      <div class="horizontaltreeview-node-entry" [ngClass]="{'sole':data.length==1}" *ngFor="let node of data">
        <span class="horizontaltreeview-node-label" (click)="onClick(node)">
          {{node.text}}
          <span  *ngIf="node.children && (node.children.length>0)" class="float-right" (click)="onClick(node)">
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
}
