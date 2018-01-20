/**
 * Created by ketangote on 11/23/17.
 */
import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'amexio-button', templateUrl: './button.component.html', styleUrls: ['./button.component.scss']
})
export class AmexioButtonComponent {

  @Input() label: string;

  @Input() icon: string;

  @Input() type: string;

  @Input() tooltip: string;

  @Input() disabled: boolean;

  @Input() size: string;

  @Output() onClick: any = new EventEmitter<any>();


  constructor() {

  }

  buttonClick(event: any) {
    if (!this.disabled) {
      this.onClick.emit(event);
    }
  }


}
