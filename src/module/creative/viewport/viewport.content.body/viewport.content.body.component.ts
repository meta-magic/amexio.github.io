import { Component, ContentChild, Input, OnInit } from '@angular/core';
import {AmexioNavBarComponent} from '../../../standard/navigation/navbar/navbar.component';

@Component({
  selector: 'amexio-viewport-content-body',
  templateUrl: './viewport.content.body.component.html',
})
export class ViewportContentBodyComponent implements OnInit {

  @ContentChild(AmexioNavBarComponent) navTemplate: AmexioNavBarComponent;

  @Input('scrollable') scrollable = false;

  navbarOpacity: boolean;
  roundedgeclass: string;
  constructor() { }

  ngOnInit() { }

  setRoundEdge(type: any) {
    if (type === 'round-edge') {
    this.roundedgeclass = 'roundEdgeCommonCss';
    } else {
      this.roundedgeclass = 'classicCommonCss';
    }
  }
}
