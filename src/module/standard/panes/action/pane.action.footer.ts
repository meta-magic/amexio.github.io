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
 * Created by pratik on 18/12/17.
 */

import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: 'amexio-action', template: `
    <ng-container *ngIf="footer">
      <ng-content></ng-content>
    </ng-container>
  `,
})

export class AmexioFooterComponent implements OnInit {
  @HostBinding('attr.class') className = 'modal-window-footer';

  @Input('footer-align') footeralign: string;

  @HostBinding('style.justify-content') alignClass: string;

  footer = false;

  @Input() padding: string;

  constructor() {
  }

  ngOnInit() {
    this.setFooterAlignment(this.footeralign);

  }

  public setFooterAlignment(footeralign: string) {
    switch (footeralign) {
      case 'right': {
        this.alignClass = 'flex-end';
        break;
      }
      case 'center': {
        this.alignClass = 'center';
        break;
      }
      case 'left': {
        this.alignClass = 'flex-start';
        break;
      }
      default : {
        this.alignClass = 'flex-end';
        break;
      }
    }
  }
}
