
/*
 Component Name : Amexio Button Group
 Component Selector : <amexio-btn-group>
 Component Description : Amexio Button groups are containers for related action amexio-button.

*/
import {
  AfterContentInit, Component, ContentChildren, EventEmitter, Input, OnChanges, Output,
  QueryList, SimpleChanges,
} from '@angular/core';
import { AmexioButtonComponent } from '../buttons/button.component';
@Component({
  selector: 'amexio-btn-group',
  templateUrl: './button.group.component.html',
})
export class AmexioButtonGroupComponent implements AfterContentInit, OnChanges {
  private componentLoaded: boolean;
  /*
 Properties
 name : size
 datatype :  string
 version : 4.0 onwards
 default :
 description : Different Sizes of Buttons availabe : large, default, small & xsmall
 */
  @Input() size: string;
  /* for internal use*/

  _buttonGroupLocalData: any = [];
  @Input('buttonGroupLocalData')
   set buttonGroupLocalData(value: any) {
     this._buttonGroupLocalData = value;
     if (this.componentLoaded) {
       this.updateComponent();
     }
   }
   get buttonGroupLocalData(): any {
     return this._buttonGroupLocalData;
   }
  /*
  Properties
  name :  badge
  datatype : number
  version : 4.1.9 onwards
  default :
  description : Badge  describes the badge value that has to be displayed on button
  */
  @Input('badge') badge: number;
  /*
  Events
  name : getButton
  datatype :  none
  version : none
  default : none
  description : Fire when button click
  */
  buttonGroupPreviewData: any;
  previousData: any;
  @Output() getButton: any = new EventEmitter<any>();
  @ContentChildren(AmexioButtonComponent) btns: QueryList<AmexioButtonComponent>;
  buttons: AmexioButtonComponent[] = [];

  constructor() {
  }
  updateComponent() {
    if (JSON.stringify(this.buttonGroupPreviewData) !== JSON.stringify(this.buttonGroupLocalData)) {
      this.buttonGroupPreviewData = JSON.parse(JSON.stringify(this.buttonGroupLocalData));
      this.buttons = this.buttonGroupLocalData;
      this.setButtonSizes(this.buttons);
    }
  }
  ngOnChanges(change: SimpleChanges) {
    if (change.size && !change.size.isFirstChange()) {
      this.updateButtonSizes(change.size);
    }
  }
  buttonGroupClick(clickEvent: any, btnObj: any) {
    if (this.buttonGroupLocalData || this.buttonGroupLocalData.length > 0) {
      this.getButton.emit({ event: clickEvent, buttonObject: btnObj });
    } else {
      btnObj.onClick.emit(clickEvent);
    }
  }
  ngAfterContentInit() {
    if (this.buttonGroupLocalData && this.buttonGroupLocalData.length > 0) {
      this.buttonGroupPreviewData = JSON.parse(JSON.stringify(this.buttonGroupLocalData));
      this.buttons = this.buttonGroupLocalData;
    } else {
      this.buttons = this.btns.toArray();
    }
    this.setButtonSizes(this.buttons);
    this.componentLoaded = true;
  }
  setButtonSizes(btnArray: any) {
    if (btnArray.length > 0) {
      btnArray.forEach((btn: any) => {
        btn.size = this.size;
      });
    }
  }

  badgeClass(): string {
    let className = '';
    for (const button of this.buttons) {
      switch (button.type) {
        case 'primary': {
          return 'btn-group-primary-badge';
        }
        case 'theme-color': {
          return 'btn-group-primary-badge';
        }
        case 'secondary': {
          return 'btn-group-secondary-badge';
        }
        case 'theme-backgroundcolor': {
          return 'btn-group-secondary-badge';
        }
        case 'success': {
          return 'btn-group-success-badge';
        }
        case 'green': {
          return 'btn-group-success-badge';
        }
      }

      className = this.badgeMoreClass(button);
    }
    return className;
  }

  badgeMoreClass(button: any): string {
    let className = '';
    if (button.type === 'danger' || button.type === 'red') {
      className = 'btn-group-danger-badge';
    }
    if (button.type === 'warning' || button.type === 'yellow') {
      className = 'btn-group-warning-badge';
    }
    if (button.type === 'transparent') {
      className = 'btn-group-transparent-badge';
    }
    return className;
  }
  updateButtonSizes(size: any) {
    this.buttons.forEach((btn: any) => {
      btn.size = size;
    });
  }
}
