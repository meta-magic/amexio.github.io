/**
 * Created by ketangote on 12/1/17.
 */


/*
 Component Name : Amexio sidenav bar
 Component Selector : <amexio-side-nav>
 Component Description : The Side Nav Bar Component is a familiar side navigation pattern for users. Side nav bar can be placed on left or right side. It can fit as many navigation links as needed, scrolling when the content exceeds the viewport. Take a look at Datastructure format which this component can consume in datasource tab.
*/
import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { CommonDataService } from "../../services/data/common.data.service";
import { DeviceQueryService } from "../../services/device/device.query.service";


@Component({
  selector: 'amexio-side-nav', templateUrl: './sidenav.component.html', styleUrls: ['./sidenav.component.scss']
})
export class AmexioSideNav implements OnInit {

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


  smalldevice: boolean;

  sidenavexpandedinsmalldevice: boolean;

  responseData: any;

  constructor(public dataService: CommonDataService, public matchMediaService: DeviceQueryService, public element: ElementRef) {
    this.position = "left";
    this.smalldevice = false;
    this.sidenavexpandedinsmalldevice = false;
    this.width = '20%';
    let that = this;

    /*---------------------------------------------------
     TAP INTO LISTENERS FOR WHEN DEVICE WIDTH CHANGES
     ---------------------------------------------------*/
    this.matchMediaService.OnPhone(function (mediaQueryList: MediaQueryList) {
      that.handleDeviceSettings(false);
    });

    this.matchMediaService.OnTablet(function (mediaQueryList: MediaQueryList) {
      that.handleDeviceSettings(false);
    });

    this.matchMediaService.OnDesktop(function (mediaQueryList: MediaQueryList) {
      that.handleDeviceSettings(false);
    });
  }

  ngOnInit() {
    if (this.httpmethod && this.httpurl) {
      this.dataService.fetchData(this.httpurl, this.httpmethod).subscribe(response => {
        this.responseData = response;
      }, error => {
      }, () => {
        this.setData(this.responseData);
      });
    }

    if (this.position == null) {
      this.position = 'left';
    }

    if (!this.height) {
      this.height = "100%";
    }
  }

  onClick(node: any) {
    node.expand = !node.expand;
    this.nodeClick.emit(node);
  }

  setData(httpResponse: any) {
    //Check if key is added?
    let responsedata = httpResponse;
    if (this.datareader != null) {
      let dr = this.datareader.split(".");
      for (let ir = 0; ir < dr.length; ir++) {
        responsedata = responsedata[dr[ir]];
      }
    } else {
      responsedata = httpResponse;
    }
    this.data = responsedata;
    this.activateNode(this.data, null);
    this.handleDeviceSettings(false);
  }

  activateNode(data: any[], node: any) {
    for (let i = 0; i < data.length; i++) {
      if (node === data[i] && !data[i]['children']) {
        data[i]['active'] = true;
      } else {
        data[i]['active'] = false;
      }

      if (data[i]['children']) {
        this.activateNode(data[i]['children'], node);
      }
    }
  }

  onNodeClick(node: any) {
    this.activateNode(this.data, node);
    this.nodeClick.emit(node);
    if (!node.children) {
      this.handleDeviceSettings(false);
    }
  }

  toggleSideNav() {
    this.handleDeviceSettings(true);
  }

  close() {
    this.handleDeviceSettings(false);
  }

  handleDeviceSettings(expand: boolean) {
    if (this.position != "relative") {
      if (this.matchMediaService.IsTablet() || this.matchMediaService.IsPhone()) {
        this.smalldevice = true;
        if (expand) {
          this.width = "80%";
          this.sidenavexpandedinsmalldevice = true;
        } else {
          this.width = "0%";
          this.sidenavexpandedinsmalldevice = false;
        }
      } else {
        this.width = "20%";
        this.smalldevice = false;
      }
    }
  }

  @HostListener('document:click', ['$event.target']) @HostListener('document: touchstart', ['$event.target'])
  public onElementOutClick(targetElement: HTMLElement) {
    let parentFound = false;
    while (targetElement != null && !parentFound) {
      if (targetElement === this.element.nativeElement) {
        parentFound = true;
      }
      targetElement = targetElement.parentElement;
    }
    if (!parentFound) {
      this.close();
    }
  }



  dragStartEvent(event: any) {
    if (this.enabledrag) {
      event.event.dataTransfer.setData('dragData', JSON.stringify(event.data));
      this.onDrag.emit(event);
    }
  }

}
