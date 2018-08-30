
import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'amexio-accordion-header', template: `
    <ng-content></ng-content>
  `,
})

export class AmexioAccordionHeaderComponent implements OnInit {

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
