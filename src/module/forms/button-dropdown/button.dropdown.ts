/**
 * Created by pratik on 13/12/17.
 */
import {
  AfterContentInit, Component, ContentChildren, EventEmitter, Input, OnInit, Output,
  QueryList
} from '@angular/core';
import {AmexioButtonDropDownItemComponent} from "./button.dropdown.item";

@Component({
  selector: 'amexio-btn-dropdown',
  template: `

    <div class="button-group">

      <button  (click)="onClick()" [ngClass]="{'button-default': size=='default' || size ==null,'button-small': size=='small','button-large' : size=='large','button-primary' : type == 'primary' || type == null,'button-success' : type == 'success',' button-danger' : type=='danger','button-warning' : type=='warning'}" >
        <span [attr.disabled] = "disabled ? true: null">{{label}} &nbsp;&nbsp;</span>
        <!--<i class="fa fa-caret-down" style="float:right;" ></i>-->
        <amexio-form-icon style="float:right;" key="button_caret-down"></amexio-form-icon>
      </button>

      <div style="position: absolute;" [ngStyle]="{'display' : openContent ? 'block' : 'none'}">
        <ng-container *ngFor="let itemData of dropdownItemData">
          <div>
            <button [ngStyle]="{'cursor': itemData.disabled ? 'not-allowed':'pointer'}" (click)="itemClick($event,itemData)" [ngClass]="{'button-default': size=='default' || size ==null,'button-small': size=='small','button-large' : size=='large','button-primary' : type == 'primary' || type == null,'button-success' : type == 'success',' button-danger' : type=='danger','button-warning' : type=='warning'}" >
              <span [attr.disabled] = "itemData.disabled ? true: null">{{itemData.label}}&nbsp;&nbsp;</span>
              <!--<i [class]="itemData.iconStyleClass" aria-hidden="true" style="float:right;" ></i>-->
              <amexio-form-icon style="float:right;" [customclass]="itemData.iconStyleClass"></amexio-form-icon>
            </button>

          </div>

        </ng-container>
      </div>

    </div>
    
  `
})

export class AmexioButtonDropdownComponent implements AfterContentInit {

  @Input()    label : string;

  openContent : boolean;

  @ContentChildren(AmexioButtonDropDownItemComponent)     buttons : QueryList<AmexioButtonDropDownItemComponent>;

  dropdownItemData: any[] = [];

  @Input()    type: string;

  @Input()    disabled: boolean;

  @Input()    size: string;

  @Output()   click : any = new EventEmitter<any>();


  constructor() {
  }

  ngAfterContentInit() {
    this.createDropdownItemConfig();
  }

  createDropdownItemConfig() {
    let itemRefArray  = [];
    itemRefArray = this.buttons.toArray();
    for (let cr = 0 ; cr < itemRefArray.length; cr++) {
      const itemConfig = itemRefArray[cr];
      const data: any = {label : itemConfig.label, disabled: itemConfig.disabled, onItemClick : itemConfig.onItemClick, iconStyleClass: itemConfig.iconStyleClass, icon : itemConfig.icon, onClickRoute: itemConfig.onClickRoute};
      data.iconStyleClass = data.icon;
      this.dropdownItemData.push(data);
    }
  }

  onClick(){
    this.openContent = !this.openContent;
    this.click.emit();
  }

  itemClick(event: any, itemData: any) {
    if(!itemData.disabled) {
      itemData.onItemClick.emit(event);
      this.openContent = !this.openContent;
    }

  }
}
