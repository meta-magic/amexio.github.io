import { Component, ContentChild, Input, OnInit } from '@angular/core';
import {AmexioNavBarComponent} from '../../../navigation/navbar/navbar.component';

@Component({
  selector: 'amexio-viewport-content-body',
  templateUrl: './viewport.content.body.component.html',
})
export class ViewportContentBodyComponent implements OnInit {

  @ContentChild(AmexioNavBarComponent) navTemplate: AmexioNavBarComponent;

  @Input('scrollable') scrollable = false;

  navbarOpacity: boolean;

  constructor() { }

  ngOnInit() { }

}
