/**
 * Created by ketangote on 7/25/17.
 */



import {
  Component, Input, OnInit
} from '@angular/core';


@Component({
  selector: 'amexio-pane-header',
  template: `
    <div [ngClass]="headerCClass">
        <ng-content></ng-content>
    </div>

  `
})

export class PaneHeaderComponent implements OnInit{

  @Input() visible : boolean;

  @Input() headerCClass:string;

  constructor(){
    this.visible = true;
  }
  ngOnInit(){

  }



}
