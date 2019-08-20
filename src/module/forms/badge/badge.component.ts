import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'amexio-badge',
  templateUrl: './badge.component.html',
})
export class AmexioBadgeComponent implements OnInit {

  @Input('absolute') absolute: boolean;

  @Input('background') background: string;

  @Input('color') color: string;

  @Input('top') top: string;

  @Input('left') left: string;

  @Input('right') right: string;

  @Input('bottom') bottom: string;

  @Input('orientation') orientation = 'vertical';

  @Input('height') height: string;

  @Input('width') width: string;

  cClass = '';

  roundedgeclass: string;
  constructor() {
  }

  ngOnInit() {
    if (!this.color && !this.background) {
      this.cClass = 'amexio-badge-color';
    }
  }

  setRoundEdge(type: any) {
    if (type === 'round-edge') {
      this.roundedgeclass = 'roundEdgeCommonCss';
    } else if (type === 'classic') {
      this.roundedgeclass = 'classicCommonCss';
    }
  }
}
