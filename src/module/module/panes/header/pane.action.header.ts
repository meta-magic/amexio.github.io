/**
 * Created by pratik on 18/12/17.
 */
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'amexio-header', template: `
    <ng-content></ng-content>
  `
})

export class AmexioHeaderComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }
}
