/**
 * Created by ketangote on 12/8/17.
 */
import {Component, Input, OnInit} from '@angular/core';
import {DeviceQueryService} from "../../services/device/device.query.service";

@Component({
  selector: 'amexio-nav', templateUrl: 'navbar.component.html', styleUrls: ['navbar.component.scss']
})
export class AmexioNavBarComponent implements OnInit {

  showmenu: boolean = true;

  mobile: boolean = false;

  @Input() title: string;

  @Input() logo: string;

  constructor(public matchMediaService: DeviceQueryService) {
  }

  ngOnInit() {
  }



  ngAfterContentInit() {
    this.handleDeviceSetting();
  }

  toggleMenu() {
    this.showmenu = !this.showmenu;
  }

  handleDeviceSetting(){
    if (this.matchMediaService.IsPhone()) {
      this.showmenu = false;
      this.mobile = true;
    }
  }
  onResize(event:any){
    this.handleDeviceSetting();
  }
}

