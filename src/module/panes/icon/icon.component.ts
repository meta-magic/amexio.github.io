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
* Created by pratik on 21/12/17..
*/

import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {IconLoaderService} from '../../services/icon/icon.service';

@Component({
  selector: 'amexio-pane-icon', template: `
    <ng-container *ngIf="iconLoaderService.iconToUse == 'fa'">
      <ng-container *ngIf="customclass != null">
        <i class="{{customclass}}" aria-hidden="true" (click)="onClick.emit($event)" style="cursor: pointer;"></i>
      </ng-container>
      <ng-container *ngIf="customclass == null">
        <i [ngClass]="iconClass" aria-hidden="true" (click)="onClick.emit($event)" style="cursor: pointer;"></i>
      </ng-container>
    </ng-container>

    <ng-container *ngIf="iconLoaderService.iconToUse == 'mat'">

      <ng-container *ngIf="customclass != null">
        <i class="material-icons" (click)="onClick.emit($event)" style="cursor: pointer;">{{customclass}}</i>
      </ng-container>

      <ng-container *ngIf="customclass == null">
        <i class="material-icons" (click)="onClick.emit($event)" style="cursor: pointer;">{{iconClass}}</i>
      </ng-container>
    </ng-container>
  `,
})

export class AmexioIconPaneComponent implements OnInit, OnChanges {

  @Input() key: string;

  @Input() customclass: string;

  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();

  iconClass: string;

  constructor(public iconLoaderService: IconLoaderService) {

  }

  ngOnInit() {
    this.iconClass = this.getIconClass();
  }

  private getIconClass(): string {
    if (this.iconLoaderService.iconMappings != null) {
      const iconObject = this.iconLoaderService.iconMappings.find((obj: any) => obj.component === this.key);
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
