/**
 * Created by pratik on 13/12/17.
 */
import {AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList} from '@angular/core';
import {AmexioButtonDropDownItemComponent} from "./button.dropdown.item";

@Component({
  selector: 'amexio-btn-split-dropdown',
  template: `
    <div class="dropdown-button" [ngStyle]="getBackgroundColor()">
      <button class="button"  [attr.disabled] = "disabled ? true: null"
              [ngClass]="{'button-default': size=='default' || size ==null,'button-small': size=='small','button-large' : size=='large','button-primary' : type == 'primary' || type == null,'button-success' : type == 'success',' button-danger' : type=='danger','button-warning' : type=='warning'}">{{label}}</button>
      <button class="button" [ngClass]="{'button-default': size=='default' || size ==null,'button-small': size=='small','button-large' : size=='large','button-primary' : type == 'primary' || type == null,'button-success' : type == 'success',' button-danger' : type=='danger','button-warning' : type=='warning'}" (click)="onClick()"><i class="fa fa-chevron-down" aria-hidden="true"></i></button>
      <div class="dropdown-button-content" [ngStyle]="{'display' : openContent ? 'block' : 'none'}">
        <ul class="dropdown-list">
          <ng-container *ngFor="let itemData of dropdownItemData">
            <li class="list-items" [ngClass]="{'disabled':itemData.disabled}" (click)="itemClick($event,itemData)">{{itemData.label}}  <ng-container *ngIf="itemData.icon!=null">
              <!--<i [class]="itemData.iconStyleClass" aria-hidden="true"></i>-->
              <amexio-form-icon style="float:right;" [customclass]="itemData.iconStyleClass"></amexio-form-icon>
            </ng-container></li>
          </ng-container>
        </ul>
      </div>
    </div>

  `
})

export class AmexioSpiltButtonDropdownComponent implements AfterContentInit {

  @Input()    label : string;

  openContent : boolean;

  @ContentChildren(AmexioButtonDropDownItemComponent)     buttons : QueryList<AmexioButtonDropDownItemComponent>;

  dropdownItemData: any[] = [];

  @Input()    type: string;

  @Input()    disabled: boolean;

  @Input()    size: string;


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
  }

  itemClick(event: any, itemData: any) {
    itemData.onItemClick.emit(event);
  }
  getBackgroundColor(){
    let colorCode : string;
    if(this.type == 'primary')
      colorCode = '#0275d8';
    else if(this.type == 'success')
      colorCode = '#5cb85c';
    else if(this.type == 'danger')
      colorCode = '#d9534f';
    else if(this.type == 'warning')
      colorCode = '#f0ad4e';
    return {
      'background-color' : colorCode
    }
  }

}
