/**
 * Created by pratik on 13/12/17.
 */
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'amexio-btn-dropdown-item', template: ''
})

export class AmexioButtonDropDownItemComponent implements OnInit {

  @Input() label: string;

  @Input() disabled: boolean;

  @Input() icon: string;

  @Input() onClickRoute: string;

  iconStyleClass: string;

  @Output() onItemClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }
}
