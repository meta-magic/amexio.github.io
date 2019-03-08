import { AfterViewInit, Component, ContentChild , Input, OnInit} from '@angular/core';
import { DeviceQueryService } from './../../services/device/device.query.service';

@Component({
  selector: 'amexio-homepage-eastpanel',
  templateUrl: './homepage.westpanel.component.html',
})
export class AmexioHomePageEastPanelComponent implements OnInit, AfterViewInit {

@Input('type') type: string;

constructor(public matchMediaService: DeviceQueryService) {

}
 ngOnInit() {

 }
 ngAfterViewInit() {

 }
}
