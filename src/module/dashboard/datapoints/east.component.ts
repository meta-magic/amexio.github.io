/**
 * Created by ketangote on 7/25/17.
 */



import {
  Component, Input, OnInit
} from '@angular/core';


@Component({
  selector: 'amexio-east',
  template: `

    <div [ngClass]="cclass" [attr.align]="contentalign" [style.background-color]="backgroundcolor" [style.color]="fontcolor" [style.width]="width" [style.height]="height">
      <ng-content></ng-content>
    </div>


  `
})

export class DataPointEastComponent implements OnInit{

  @Input() contentalign : string;

  @Input() backgroundcolor : string;

  @Input() fontcolor : string;

  @Input() width : string;

  @Input() height : string;

  @Input() cclass:string;

  constructor(){
  }
  ngOnInit(){

  }



}
