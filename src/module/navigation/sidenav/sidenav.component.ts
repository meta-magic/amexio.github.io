/**
 * Created by ketangote on 12/1/17.
 */


import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonDataService} from "../../services/data/common.data.service";
import {DeviceQueryService} from "../../services/device/device.query.service";


@Component({
  selector: 'amexio-side-nav', templateUrl: './sidenav.component.html', styleUrls: ['./sidenav.component.scss']
})
export class AmexioSideNav implements OnInit {


  @Input() data: any[];

  @Input('http-url') httpurl: string;

  @Input('http-method') httpmethod: string;

  @Input('data-reader') datareader: string;

  @Input() position: any;

  @Input() titleimage: string;

  @Output() nodeClick: any = new EventEmitter<any>();

  @Input() width: string;

  @Input() height: string;

  @Input() sidenavtitle: string;

  smalldevice: boolean;

  sidenavexpandedinsmalldevice: boolean;

  responseData: any;

  constructor(public dataService: CommonDataService, public matchMediaService: DeviceQueryService) {
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
        this.responseData = response.json();
      }, error => {
      }, () => {
        this.setData(this.responseData);
      });
    }

    if (this.position == null) {
      this.position = 'left';
    }

    if(!this.height){
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
    if(!node.children){
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
      if (this.matchMediaService.IsPhone() || this.matchMediaService.IsTablet()) {
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
}
