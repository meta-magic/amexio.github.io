import { Component, ContentChild, EventEmitter, Input, OnInit } from '@angular/core';
import { DeviceQueryService } from './../../services/device/device.query.service';

@Component({
  selector: 'amexio-homepage-westpanel',
  templateUrl: './homepage.westpanel.component.html',
})
export class AmexioHomePageWestPanelComponent implements OnInit {

  @Input('type') type: string;

  padding = 50;

  constructor(public matchMediaService: DeviceQueryService) {
  }
  ngOnInit() {
  }

  setPadding(paddding: any) {
      this.padding = paddding;
  }
}
