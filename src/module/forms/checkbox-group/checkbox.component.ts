import { Component, Host, Input, OnInit } from '@angular/core';
import { AmexioCheckBoxGroupComponent } from './checkbox.group.component';
@Component({
  selector: 'checkbox',
  templateUrl: './checkbox.component.html',
})
export class CheckboxComponent implements OnInit {
  @Input() label: any;

  @Input() value: any;

  @Input() name: any;

  @Input() checked: boolean;

  @Input() disabled: boolean;

  componentId: string;
  constructor(@Host() private checkboxGroup: AmexioCheckBoxGroupComponent) {}

  toggleCheck() {
    if (!this.checked) {
      this.checkboxGroup.add(this.value);
    } else {
      this.checkboxGroup.remove(this.value);
    }
    this.checked = !this.checked;
  }

  isChecked() {
    return this.checked || this.checkboxGroup.contains(this.value);
  }

  ngOnInit() {
    this.componentId = Math.random() * 1000 + 'chkboxgrp';
    setTimeout(() => {
      if (this.checked) {
       this.checkboxGroup.add(this.value);
      }
    }, 200);
  }
}
