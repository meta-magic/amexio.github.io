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
import {
  AfterContentInit, AfterViewInit, Component, ContentChildren, Input, OnDestroy, OnInit, QueryList,
} from '@angular/core';
import { LifeCycleBaseComponent } from '../../base/lifecycle.base.component';
import { AmexioCardCEActionComponent } from '../common/amexio.action.component';
import { AmexioCardCEBodyComponent } from '../common/amexio.body.component';
import { AmexioCardCEHeaderComponent } from '../common/amexio.header.component';

@Component({
  selector: 'amexio-card-ce',
  templateUrl: './amexio.cards.component.html',
})
export class AmexioCardCEComponent extends LifeCycleBaseComponent implements OnDestroy, OnInit, AfterViewInit, AfterContentInit {

  @Input('bg-image') bgimage: string;

  @Input('overlay-type') overlaytype: string;

  @Input('color') color: string;

  @Input('background') background: string;

  @Input('height') height: string;

  @Input('width') width: string;

  @Input('align') align: string;

  @Input('style-type') styleType: string;

  @Input('polaroid-type') transformType: any;

  @Input('flip') flip: boolean;

  @Input('zoom') zoom: boolean;

  @Input('cover-image') coverimage: string;

  @Input('zoom-transition-origin') zoomtransitionorigin = 'center center';

  @Input('show-cover-image') showcoverimg = false;

  @Input('zoom-flip') zoomflipflag = false;

  slidereffecton = false;
  themeCss: any;
  ishover = false;
  amexioComponentId = 'amexio-card';

  cclass: string;

  windowFlag = false;

  polarideStyleMapCE: Map<any, string>;

  slidercss = '';

  @ContentChildren(AmexioCardCEHeaderComponent) AmexioCardCEHeaderQueryList: QueryList<AmexioCardCEHeaderComponent>;

  amexioCardHeaderList: AmexioCardCEHeaderComponent[];

  @ContentChildren(AmexioCardCEBodyComponent) AmexioCardCEBodyQueryList: QueryList<AmexioCardCEBodyComponent>;

  amexioCardBodyList: AmexioCardCEBodyComponent[];

  @ContentChildren(AmexioCardCEActionComponent) AmexioCardCEActionQueryList: QueryList<AmexioCardCEActionComponent>;

  amexioCardActionList: AmexioCardCEActionComponent[];

  innerCardCss = '';
  slidereffect = 'slider-effect';
  tempPolarideCE: string;

  constructor() {
    super();
    this.height = '100%';
  }

  ngOnInit() {
    if (this.zoomflipflag) {
      this.zoom = true;
      this.flip = true;
    }
    this.cclass = ' card-container-ce-main ';
    this.innerCardCss = ' card-container-ce ';
    if (!this.color) {
      this.cclass = this.cclass + 'card-container-ce-color';
    }
    if (!this.background) {
      this.cclass = this.cclass + ' card-container-ce-bg-color';
    }
    if (this.overlaytype) {
      this.cclass = this.cclass + '  card-ce-overflowhidden';

      if (this.overlaytype === this.slidereffect) {
        this.innerCardCss = this.innerCardCss + ' card-ce-overlay-slideeffect ';
      } else if (this.overlaytype === 'fade-effect') {
        this.innerCardCss = this.innerCardCss + ' card-ce-overlay-fadeeffect ';
      }
    }
    this.setWiderAndNarrower();
    super.ngOnInit();
    this.setFlipCard();
    this.setZoomCard();
    this.polarideStyleMapCE = new Map();
    this.polarideStyleMapCE.set('tilted-minus-2-degree', 'card-container-pol-styl');
    this.polarideStyleMapCE.set('tilted-2-degree', 'card-container-pol-styl2');
    this.polarideStyleMapCE.set('tilted-4-degree', 'card-container-pol-styl3');
    this.polarideStyleMapCE.set('tilted-minus-4-degree', 'card-container-pol-styl4');
    this.polarideStyleMapCE.forEach((ele: any, key: any) => {
      if (key === this.transformType) {
        this.cclass = this.cclass + ' ' + ele;
      }
    });
    return 'this.tempPolaideCE';

  }
  ngAfterViewInit() {
    super.ngAfterViewInit();
  }

  private setFlipCard() {
    if (this.flip) {
      this.cclass = this.cclass + ' card-container-ce-main-flip';
      this.innerCardCss = this.innerCardCss + ' card-container-ce-flip ';
    }
  }

  private setZoomCard() {
    if (this.zoom) {
      this.cclass = this.cclass + ' card-container-ce-main-zoom';
      this.innerCardCss = this.innerCardCss + ' card-container-ce-zoom ';
    }
  }

  // THIS METHOD CALLL FOR HEADER AND ACTION STYLE
  setWiderAndNarrower(): void {
    switch (this.styleType) {
      case 'wider-header':
        this.cclass = this.cclass + ' card-container-wider-header';
        break;
      case 'narrower-header':
        this.cclass = this.cclass + ' card-container-narrower-header';
        break;
      case 'wider-action':
        this.cclass = this.cclass + ' card-container-wider-action';
        break;
      case 'narrower-action':
        this.cclass = this.cclass + ' card-container-narrower-action';
        break;
      case 'wider-all':
        this.cclass = this.cclass + ' card-container-wider-header card-container-wider-action';
        break;
      case 'narrower-all':
        this.cclass = this.cclass + ' card-container-narrower-header card-container-narrower-action';
        break;
      case 'wider-header-narrower-action':
        this.cclass = this.cclass + ' card-container-wider-header card-container-narrower-action';
        break;
      case 'narrower-header-wider-action':
        this.cclass = this.cclass + ' card-container-narrower-header card-container-wider-action';
        break;
      default:
        break;
    }
  }

  ngAfterContentInit() {
    if (this.AmexioCardCEHeaderQueryList) {
      this.amexioCardHeaderList = this.AmexioCardCEHeaderQueryList.toArray();
      if (this.amexioCardHeaderList && this.amexioCardHeaderList.length > 0) {
        this.amexioCardHeaderList.forEach((element: any) => {
          element.amexioComponentId = this.amexioComponentId;
        });
        if (this.styleType === 'ribbon-style') {
          this.amexioCardHeaderList[0].ribbonType = true;
        }
      }
    }
    if (this.AmexioCardCEBodyQueryList) {
      this.amexioCardBodyList = this.AmexioCardCEBodyQueryList.toArray();
      if (this.styleType === 'ribbon-style') {
        this.amexioCardBodyList[0].ribbonType = true;
        this.cclass = this.cclass + ' card-container-wider-header card-container-ribbon-style';
      }
    }
    this.setCardAligementForAllInnerComponent();
  }

  // TO SET ALIGN TO ALL INNER COMPONENT IN CARD
  setCardAligementForAllInnerComponent() {
    this.amexioCardHeaderList = this.AmexioCardCEHeaderQueryList.toArray();
    if (this.amexioCardHeaderList[0]) {
      this.amexioCardHeaderList[0].windowFlag = false;
    }

    if (this.amexioCardHeaderList[0] !== undefined && !this.amexioCardHeaderList[0].align &&
      this.amexioCardHeaderList[0].align.length > 0) {
      this.amexioCardHeaderList[0].align = this.align;
    }

    this.amexioCardBodyList = this.AmexioCardCEBodyQueryList.toArray();
    if (this.amexioCardBodyList[0] !== undefined && !this.amexioCardBodyList[0].align && this.amexioCardBodyList[0].align.length > 0) {
      this.amexioCardBodyList[0].align = this.align;
    }

    this.amexioCardActionList = this.AmexioCardCEActionQueryList.toArray();
    if (this.amexioCardActionList[0] !== undefined && !this.amexioCardActionList[0].align &&
      this.amexioCardActionList[0].align.length > 0) {
      this.amexioCardActionList[0].align = this.align;
    } else if (this.amexioCardActionList[0] !== undefined &&
      this.amexioCardActionList[0].align === '') {
      this.amexioCardActionList[0].align = 'end';
    }

  }
  ngOnDestroy() {
    super.ngOnDestroy();
  }

  onmouseover() {
    if ((!this.flip || !this.zoom) && this.overlaytype === this.slidereffect) {
      this.ishover = true;
    }
  }

  onmouseleave() {
    if ((!this.flip || !this.zoom)  && this.overlaytype === this.slidereffect) {
      this.ishover = false;
    }
  }
}
