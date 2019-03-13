import { AfterViewInit, Input, Output } from '@angular/core';
import { Component , ContentChild, EventEmitter, OnInit} from '@angular/core';
import { AmexioNavBarComponent } from './../../navigation/navbar/navbar.component';
import { DeviceQueryService } from './../../services/device/device.query.service';
@Component({
  selector: 'amexio-homepage-northpanel',
  templateUrl: './homepage.northpanel.component.html',
})
export class AmexioHomePageNorthPanelComponent implements OnInit, AfterViewInit {

@Input('enable-icon') enableIcon = false;

@Input('type') type: string;

@Output() nothPanelIconClick: any = new EventEmitter<any>();

@ContentChild(AmexioNavBarComponent) amexioNavBarComponent: AmexioNavBarComponent;

constructor(public matchMediaService: DeviceQueryService) {

}
 ngOnInit() {

 }
 ngAfterViewInit() {
   if (this.amexioNavBarComponent && this.type === '2' && !(this.matchMediaService.IsTablet() || this.matchMediaService.IsPhone())) {
     this.amexioNavBarComponent.homepageType = this.type;
   }
   this.amexioNavBarComponent.onIconArrowClick.subscribe((eventdata: any) =>
          this.westPanelShowHideClick(eventdata),
  );
 }
 westPanelShowHideClick(data: any) {
  this.nothPanelIconClick.emit();
 }
}
