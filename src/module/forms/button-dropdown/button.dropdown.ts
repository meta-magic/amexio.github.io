/**
 * Created by pratik on 13/12/17.
 */
/*
 Component Name : Amexio Button Dropdown
 Component Selector : <amexio-btn-dropdown>
 Component Description : Amexio Dropdown Button component with various modes and configurations .
*/
import {
  AfterContentInit, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, Input,
  Output, QueryList, Renderer2, ViewChild,
} from '@angular/core';
import {BaseFormValidator} from '../../base/base.validator.component';
import {AmexioButtonDropDownItemComponent} from './button.dropdown.item';

@Component({
  selector: 'amexio-btn-dropdown', template: `
    <div class="button-group" #rootDiv>
       <button class="button-dropdown-main" (blur)="onblur($event)" (click)="onClick(rootDiv)" #btnRef
               [ngClass]="{'button-default': size=='default' || size ==null,
               'button-small': size=='small',
               'button-large' : size=='large',
               'button-primary' : type == 'primary' || type == null || type == 'theme-color',
               'button-success' : type == 'success' || type == 'green',
               'button-danger' : type=='danger' || type == 'red',
               'button-warning' : type=='warning' ||  type == 'yellow'}">
         <amexio-form-icon style="float:right;" key="button_caret-down"></amexio-form-icon>
         <span [attr.disabled]="disabled ? true: null">{{label}} &nbsp;&nbsp;</span>
         <!--<i class="fa fa-caret-down" style="float:right;" ></i>-->
       </button>
      <div class="button-dropdown" [ngClass]="{'button-dropdown-up' : posixUp}"  [ngStyle]="dropdownstyle">
        <ng-container *ngFor="let itemData of dropdownItemData">
          <div [ngClass]="{'button-default': size=='default' || size ==null,'button-small': size=='small','button-large' : size=='large'}">
            <div [ngStyle]="{'cursor': itemData.disabled ? 'not-allowed':'pointer'}"
                 (click)="btnItemClick($event,itemData)">
              <amexio-form-icon style="padding-right: 5px;" [customclass]="itemData.iconStyleClass"></amexio-form-icon>
              <span [attr.disabled]="itemData.disabled ? true: null">{{itemData.label}}&nbsp;&nbsp;</span>
              <!--<i [class]="itemData.iconStyleClass" aria-hidden="true" style="float:right;" ></i>-->
              <ng-container *ngIf="itemData.badge">
              <span class="btn-dropdown-badge">{{itemData.badge}}</span>
              </ng-container>
            </div>
          </div>
        </ng-container>
      </div>
    </div>
  `,
})

export class AmexioButtonDropdownComponent extends BaseFormValidator<any> implements AfterContentInit {
  @ViewChild('btnRef')  btnReference: any;
  private componentLoaded: boolean;
/*
Properties
name : label
datatype : string
version : 4.0 onwards
default : none
description : Label on button
*/
  @Input() label: string;
  openContent: boolean;
  posixUp: boolean;
  @ContentChildren(AmexioButtonDropDownItemComponent) buttons: QueryList<AmexioButtonDropDownItemComponent>;
  dropdownItemData: any[] = [];
/*
 For internal use
*/

  _buttonGroupLocalData: any;
  @Input('buttonGroupLocalData')
   set data(value: any[]) {
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
name : type
datatype : string
version : 4.0 onwards
default : none
description : Type of button : default,theme-color,theme-backgroundcolor,
green, red, yellow ( primary, secondary ,success , danger & warning Depricated v4.1 onwards)
*/
  @Input() type: string;
   /*
Properties
name : disabled
datatype : boolean
version : 4.0 onwards
default : false
description : Enable/Disables the button
*/
  @Input() disabled: boolean;
 /*
Properties
name : size
datatype :  string
version : 4.0 onwards
default : none
description : Different Sizes of Buttons availabe : large, default, small & xsmall
*/
  @Input() size: string;
/*
Properties
name :  badge
datatype : number
version : 4.1.9 onwards
default : none
description : Badge  describes the badge value that has to be displayed on button
*/
@Input('badge') badge: number;
/*
Events
name : click
datatype :  none
version : none
default : none
description : Fire when button-dropdown item button/link click
*/
  @Output() click: any = new EventEmitter<any>();
   /*
Events
name : getLinkData
datatype :  none
version : none
default : none
description : Fire when button-dropdown item button/link click
*/
  @Output() getLinkData: any = new EventEmitter<any>();
  buttonGroupPreviewData: any;
  constructor(
    public element: ElementRef, renderer: Renderer2, _cd: ChangeDetectorRef,
  ) {
    super(renderer, element, _cd);
  }
  updateComponent() {
    if (JSON.stringify(this.buttonGroupPreviewData) !== JSON.stringify(this.buttonGroupLocalData)) {
      this.buttonGroupPreviewData = JSON.parse(JSON.stringify(this.buttonGroupLocalData));
      this.dropdownItemData = this.buttonGroupLocalData;
    }
  }
  ngAfterContentInit() {
    if (this.buttonGroupLocalData && this.buttonGroupLocalData.length > 0 ) {
      this.buttonGroupPreviewData = JSON.parse(JSON.stringify(this.buttonGroupLocalData));
      this.dropdownItemData = this.buttonGroupLocalData;
      this.createDropdownItemConfig(this.dropdownItemData);
    } else {
      this.createDropdownItemConfig(this.buttons.toArray());
    }
    this.componentLoaded = true;
  }
  createDropdownItemConfig(btnCollection: any) {
    const itemRefArray = btnCollection;
    for (const itemConfig of itemRefArray) {
      const data: any = {
        label: itemConfig.label,
        disabled: itemConfig.disabled,
        onItemClick: itemConfig.onItemClick,
        iconStyleClass: itemConfig.iconStyleClass,
        icon: itemConfig.icon,
        badge: itemConfig.badge,
        onClickRoute: itemConfig.onClickRoute,
      };
      data.iconStyleClass = data.icon;
      this.dropdownItemData.push(data);
    }
  }
  onClick(elem: any) {
    this.openContent = !this.openContent;
    if (this.openContent) {
      this.onBaseFocusEvent({});
    } else {
     this.openContent = this.onBaseBlurEvent(elem);
    }
    this.posixUp = this.getListPosition(elem);
    this.click.emit();
  }
  getListPosition(elementRef: any): boolean {
    const dropdownHeight = 325; // must be same in dropdown.scss
    if (window.screen.height - (elementRef.getBoundingClientRect().bottom) < dropdownHeight) {
      return true;
    } else {
      return false;
    }
  }

  onblur(eve: any) {
    this.openContent = this.onBaseBlurEvent(eve);
  }

  btnItemClick(clickEvent: any, itemData: any) {
    if (this.buttonGroupLocalData && this.buttonGroupLocalData.length > 0) {
      this.getLinkData.emit({event: clickEvent, parentRef: this, data: itemData});
    } else {
      if (!itemData.disabled) {
        itemData.onItemClick.emit(clickEvent);
        this.openContent = !this.openContent;
        this.onBaseBlurEvent(event);
      }
    }
  }
}
