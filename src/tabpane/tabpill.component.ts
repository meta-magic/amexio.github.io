import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'amexio-tab',
  template: `
    <div [ngClass]="cClass" role="tabpanel" class="tab-pane active" [attr.id]="elementId">
      <ng-content *ngIf="active"></ng-content>
    </div>
  `
})
export class TabComponent implements OnInit {

  @Input()  title: string;

  @Input()  active = false;

  @Input()  disabled = false;

  @Input()  icon: string;

  elementId: string;

  @Input() cClass:string;

  constructor() {
    this.elementId = 'tab-pill' + Math.floor(Math.random() * 90000) + 10000;
  }

  ngOnInit() {
  }
}
