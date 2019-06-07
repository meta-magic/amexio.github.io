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
* Created by ketangote on 12/1/17.
*/

import {
  AfterContentInit, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, HostListener, Input,
  OnInit, Output, QueryList,
} from '@angular/core';
import { CommonDataService } from '../../services/data/common.data.service';
import { DeviceQueryService } from '../../services/device/device.query.service';
import { SideNavNodeComponent } from '../sidenav/sidenavnode.component';
@Component({
  selector: 'amexio-side-nav', templateUrl: './sidenav.component.html',
})
export class AmexioSideNavComponent implements OnInit, AfterContentInit {

  /*
   Properties
   name : data
   datatype : any
   version : 4.0 onwards
   default : none
   description : Local data for sidenav.
   */
  @Input() data: any[];
  /*
   Properties
   name : http-url
   datatype : string
   version : 4.0 onwards
   default : none
   description : REST url for fetching datasource.
   */
  @Input('http-url') httpurl: string;

  /*
   Properties
   name : http-url
   datatype : string
   version : 4.0 onwards
   default : none
   description : Type of HTTP call, POST,GET.
   */
  @Input('http-method') httpmethod: string;

  /*
   Properties
   name : data-reader
   datatype : string
   version : 4.0 onwards
   default : none
   description : Key in JSON datasource for records
   */
  @Input('data-reader') datareader: string;

  /*
   Properties
   name : position
   datatype : any
   version : 4.0 onwards
   default : none
   description : Sidenav bar rendering position. example position='relative','right'
   */
  @Input() position: any;

  /*
   Properties
   name : titleimage
   datatype : string
   version : 4.0 onwards
   default : none
   description : Title image of sidenav bar
   */
  @Input() titleimage: string;

  /*
   Events
   name : nodeClick
   datatype : none
   version : none
   default : none
   description : Fire when sidenav bar menu click
   */
  @Output() nodeClick: any = new EventEmitter<any>();

  /*
   Events
   name : onDrag
   datatype : none
   version : 4.2.9
   default : none
   description : Fire when you drag node
   */
  @Output() onDrag: any = new EventEmitter<any>();

  /*
   Properties
   name : width
   datatype : string
   version : 4.0 onwards
   default : none
   description : Width of sidenav
   */
  @Input() width: string;

  /*
   Properties
   name : height
   datatype : string
   version : 4.0 onwards
   default : none
   description : height of sidenav
   */
  @Input() height: string;

  /*
   Properties
   name : title
   datatype : string
   version : 4.0 onwards
   default : none
   description : Title of sidenav bar
   */
  @Input('title') sidenavtitle: string;

  /*
   Properties
   name : enable-drag
   datatype : boolean
   version : 5.0.0 onwards
   default : false
   description : nodes can be dragged
   */
  @Input('enable-drag') enabledrag: boolean;

  /*
   Properties
   name : display-key
   datatype : string
   version : 5.2.0 onwards
   default : text
   description : Name of key inside response data to display on ui.
   */
  @Input('display-key') displaykey: string;
  /*
   Properties
   name : child-array-key
   datatype : string
   version : 5.2.0 onwards
   default : children
   description : Name of key for child array name inside response data to display on ui.
   */
  @Input('child-array-key') childarraykey: string;
  /*
   Properties
   name : enable-border
   datatype : boolean
   version : 5.5.5 onwards
   default : true
   description : By default enable-border is enabled
   */
  @Input('enable-border') enableborder = true;
  /*
   Properties
   name : background
   datatype : string
   version : 5.5.5 onwards
   default :
   description : User can define custom background color or pass gradient
   */
  @Input('background') background: string;
  /*
   Properties
   name : color
   datatype : string
   version : 5.5.5 onwards
   default : children
   description : User can define custom background color or pass gradient
   */
  @Input('color') color: string;
  /*
   Properties
   name : background-image
   datatype : string
   version : 5.5.5 onwards
   default : children
   description : User can pass background image
   */
  @Input('bg-image') bgimage: string;
  homepageType: string;
  @Output() onMouseLeave: any = new EventEmitter<any>();
  @Output() onMouseOver: any = new EventEmitter<any>();
  @ContentChildren(SideNavNodeComponent) sidennavnodearray: QueryList<SideNavNodeComponent>;
  smalldevice: boolean;
  nodearray: any;
  activenode: any;
  sidenavexpandedinsmalldevice: boolean;
  handleMobileDevice = true;
  responseData: any;

  isSideNavExpand: boolean;

  nodes: any = [];
  isShowOnlyIcon = false;
  isSideNavEnable = true;
  constructor(public dataService: CommonDataService, public matchMediaService: DeviceQueryService,
              public element: ElementRef, private cd: ChangeDetectorRef) {
    this.position = 'left';
    this.smalldevice = false;
    this.sidenavexpandedinsmalldevice = false;
    this.width = '0%';
    const that = this;
    this.displaykey = 'text';
    this.childarraykey = 'children';
    if (this.matchMediaService.IsTablet() || this.matchMediaService.IsPhone()) {
      this.smalldevice = true;
      this.width = '0%';
    } else {
      this.width = '19%';
    }
    /*---------------------------------------------------
     TAP INTO LISTENERS FOR WHEN DEVICE WIDTH CHANGES
     ---------------------------------------------------*/
    this.matchMediaService.OnPhone((mediaQueryList: MediaQueryList) => {
      that.handleDeviceSettings(false);
    });

    this.matchMediaService.OnTablet((mediaQueryList: MediaQueryList) => {
      that.handleDeviceSettings(false);
    });

    this.matchMediaService.OnDesktop((mediaQueryList: MediaQueryList) => {
      that.handleDeviceSettings(false);
    });
  }

  ngOnInit() {
    if (this.httpmethod && this.httpurl) {
      this.dataService.fetchData(this.httpurl, this.httpmethod).subscribe((response) => {
        this.responseData = response;
      }, (error) => {
      }, () => {
        this.setData(this.responseData);
      });
    }
    if (this.data && (!this.httpmethod || !this.httpurl)) {
      this.setData(this.data);
    }

    if (this.position == null) {
      this.position = 'left';
    }

    if (!this.height) {
      this.height = '100%';
    }
  }

  ngAfterContentInit() {
    this.nodearray = this.sidennavnodearray.toArray();
    this.nodearray.forEach((element: SideNavNodeComponent) => {
      element.nodeEmitToSideNav.subscribe((node: any) => {
        node.forEach((nodeelement: any) => {
          if (nodeelement.active === true) {
            this.activenode = nodeelement;
          }
        });
        this.activateNode = JSON.parse(JSON.stringify(node));
        this.findObj(node);
      });
    });
  }
  toggle() {
    this.handleDeviceSettings(true);
  }

  findObj(currentnode: any) {
    this.nodearray.forEach((element: SideNavNodeComponent) => {
      if (element.node && (element.node.length > 0)) {
        (element.node).forEach((individualnode: any) => {
          if ((this.activenode.text === individualnode.text)
            && (this.activenode.active === individualnode.active)) {
            individualnode.active = true;
          } else {
            individualnode.active = false;
          }
        });
      }
    });
  }

  onClick(node: any) {
    this.activateNode(this.data, node);
    if (this.matchMediaService.IsTablet() || this.matchMediaService.IsPhone()) {
      this.smalldevice = true;
    } else {
      this.smalldevice = false;
    }
    this.nodeClick.emit(node);
    if (this.smalldevice && (!node.children || node.children === null || node.children === '')) {
      this.isSideNavExpand = false;
    } else {
      this.isSideNavEnable = true;
    }
  }

  collapseSidenav() {
    this.width = '0%';
    this.isSideNavExpand = false;
    this.sidenavexpandedinsmalldevice = false;
  }

  generateIndex(data: any) {
    data.forEach((element: any, index: any) => {
      if (element[this.childarraykey]) {
        element[this.childarraykey].forEach((innerelement: any) => {
          innerelement['tabindex'] = '-1';
          if (innerelement[this.childarraykey]) {
            innerelement[this.childarraykey].forEach((innerelement2: any) => {
              innerelement2['tabindex'] = '-1';
            });
          }
        });
      }
    });
  }

  setData(httpResponse: any) {
    // Check if key is added?
    let responsedata = httpResponse;
    if (this.datareader != null) {
      const dr = this.datareader.split('.');
      for (const ir of dr) {
        responsedata = responsedata[ir];
      }
    } else {
      responsedata = httpResponse;
    }
    this.data = responsedata;
    this.generateIndex(this.data);
    this.activateNode(this.data, null);
    this.handleDeviceSettings(false);
  }

  activateNode(data: any[], node: any) {
    for (const i of data) {
      if (node === i && !i[this.childarraykey]) {
        i['active'] = true;
      } else {
        i['active'] = false;
      }

      if (i[this.childarraykey]) {
        this.activateNode(i[this.childarraykey], node);
      }
    }
  }

  toggleSideNav() {
    this.isSideNavEnable = true;
    this.handleDeviceSettings(!this.isSideNavExpand);
  }

  close() {
    this.handleDeviceSettings(false);
  }

  handleDeviceSettings(expand: boolean) {
    if (this.position !== 'relative') {
      if (this.matchMediaService.IsTablet() || this.matchMediaService.IsPhone()) {
        this.smalldevice = true;
        if (expand) {
          this.width = '80%';
          this.isSideNavExpand = true;
          this.sidenavexpandedinsmalldevice = true;
        } else {
          this.width = '0%';
          this.isSideNavExpand = false;
          this.sidenavexpandedinsmalldevice = false;
        }
      } else {
        if (this.isShowOnlyIcon) {
          this.width = '5%';
        } else {
          this.width = '19%';
        }
        this.smalldevice = false;
      }
    }
  }

  getNodeDragEvent(event: any) {
    this.onDrag.emit(event);
  }
  // THIS METHOD IS USED FOR SETTING HOMEPAGE TYPE
  setHomePageType(type: any) {
    this.homepageType = type;
    if (this.homepageType === '3') {
      this.nodearray.forEach((element: SideNavNodeComponent) => {
        element.setShowOnlyIconFlag(this.isShowOnlyIcon);
      });
    }
    this.cd.detectChanges();
  }
}
