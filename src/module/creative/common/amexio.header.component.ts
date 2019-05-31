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
*  Created by sagar on 4/02/2019.
*/
import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/index';

@Component({
  selector: 'amexio-header-ce',
  templateUrl: './amexio.header.component.html',
  styles: [
    `
  .cursor-style {
  cursor:pointer;
  }
  `,
  ],
})
export class AmexioCardCEHeaderComponent implements OnInit {

  @Input('align') align = '';

  @Input('icon-align') verticalalign = '';

  @Input('bg-image') bgimage: string;

  @Input('color') color: string;

  @Input('background') background: string;

  @Input('height') height: string;

  @Input('border-bottom') borderbottom: boolean;

  @Input('direction') direction = 'row';

  @Input('apply-theme-color') applyThemeColor = false;

  cclass = '';

  closeable = false;

  maximize = false;

  isFullWindow = false;

  windowFlag: boolean;

  themeCss: any;

  closeableBehaiour = new BehaviorSubject(false);

  maximizeBehaiour = new BehaviorSubject(false);

  amexioComponentId: string;

  ribbonType = false;
  iconPosition: {
    top: string;
    bottom: string;
  };

  ngOnInit() {
    if (this.borderbottom) {
      this.cclass = 'card-header-border';
    }
    this.setIconPosition();
  }
  setMaximizeData(maximize: boolean, isFullWindow: boolean) {
    this.maximize = maximize;
    this.isFullWindow = isFullWindow;
    this.maximizeBehaiour.next(this.isFullWindow);
  }

  sizeChange() {
    this.isFullWindow = !this.isFullWindow;
    this.maximizeBehaiour.next(this.isFullWindow);
  }

  onCloseClick() {
    this.closeableBehaiour.next(false);
  }

  setIconPosition() {
    switch (this.verticalalign) {
      case 'top': {
        this.iconPosition = {
          top: '0',
          bottom: '',
        };
        break;
      }
      case 'center': {
        this.iconPosition = {
          top: '',
          bottom  : '',
        };
        break;
      }
      case 'bottom': {
        this.iconPosition = {
          top: '',
          bottom: '0',
        };
        break;
      }
    }
  }

  setColorPalette(themeClass: any) {
    this.themeCss = themeClass;
  }

}
