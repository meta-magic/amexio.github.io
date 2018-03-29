/**
 * Created by pratik on 13/12/17.
 */


/*
 Component Name : Amexio Button Dropdown
 Component Selector : <amexio-btn-dropdown-item>
 Component Description : .

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
