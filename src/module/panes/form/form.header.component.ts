
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'amexio-form-header', template: `
    <ng-content></ng-content>
  `
})

export class AmexioFormHeaderComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }
}
