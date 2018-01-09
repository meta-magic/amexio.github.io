/**
 * Created by ketangote on 12/8/17.
 */
import {Component, OnInit} from '@angular/core';
import {DeviceQueryService} from "../../services/device/device.query.service";

@Component({
  selector: 'amexio-nav', templateUrl: 'navbar.component.html', styleUrls: ['navbar.component.scss']
})
export class AmexioMenuBarComponent implements OnInit {
  showmenu: boolean = true;

  constructor(public matchMediaService: DeviceQueryService) {
  }

  ngOnInit() {
  }

  ngAfterContentInit() {

  }

  toggleMenu() {
    this.showmenu = !this.showmenu;
  }
}

