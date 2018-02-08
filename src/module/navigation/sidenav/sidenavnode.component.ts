/**
 * Created by ketangote on 12/1/17.
 */


import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'amexio-sidenav-node', templateUrl: './sidenavnode.component.html'
})
export class SideNavNodeComponent implements OnInit {


  @Input() data: any[];

  @Output() onClick: any = new EventEmitter<any>();

  @Output() nodeClick: any = new EventEmitter<any>();


  constructor() {
  }


  ngOnInit() {
  }


  getOnClick(node: any) {
    this.onClick.emit(node);
  }

  activateNode(data: any[], node: any) {
    for (let i = 0; i < data.length; i++) {
      if (node === data[i] && !data[i]['children']) {
        data[i]['active'] = true;
      } else {
        data[i]['active'] = false;
      }

      if (data[i]['children']) {
        this.activateNode(data[i]['children'], node);
      }
    }
  }

  getOnNodeClick(node: any) {
    this.nodeClick.emit(node);
  }
}



