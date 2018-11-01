import { AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList, ViewChild } from '@angular/core';
import { AmexioGridItemComponent } from './griditem.component';

@Component({
  selector: 'amexio-grid-component',
  templateUrl: './grid.component.html',
})
export class AmexioGridComponent implements AfterContentInit, OnInit {
  @ContentChildren(AmexioGridItemComponent) queryItem: QueryList<AmexioGridItemComponent>;
  itemCollection: AmexioGridItemComponent[];
  /*
 Properties
 name : data
 datatype : array
 version : 5.3.1onwards
 default : Data is the a 2D array which user can pass.
 description : The data is for defining the input to be passed.
 */
  @Input('data') data: any[];
  containerClass: string;
  constructor() {
  }
  ngOnInit() {
    this.containerClass = '';
    this.data.forEach((element: any) => {
      this.containerClass = this.containerClass + '"' + element.join(' ') + '"';
    });
  }
  ngAfterContentInit() {
    this.itemCollection = this.queryItem.toArray();
  }
}
