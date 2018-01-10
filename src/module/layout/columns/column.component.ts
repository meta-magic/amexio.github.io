/**
 * Created by pratik on 8/1/18.
 */
import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
 selector: 'amexio-column',
 templateUrl: 'column.component.html',
 host: {
    '[attr.fxflex]': 'percentage',
    '[attr.style]': 'sty',
  }
})

export class AmexioColumnComponent implements OnInit {

  @Input() size : number;

  percentage : string;

  sty : any;

  constructor(public sanitizer : DomSanitizer) {}

  ngOnInit(){
    this.percentage = COLUMNS_SIZE_MAPS.DEFAULT[this.size];
    let computedStyle = "padding:5px;box-sizing: border-box;flex: 1 1 100%;max-width : "+this.percentage+"%";
    this.sty = this.sanitizer.bypassSecurityTrustStyle(computedStyle);
  }

}



export namespace COLUMNS_SIZE_MAPS{
  export const DEFAULT = {
    1 : 8.3,
    2 : 16.7,
    3 : 25,
    4 : 33.3,
    5 : 41.6,
    6 : 50,
    7 : 58.3,
    8 : 66.8,
    9 : 75,
    10 : 83.3,
    11 : 91.6,
    12 : 100
  }
}
