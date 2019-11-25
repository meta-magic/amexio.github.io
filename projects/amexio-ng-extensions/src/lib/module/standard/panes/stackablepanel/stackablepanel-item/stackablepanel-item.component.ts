import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'amexio-stackablepanel-item',
  templateUrl: './stackablepanel-item.component.html',
})
export class StackableItemComponent {

  @Input() open = false;

  @Input() title: string;

  @Output() toggle: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}
}
