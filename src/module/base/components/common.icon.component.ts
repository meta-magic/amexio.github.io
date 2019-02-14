/*
* Copyright [2019] [Metamagic]
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
* Created by  Pratik on 21/12/17.
*/

import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { IconLoaderService } from './../../services/icon/icon.service';
@Component({
  selector: 'amexio-c-icon',
   template: `
   <ng-container *ngIf="iconLoaderService.iconToUse == 'fa'">

   <ng-container *ngIf="customclass != null">
     <span [ngStyle]="{'color':color}" class="{{customclass}}" aria-hidden="true"
     (click)="onClick.emit($event)">
     <ng-container *ngIf="label != ''">
     <span class="font-with-label" >
     {{label}}</span>
     </ng-container>
     </span>
   </ng-container>
   <ng-container *ngIf="customclass == null">
     <span [ngStyle]="{'color':color}" class="{{iconClass}}" aria-hidden="true"
     (click)="onClick.emit($event)">
     <ng-container *ngIf="label != ''">
     <span class="font-with-label">
     {{label}}
     </span>
     </ng-container>
     </span>
   </ng-container>

 </ng-container>

 <ng-container *ngIf="iconLoaderService.iconToUse == 'mat'">

   <ng-container *ngIf="customclass != null">
     <i [ngStyle]="{'color':color}" class="material-icons"
     (click)="onClick.emit($event)">{{customclass}}</i>
<ng-container *ngIf="label != ''">
     <span class="font-with-label"> {{label}}</span>
</ng-container>
   </ng-container>

   <ng-container *ngIf="customclass == null">
     <i [ngStyle]="{'color':color}" class="material-icons"
     (click)="onClick.emit($event)">{{iconClass}}</i>
     <ng-container *ngIf="label != ''">
     <span class="font-with-label"> {{label}}</span>
     </ng-container>
   </ng-container>


 </ng-container>
  `,
  styles : [`
  .fa-2x,.fa-3x, .fa-4x, .fa-5x {
    margin-top:0px!important;
  }

  `],
})

export class CommonIconComponent implements OnInit, OnChanges {

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
Properties
name : label
datatype : string
version : 5.5.5 onwards
default : none
description : sets the key for icon
*/
@Input() label = '';
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

  iconClass: string;

  @Input() color: string;

  @Input() faiconcolor = '';

  constructor(public iconLoaderService: IconLoaderService) {
  }
  ngOnInit() {
    this.iconClass = this.getIconClass();
  }
  getIconClass(): string {
    if (this.iconLoaderService.iconMappings != null) {
      const iconObject = this.iconLoaderService.iconMappings.find(
        (obj: any) => obj.component === this.key);
      if (iconObject != null) {
        return iconObject[this.iconLoaderService.iconToUse.toString()];
       } else {
        return '';
       }
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['key']) {
      this.key = changes.key.currentValue;
      this.iconClass = this.getIconClass();
    }
  }
}
