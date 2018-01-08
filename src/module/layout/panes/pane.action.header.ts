/**
 * Created by pratik on 18/12/17.
 */
import { Component, OnInit } from '@angular/core';

@Component({
 selector: 'amexio-pane-header',
 template: `
  <ng-content></ng-content>
 `
})

export class AmexioWindowHeader implements OnInit {
 constructor() { }

 ngOnInit() { }
}
