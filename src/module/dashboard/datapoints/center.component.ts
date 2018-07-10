/**
 * Created by ketangote on 7/25/17.
 */

/*
 Component Name : Amexio center datapoints
 Component Selector : <amexio-center>
 Component Description : Represent the summary of the data in bullet point format.
*/
import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'amexio-center', template: `

    <div [ngClass]="cclass" [attr.align]="contentalign" [style.background-color]="backgroundcolor"
         [style.color]="fontcolor" [style.width]="width" [style.height]="height">
      <ng-content></ng-content>
    </div>`,
})

export class DataPointCenterComponent implements OnInit {

  /*
Properties
name : content-align
datatype :  string
version : 4.0 onwards
default : none
description :  Set content align like : center,left,right
*/
  @Input('content-align') contentalign: string;

  /*
Properties
name : background-color
datatype :  string
version : 4.0 onwards
default : none
description : Set background color
*/
  @Input('background-color') backgroundcolor: string;

  /*
Properties
name : font-color
datatype :  string
version : 4.0 onwards
default : none
description : Set font color
*/
  @Input('font-color') fontcolor: string;

  /*
Properties
name : width
datatype :  string
version : 4.0 onwards
default : none
description : 	Set width
*/
  @Input() width: string;

  /*
Properties
name : height
datatype :  string
version : 4.0 onwards
default : none
description : Set height
*/
  @Input() height: string;

  /*
Properties
name : c-class
datatype :  string
version : 4.0 onwards
default : none
description : To use custom css class
*/
  @Input('c-class') cclass: string;

  constructor() {
  }

  ngOnInit() {

  }

}
