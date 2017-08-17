/**
 * Created by ketangote on 8/16/17.
 */


import {
  Component, Input, OnInit
} from '@angular/core';


@Component({
  selector: 'amexio-datapoints',
  template: `
    <table width="100%"  [style.background-color]="backgroundColor" [style.color]="fontColor">
      <tr *ngIf="north">
        <td [attr.colspan]="colspan">
          <ng-content select="amexio-north"></ng-content>
        </td>
      </tr>
      <tr>
        <td *ngIf="west">
          <ng-content select="amexio-west"></ng-content>
        </td>
        <td *ngIf="center">
          <ng-content select="amexio-center"></ng-content>
        </td>
        <td *ngIf="east">
          <ng-content select="amexio-east"></ng-content>
        </td>
      </tr>
      <tr  *ngIf="south">
        <td [attr.colspan]="colspan">
          <ng-content select="amexio-south"></ng-content>
        </td>
      </tr>
    </table>


  `
})

export class DataPointsComponent implements OnInit {

  @Input() north : boolean;

  @Input() south : boolean;

  @Input() west : boolean;

  @Input() center : boolean;

  @Input() east : boolean;

  @Input() backgroundColor : string;

  @Input() fontColor : string;

  colspan : number;




  constructor(){
    this.colspan = 1;
  }

  ngOnInit(){


    if(this.west)
      this.colspan ++;

    if(this.east)
      this.colspan ++;


  }


}
