/**
 * Created by ketangote on 12/1/17.
 */





import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'amexio-sidenav-node',
  templateUrl : './sidenavnode.component.html'
})
export class SideNavNodeComponent implements  OnInit{


  @Input() data : any[];

  @Output()
  nodeclick: any = new EventEmitter<any>();


  constructor(){
  }


  ngOnInit(){
  }


  onClick(node:any){
      this.nodeclick.emit(node);
  }

}



