/**
 * Created by pratik on 8/1/18.
 */

 /*
 Component Name : Amexio Column
 Component Selector : <amexio-column>
 Component Description : Amexio column system allows up to 12 columns across the page.
*/

import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'amexio-column', templateUrl: 'column.component.html', host: {
    '[class]': 'colclass',
  },
})

export class AmexioColumnComponent implements OnInit {
  size_: string;

  colclass: string;

  constructor() {

  }
/*
Properties
name : size
datatype : any
version : 4.0 onwards
default :
description : Column size*/
  @Input()
  set size(value: any) {
    this.size_ = value;
    this.colclass = 'flex-col flex-col-' + value;
  }

  get size() {
    return this.size_;
  }

  ngOnInit() {

  }
}
