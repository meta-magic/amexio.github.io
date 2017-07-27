/**
 * Created by ketangote on 7/25/17.
 */



import {
  Component, Input, OnInit
} from '@angular/core';


@Component({
  selector: 'amexio-pane-body',
  template: `

    <ng-content></ng-content>


  `
})

export class PaneBodyComponent implements OnInit{

  @Input() visible : boolean;

  constructor(){
    this.visible = true;
  }
  ngOnInit(){

  }



}
