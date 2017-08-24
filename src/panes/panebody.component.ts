/**
 * Created by ketangote on 7/25/17.
 */



import {
  Component, Input, OnInit
} from '@angular/core';


@Component({
  selector: 'amexio-pane-body',
  template: `
    <div [ngClass]="bodyCClass">
        <ng-content></ng-content>
    </div>
   


  `
})

export class PaneBodyComponent implements OnInit{

  @Input() visible : boolean;

  @Input() bodyCClass:string;

  constructor(){
    this.visible = true;
  }
  ngOnInit(){

  }



}
