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
import { AmexioNavActionComponent } from './navaction.component';
import { AmexioNavItemComponent } from './navitem.component';
import { AmexioNavMenuComponent } from './navmenu.component';

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
  @Input('enable-side-nav-position') sidenavspace = false;

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

opacity: number;

  // THIS IS LOCAL USE NOT EXPOSED
  @Input('home-page-type') homepageType: string;
  @Output() onNavLogoClick: any = new EventEmitter<any>();

  @Output() onNavTitleClick: any = new EventEmitter<any>();

  @Output() onIconArrowClick: any = new EventEmitter<any>();

  @Output() onIconClick: any = new EventEmitter<any>();

  @Output() navSubmenuClick: any = new EventEmitter<any>();

  @ContentChildren(AmexioNavItemComponent) navitems: QueryList<AmexioNavItemComponent>;

  navItemComponents: AmexioNavItemComponent[];

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
  sidenav = false;
  isIconLeft = true;
  isLHSHide = false;
  lhsWidth = '5%';
  isExpand = false;
  isPhone = false;
  top: any;
  constructor(public matchMediaService: DeviceQueryService) {
    if (this.matchMediaService.IsTablet() || this.matchMediaService.IsPhone()) {
      this.mobilemode = true;
      this.isPhone = true;
    } else {
        this.mobilemode = false;
        this.isPhone = false;
    }
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (!this.logo) {
      this.loadNavItems();
    }
  }

  ngAfterContentInit() {
    this.navItemComponents = this.navitems.toArray();
    this.navItemComponents.forEach((element: any) => {
    element.itemcolor = this.color;
    });
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
      this.handleDeviceSetting();
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
      this.toggle = false;
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
      this.isPhone = true;
    } else {
        this.mobilemode = false;
        this.isPhone = false;
    }
    if (this.sidenavspace) {
      this.sideNavbar();
    }

    const navbarwidth = this.navbar.nativeElement.offsetWidth;
    const navbarheight = this.navbar.nativeElement.offsetHeight;

    if (!this.navfixeditem) {
      this.navfixeditem = this.navbarfixed.nativeElement.offsetWidth;
    }

    if (!this.navitemwidth) {
      let navbaritems1Width = 0;
      let navbaritems2Width = 0;
      let navbaritems3Width = 0;

      if (this.navbaritems1) {
        navbaritems1Width = this.navbaritems1.nativeElement.offsetWidth;
      }
      if (this.navbaritems2) {
        navbaritems2Width = this.navbaritems2.nativeElement.offsetWidth;
      }

      if (this.navbaritems3) {
        navbaritems3Width = this.navbaritems3.nativeElement.offsetWidth;
      }
      this.navitemwidth = (this.navfixeditem + navbaritems1Width + navbaritems2Width + navbaritems3Width);
    }

    const navbaravailablewidth = (navbarwidth - (this.navfixeditem + this.navitemwidth));

    if ((navbaravailablewidth < 10 || navbarheight > 100)) {
      this.mobilemode = true;
      this.toggle = false;
      this.notifyNavItems(navbarwidth);
    } else {
      this.mobilemode = false;
      this.toggle = true;
      this.notifyNavItems(navbarwidth);
    }

  }
  sideNavbar() {
    if (this.matchMediaService.IsTablet() || this.matchMediaService.IsPhone()) {
      this.sidenav = true;
    } else {
      this.sidenav = false;
    }
  }

  resize(event: any) {
    this.handleDeviceSetting();
    if (this.homepageType === '3') {
      if (!this.isExpand) {
        this.lhsWidth = '0 0 19%';
      } else  {
        this.isLHSHide = true;
        this.lhsWidth = '0 0 5%';
      }
      this.isExpand = !this.isExpand;
    }
  }
  onArrowClick(event: any) {
    this.onIconArrowClick.emit();
    this.isIconLeft = !this.isIconLeft;
  }
  // THIS EVENT IS HOME COMPOENNT USE.NOT EXPOSED
  onExpandIconClick() {
    if (this.homepageType === '3') {
      if (!this.isExpand) {
        this.lhsWidth = '0 0 19%';
      } else  {
        this.isLHSHide = true;
        this.lhsWidth = '0 0 5%';
      }
      this.onIconClick.emit(!this.isExpand);
      this.isExpand = !this.isExpand;
    }
  }
}
