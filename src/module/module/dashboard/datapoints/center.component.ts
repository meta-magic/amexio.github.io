/**
 * Created by ketangote on 7/25/17.
 */


import {
  Component, Input, OnInit
} from '@angular/core';


@Component({
  selector: 'amexio-center', template: `

    <div [ngClass]="cclass" [attr.align]="contentalign" [style.background-color]="backgroundcolor"
         [style.color]="fontcolor" [style.width]="width" [style.height]="height">
      <ng-content></ng-content>
    </div>


  `
})

export class DataPointCenterComponent implements OnInit {

  @Input() contentalign: string;

  @Input('background-color') backgroundcolor: string;

  @Input('font-color') fontcolor: string;

  @Input() width: string;

  @Input() height: string;

  @Input('c-class') cclass: string;

  constructor() {
  }

  ngOnInit() {

  }


}
