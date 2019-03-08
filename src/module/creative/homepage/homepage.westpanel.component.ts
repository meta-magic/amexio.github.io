import { Component , ContentChild, EventEmitter, Input, OnInit} from '@angular/core';
import { DeviceQueryService } from './../../services/device/device.query.service';

@Component({
  selector: 'amexio-homepage-westpanel',
  templateUrl: './homepage.westpanel.component.html',
})
export class AmexioHomePageWestPanelComponent implements OnInit {

@Input('type') type: string;

constructor(public matchMediaService: DeviceQueryService) {

}
 ngOnInit() {

 }
}
