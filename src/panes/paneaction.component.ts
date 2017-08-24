/**
 * Created by ketangote on 7/25/17.
 */



import {
  Component, Input, OnInit
} from '@angular/core';


@Component({
  selector: 'amexio-pane-action',
  template: `
    <div [ngClass]="actionCClass">
        <ng-content></ng-content>
    </div>

  `
})

export class PaneActionComponent implements OnInit{

  @Input() visible : boolean;

  @Input() actionCClass:string;

  constructor(){
    this.visible = true;
  }
  ngOnInit(){

  }



}
