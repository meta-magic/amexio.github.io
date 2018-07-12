/**
 * Created by ketangote on 1/4/18.
 */
/*
Component Name : Amexio BorderLayout
Component Selector : <amexio-borderlayout-item>
Component Description : Amexio border layout lays out a container,
                       arranging and resizing its components to fit in five regions:
                        north, south, east, west, and center.

*/
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'amexio-borderlayout-item',
  templateUrl: './borderlayoutitem.component.html',
  host: {
    '[class]': 'positionClass',
  },
})
export class AmexioBorderLayoutItemComponent implements OnInit {

  /*
Properties
name : position
datatype : string
version : 4.0 onwards
default :
description : Layout the contents to North , East , West , Center & South positions
*/
  @Input() position: string;
  positionClass: string = 'borderlayout-';
  constructor() {
  }
  ngOnInit() {
  }

  getClassType() {
    let pos = '';
    if (this.position.toLowerCase() === 'north') {
      pos = 'N';
    } else if (this.position.toLowerCase() === 'east') {
      pos = 'E';
    } else if (this.position.toLowerCase() === 'center') {
      pos = 'C';
    } else if (this.position.toLowerCase() === 'west') {
      pos = 'W';
    } else if (this.position.toLowerCase() === 'south') {
      pos = 'S';
    }

    this.positionClass = this.positionClass + pos;

    return pos;
  }
}
