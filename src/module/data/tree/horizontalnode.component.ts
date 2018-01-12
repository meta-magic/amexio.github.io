/**
 * Created by ketangote on 12/1/17.
 */
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'amexio-horizontal-treeviewnode',
  template: `
    <div class="horizontaltreeview-node">
      <div class="horizontaltreeview-node-entry" [ngClass]="{'sole':data.length==1}" *ngFor="let node of data">
        <span class="horizontaltreeview-node-label" (click)="onClick(node)">{{node.text}}</span>
        <amexio-horizontal-treeviewnode  *ngIf="node.expand && node.children && (node.children.length>0)"  [data]="node.children" (onNodeClick)="onInnerClick($event)"></amexio-horizontal-treeviewnode>
      </div>
    </div>
  `
})
export class HorizontalTreeViewNodeComponent implements  OnInit{


  @Input() data : any[];

  @Output() onNodeClick : any = new EventEmitter<any>();

  constructor(){
  }


  ngOnInit(){
  }


  onClick(node:any){
    node.expand=!node.expand;
    this.onNodeClick.emit(node);
  }

  onInnerClick(node : any){
    this.onNodeClick.emit(node);
  }

}



