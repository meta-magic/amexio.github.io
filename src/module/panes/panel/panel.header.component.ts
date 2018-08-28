
import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: 'amexio-panel-header', template: `
    <ng-content></ng-content>
  `,
})

export class AmexioPanelHeaderComponent implements OnInit {

  @HostBinding('attr.class') role = 'amexio-panel-header';

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
