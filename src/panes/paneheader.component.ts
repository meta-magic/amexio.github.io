/**
 * Created by ketangote on 7/25/17.
 */



import {
  Component, Input, OnInit
} from '@angular/core';


@Component({
  selector: 'amexio-pane-header',
  template: `

    <ng-content></ng-content>


  `
})

export class PaneHeaderComponent implements OnInit{

  @Input() visible : boolean;

  constructor(){
    this.visible = true;
  }
  ngOnInit(){

  }



}
