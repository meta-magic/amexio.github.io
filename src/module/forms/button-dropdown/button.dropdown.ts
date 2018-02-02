/**
 * Created by pratik on 13/12/17.
 */
import {
  AfterContentInit, Component, ContentChildren, ElementRef, EventEmitter, HostListener, Input, OnInit, Output,
  QueryList, ViewChild, ViewContainerRef
} from '@angular/core';
import {AmexioButtonDropDownItemComponent} from "./button.dropdown.item";

@Component({
  selector: 'amexio-btn-dropdown', template: `

    <div class="button-group" #rootDiv>
       <button class="button-dropdown-main" (click)="onClick()" #btnRef
               [ngClass]="{'button-default': size=='default' || size ==null,'button-small': size=='small','button-large' : size=='large','button-primary' : type == 'primary' || type == null,'button-success' : type == 'success',' button-danger' : type=='danger','button-warning' : type=='warning'}">

         <amexio-form-icon style="float:right;" key="button_caret-down"></amexio-form-icon>

         <span [attr.disabled]="disabled ? true: null">{{label}} &nbsp;&nbsp;</span>
         <!--<i class="fa fa-caret-down" style="float:right;" ></i>-->

       </button>
      <div class="button-dropdown" [ngClass]="{'button-dropdown-up' : posixUp}"  [ngStyle]="{'display' : openContent ? 'block' : 'none'}">
        <ng-container *ngFor="let itemData of dropdownItemData">
          <div [ngClass]="{'button-default': size=='default' || size ==null,'button-small': size=='small','button-large' : size=='large'}">
            <div [ngStyle]="{'cursor': itemData.disabled ? 'not-allowed':'pointer'}"
                 (click)="itemClick($event,itemData)">
              <amexio-form-icon style="padding-right: 5px;" [customclass]="itemData.iconStyleClass"></amexio-form-icon>
              <span [attr.disabled]="itemData.disabled ? true: null">{{itemData.label}}&nbsp;&nbsp;</span>
              <!--<i [class]="itemData.iconStyleClass" aria-hidden="true" style="float:right;" ></i>-->
            </div>
          </div>

        </ng-container>
      </div>

    </div>
    
  `,
})

export class AmexioButtonDropdownComponent implements AfterContentInit {

  @ViewChild('btnRef')  btnReference: any;

  @Input() label: string;

  openContent: boolean;

  posixUp : boolean;

  @ContentChildren(AmexioButtonDropDownItemComponent) buttons: QueryList<AmexioButtonDropDownItemComponent>;

  dropdownItemData: any[] = [];

  @Input() type: string;

  @Input() disabled: boolean;

  @Input() size: string;

  @Output() click: any = new EventEmitter<any>();

  constructor(public element: ElementRef) {
  }

  ngAfterContentInit() {
    this.createDropdownItemConfig();
  }

  createDropdownItemConfig() {
    let itemRefArray = [];
    itemRefArray = this.buttons.toArray();
    for (let cr = 0; cr < itemRefArray.length; cr++) {
      const itemConfig = itemRefArray[cr];
      const data: any = {
        label: itemConfig.label,
        disabled: itemConfig.disabled,
        onItemClick: itemConfig.onItemClick,
        iconStyleClass: itemConfig.iconStyleClass,
        icon: itemConfig.icon,
        onClickRoute: itemConfig.onClickRoute
      };
      data.iconStyleClass = data.icon;
      this.dropdownItemData.push(data);
    }
  }

  onClick(elem : any) {
    this.openContent = !this.openContent;
    this.posixUp = this.getListPosition(elem);
    this.click.emit();
  }

  getListPosition(elementRef : any) :boolean{
    let dropdownHeight : number = 325; //must be same in dropdown.scss
    if(window.screen.height - (elementRef.getBoundingClientRect().bottom) < dropdownHeight){
      return true;
      //  return false;
    }
    else{
      return false;
    }
  }

  itemClick(event: any, itemData: any) {
    if (!itemData.disabled) {
      itemData.onItemClick.emit(event);
      this.openContent = !this.openContent;
    }

  }

  @HostListener('document:click', ['$event.target']) @HostListener('document: touchstart', ['$event.target'])
  public onElementOutClick(targetElement: HTMLElement) {
    let parentFound = false;
    while (targetElement != null && !parentFound) {
      if (targetElement === this.btnReference.nativeElement) {
        parentFound = true;
      }
      targetElement = targetElement.parentElement;
    }
    if (!parentFound) {
      this.openContent = false;
    }
  }
}
