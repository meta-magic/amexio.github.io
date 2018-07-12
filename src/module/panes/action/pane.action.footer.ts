/**
 * Created by pratik on 18/12/17.
 */

import {Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'amexio-action', template: '<ng-content></ng-content>',
})

export class AmexioFooterComponent implements OnInit {
 /*
Properties
name :padding
datatype : string
version : 4.2 onwards
default : left
description : padding for footer.
*/
  @Input() padding: string;

  constructor() {
  }

  ngOnInit() {
  }
}
