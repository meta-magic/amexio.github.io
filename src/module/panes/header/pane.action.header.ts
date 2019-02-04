/**
 * Created by pratik on 18/12/17.
 */
import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'amexio-header', template: `
  <ng-content></ng-content>
  `,
})

export class AmexioHeaderComponent implements OnInit {
 /*
Properties
name :padding
datatype : string
version : 4.2 onwards
default : left
description : padding for header.
*/
  @Input() padding: string;

  constructor() {
  }

  ngOnInit() {
  }
}
