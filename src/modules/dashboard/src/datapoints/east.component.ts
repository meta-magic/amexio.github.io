/**
 * Created by ketangote on 7/25/17.
 */



import {
  Component, Input, OnInit
} from '@angular/core';


@Component({
  selector: 'amexio-east',
  template: `

    <div [attr.align]="contentalign" [style.background-color]="backgroundColor" [style.color]="fontColor" [style.width]="width" [style.height]="height">
      <ng-content></ng-content>
    </div>


  `
})

export class DataPointEastComponent implements OnInit{

  @Input() contentalign : string;

  @Input() backgroundColor : string;

  @Input() fontColor : string;

  @Input() width : string;

  @Input() height : string;

  constructor(){
  }
  ngOnInit(){

  }



}
