import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'amexio-stackablepanel-item',
  templateUrl: './stackablePanel-item.component.html',
  styleUrls: ['./stackablePanel-item.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class StackableItemComponent {

  @Input() opened = false;

  @Input() title: string;

  @Output() toggle: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}
}
