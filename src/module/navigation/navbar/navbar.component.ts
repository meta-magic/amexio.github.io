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
*  Created by ketangote on 12/8/17.
*/

import {
  AfterContentInit, AfterViewInit, Component, ContentChildren, ElementRef, EventEmitter,
  Input, OnInit, Output, QueryList, ViewChild,
} from '@angular/core';
import { AmexioBannerComponent } from './banner/banner.component';
import { AmexioNavItemComponent } from './navitem.component';

import { DeviceQueryService } from '../../services/device/device.query.service';

@Component({
  selector: 'amexio-nav', templateUrl: 'navbar.component.html',
})
export class AmexioNavBarComponent implements OnInit, AfterViewInit, AfterContentInit {

  /*
   Properties
   name : title
   datatype : string
   version : 4.0 onwards
   default : none
   description : Title for link, button and menu header
   */
  @Input() title: string;

  /*
   Properties
   name : logo
   datatype : string
   version : 4.0 onwards
   default : none
   description : Logo of navbar.
   */
  @Input() logo = '';

  /*
   Properties
   name : enable-side-nav-position
   datatype : boolean
   version : 4.0 onwards
   default : none
   description : Indicate if side-nav-bar is present
   */
  @Input('enable-side-nav-position') sidenav = false;

  /*
   Properties
   name : enable-side-nav-position
   datatype : boolean
   version : 4.0 onwards
   default : none
   description : transparent nav bar
   */
  @Input('transparent') transparent = false;

  /*
   Properties
   name : color
   datatype : string
   version : 5.5.6 onwards
   default : none
   description : Color
   */
  @Input('color') color: string;

  @Input('enable-more-mode') enableMoreMode = false;

  opacity: number;
  themeCss: any;
  amexioComponentId = 'amexio-navbar';

  // THIS IS LOCAL USE NOT EXPOSED
  @Input('home-page-type') homepageType: string;

  @Output() onNavLogoClick: any = new EventEmitter<any>();

  @Output() onNavTitleClick: any = new EventEmitter<any>();

  @Output() onIconArrowClick: any = new EventEmitter<any>();

  @Output() onIconClick: any = new EventEmitter<any>();

  @Output() navSubmenuClick: any = new EventEmitter<any>();

  @ContentChildren(AmexioNavItemComponent) navitems: QueryList<AmexioNavItemComponent>;

  @ContentChildren(AmexioBannerComponent) bannerItem: QueryList<AmexioBannerComponent>;

  navItemComponents: AmexioNavItemComponent[];

  @Output() onNavLoad: any = new EventEmitter<any>();

  @ViewChild('navbar', { read: ElementRef }) public navbar: ElementRef;
  @ViewChild('navbarfixed', { read: ElementRef }) public navbarfixed: ElementRef;
  @ViewChild('navbaritems', { read: ElementRef }) public navbaritems: ElementRef;
  @ViewChild('navbaritems1', { read: ElementRef }) public navbaritems1: ElementRef;
  @ViewChild('navbaritems2', { read: ElementRef }) public navbaritems2: ElementRef;
  @ViewChild('navbaritems3', { read: ElementRef }) public navbaritems3: ElementRef;

  navclass: string;
  toggle = true;
  mobilemode = false;
  navitemwidth: number;
  navfixeditem: number;
  isIconLeft = true;
  isLHSHide = false;
  lhsWidth = '5%';
  isExpand = false;
  isPhone = false;
  navItemPresent = false;
  top: any;
  type: string;
  moreBucket: any[] = [];
  resizeItemCollection: AmexioNavItemComponent[] = [];
  isItemRemoved = false;
  morePadding = 0;

  moreCheckWidth = 0;
  showBanner = false;

  constructor(public matchMediaService: DeviceQueryService) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    if (!this.logo) {
      this.loadNavItems();
    }
    this.navOnLoad();
  }

  ngAfterContentInit() {
    if (this.bannerItem) {
      const bItem = this.bannerItem.toArray();
      if (bItem.length > 0) {
        this.showBanner = true;
        bItem[0].hideBanner.subscribe((flag: boolean) => {
          this.showBanner = flag;
          this.resizeAfterBannerClose();
          this.navOnLoad();
        });
      }

    }
    this.navItemComponents = this.navitems.toArray();
    if (this.navItemComponents && this.navItemComponents.length > 0) {
      this.navItemPresent = true;
      this.navItemComponents.forEach((element: any) => {
        element.itemcolor = this.color;
      });

    }
  }

  onImageLoad() {
    this.loadNavItems();
  }

  loadNavItems() {
    this.handleNavItems();
    if (this.navbaritems2.nativeElement) {
      this.navitemwidth = (5 +
        (this.navbaritems2.nativeElement.offsetWidth) +
        (this.navbaritems2.nativeElement.offsetWidth) +
        (this.navbaritems3.nativeElement.offsetWidth));
    }

    if (this.navbarfixed && this.navbarfixed.nativeElement) {
      this.moreCheckWidth = this.moreCheckWidth + this.navbarfixed.nativeElement.offsetWidth;
    }
    if (this.navbaritems1 && this.navbaritems1.nativeElement) {
      this.moreCheckWidth = this.moreCheckWidth + this.navbarfixed.nativeElement.offsetWidth;
    }
    if (this.navbaritems2 && this.navbaritems2.nativeElement) {
      this.moreCheckWidth = this.moreCheckWidth + this.navbarfixed.nativeElement.offsetWidth;
    }

    if (!this.enableMoreMode) {
      this.handleDeviceSetting();
    } else {
      this.checkMobileMode();
      this.createMoreContent();
    }
    this.navOnLoad();
  }

  checkMobileMode() {
    if (this.matchMediaService.IsPhone()) {
      this.mobilemode = true;
      this.isPhone = true;
    } else {
      this.mobilemode = false;
      this.isPhone = false;
    }
  }

  toggleDrawerPanel(event: any) {
    this.toggle = !this.toggle;
  }

  handleNavItems() {
    this.navItemComponents = this.navitems.toArray();
    this.navItemComponents.forEach((node) => node.onNavItemClick.subscribe((eventdata: any) => this.handleNavItemEvent(eventdata)));
  }

  handleNavItemEvent(event: any) {
    if (event && event.data && event.data.node && !event.data.node.header && this.mobilemode) {
      this.toggle = true;
    }
  }

  notifyNavItems(navbarwidth: number) {
    if (this.navItemComponents) {
      this.navItemComponents.forEach((node) => {
        node.setMobileMode(this.mobilemode);
        node.setNavbarWidth(navbarwidth);
      });
    }
  }

  handleDeviceSetting() {
    if (this.matchMediaService.IsTablet() || this.matchMediaService.IsPhone()) {
      this.mobilemode = true;
      this.toggle = false;
      this.isPhone = true;
    } else {
      this.mobilemode = false;
      this.isPhone = false;
      this.toggle = true;
    }
    if (this.navbar) {
      this.notifyNavItems(this.navbar.nativeElement.offsetWidth);
    }

  }

  resize(event: any) {
    if (!this.enableMoreMode) {
      this.handleDeviceSetting();
    } else {
      if (this.matchMediaService.IsPhone()) {
        this.mobilemode = true;
        this.isPhone = true;
        this.toggle = false;
      } else {
        this.mobilemode = false;
        this.isPhone = false;
        this.toggle = true;
      }
      this.createMoreContent();
      if (this.navbar) {
        this.notifyNavItems(this.navbar.nativeElement.offsetWidth);
      }
    }
    if (this.homepageType === '3') {
      if (!this.isExpand) {
        this.lhsWidth = '0 0 19%';
      } else {
        this.isLHSHide = true;
        this.lhsWidth = '0 0 5%';
      }
      this.isExpand = !this.isExpand;
    }
    this.navOnLoad();
  }

  resizeAfterBannerClose() {
    if (!this.enableMoreMode) {
      this.handleDeviceSetting();
    } else {
      if (this.navbar) {
        this.notifyNavItems(this.navbar.nativeElement.offsetWidth);
      }
    }
    this.navOnLoad();
  }
  onArrowClick(event: any) {
    this.onIconArrowClick.emit();
    this.navOnLoad();
    this.isIconLeft = !this.isIconLeft;
  }
  // THIS EVENT IS HOME COMPOENNT USE.NOT EXPOSED
  onExpandIconClick() {
    if (this.homepageType === '3') {
      if (!this.isExpand) {
        this.lhsWidth = '0 0 19%';
      } else {
        this.isLHSHide = true;
        this.lhsWidth = '0 0 5%';
      }
      this.onIconClick.emit(!this.isExpand);
      this.isExpand = !this.isExpand;
    }
  }

  setColorPalette(themeClass: any) {
    this.themeCss = themeClass;
  }

  createMoreContent() {
    this.resizeItemCollection = [];
    this.moreBucket = [];
    this.notifyNavItems(this.navbar.nativeElement.offsetWidth);
    if (!this.mobilemode) {
      this.removeNodeFromDom();
      if (this.navItemComponents && this.navItemComponents.length > 0) {
        this.createMoreData();
      }

    } else {
      this.toggle = false;
      this.mobileModePresent();
    }
    if (this.moreBucket.length > 0) {
      this.morePadding = 50;
    } else {
      this.morePadding = 0;
    }
  }

  mobileModePresent() {
    this.removeNodeFromDom();
    this.navItemComponents.forEach((nvitem: any) => {
      if (nvitem.type === 'menu') {
        this.resizeItemCollection.push(nvitem);
      }
    });
  }

  createMoreData() {
    let itemsWidth = 0;
    if (this.moreCheckWidth !== 0 || this.moreCheckWidth > 200) {
      itemsWidth = this.moreCheckWidth;
    }
    this.navItemComponents.forEach((nvitem: any) => {
      if (nvitem.type === 'menu') {
        if (this.navbar.nativeElement.offsetWidth > (itemsWidth + 400) ||
          ((this.navbar.nativeElement.offsetWidth - itemsWidth) > 200)) {
          itemsWidth = (itemsWidth + nvitem.offsetWidth);
          this.resizeItemCollection.push(nvitem);
        } else {
          const dd = {
            text: nvitem.title,
            submenus: nvitem.data,
            subMenuPadding: nvitem.subMenuPadding,
          };
          this.moreBucket.push(dd);
        }
      }
    });
  }

  removeNodeFromDom() {
    if (!this.isItemRemoved && this.navItemComponents && this.navItemComponents.length > 0) {
      this.navItemComponents.forEach((nvitem: any) => {
        if (nvitem.type === 'menu') {
          nvitem.offsetWidth = nvitem.elementref.nativeElement.offsetWidth;
          const node: HTMLElement = document.getElementById(nvitem.componentId);
          if (node) {
            node.parentNode.removeChild(node);
          }
        }
      });
      this.isItemRemoved = true;
    }
  }
  // external link
  externalLink(event: any) {
    if (this.navItemComponents && this.navItemComponents.length > 0) {
      let isFound = false;
      this.navItemComponents.forEach((element: any) => {
        if (!isFound && element.type === 'menu') {
          element.navItemClick(event);
          isFound = true;
        }
      });

    }
  }

  navOnLoad() {
    setTimeout(() => {
      this.onNavLoad.emit({ offsetHeight: this.navbar.nativeElement.offsetHeight });
    }, 0);
  }
}
