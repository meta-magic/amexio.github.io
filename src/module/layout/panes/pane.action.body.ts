/**
 * Created by pratik on 18/12/17.
 */
import { Component, OnInit } from '@angular/core';

@Component({
 selector: 'amexio-pane-body',
 template: '<ng-content></ng-content>'
})

export class AmexioWindowBodyComponent implements OnInit {
 constructor() { }

 ngOnInit() { }
}
