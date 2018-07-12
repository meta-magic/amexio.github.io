/**
 * Created by pratik on 21/12/17.
 */
 /*
 Component Name : Amexio Icon
 Component Selector :  <amexio-form-icon>
 Component Description :
*/
import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {IconLoaderService} from '../../services/icon/icon.service';
@Component({
  selector: 'amexio-form-icon',
   template: `
    <ng-container *ngIf="iconLoaderService.iconToUse == 'fa' ">
      <ng-container *ngIf="customclass != null">
        <i class="{{customclass}}" aria-hidden="true" (click)="onClick.emit($event)"></i>
      </ng-container>
      <ng-container *ngIf="customclass == null">
        <i class="{{getIconClass()}}" aria-hidden="true" (click)="onClick.emit($event)"></i>
      </ng-container>
    </ng-container>
    <ng-container *ngIf="iconLoaderService.iconToUse == 'mat'">
      <ng-container *ngIf="customclass != null">
        <i class="material-icons" (click)="onClick.emit($event)">{{customclass}}</i>
      </ng-container>
      <ng-container *ngIf="customclass == null">
        <i class="material-icons" (click)="onClick.emit($event)">{{getIconClass()}}</i>
      </ng-container>
    </ng-container>
  `,
})

export class AmexioFormIconComponent implements OnInit {
/*
Properties
name : key
datatype : string
version : 4.0 onwards
default : none
description : sets the key for icon
*/
  @Input() key: string;
/*
Events
name : onClick
datatype : any
version : none
default : none
description : Event is fired when button is click
*/
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();
/*
Properties
name : customclass
datatype : string
version : 4.0 onwards
default : none
description : sets the customclass for icon
*/
  @Input() customclass: string;
  constructor(public iconLoaderService: IconLoaderService) {
  }
  ngOnInit() {
  }
  getIconClass(): string {
    if (this.iconLoaderService.iconMappings != null) {
      let iconObject = this.iconLoaderService.iconMappings.find(
        (obj: any) => obj.component === this.key);
      if (iconObject != null) {
        return iconObject[this.iconLoaderService.iconToUse.toString()];
       } else {
        return '';
       }
    }
  }
}
