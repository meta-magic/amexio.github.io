import { Component, ContentChild , Input, OnInit} from '@angular/core';
import { DeviceQueryService } from './../../services/device/device.query.service';

@Component({
  selector: 'amexio-homepage-centerpanel',
  templateUrl: './homepage.centerpanel.component.html',
})
export class AmexioHomePageCenterPanelComponent implements OnInit {

@Input('type') type: string;

constructor(public matchMediaService: DeviceQueryService) {

}
 ngOnInit() {

 }
}
