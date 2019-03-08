import { AfterContentInit, AfterViewInit, Component , ContentChild, ContentChildren, Input, OnInit, QueryList } from '@angular/core';
import { AmexioNavBarComponent } from './../../navigation/navbar/navbar.component';
import { AmexioSideNavComponent } from './../../navigation/sidenav/sidenav.component';
import { DeviceQueryService } from './../../services/device/device.query.service';
import { AmexioHomePageNorthPanelComponent } from './homepage.northpanel.component';
@Component({
  selector: 'amexio-homepage-ce',
  templateUrl: './homepage.component.html',
})
export class AmexioHomePageComponent implements OnInit, AfterContentInit {

  @Input('type')type: string = '0';
  @ContentChild(AmexioHomePageNorthPanelComponent)
  amexoHomePageNorthpanel: AmexioHomePageNorthPanelComponent;

  @ContentChildren(AmexioSideNavComponent, { descendants: true }) sideNavList: QueryList<AmexioSideNavComponent>;
  sideNavComponents: AmexioSideNavComponent[];

  @ContentChild(AmexioNavBarComponent)amexioNavBarComponent: AmexioNavBarComponent;

  isDisableWestPanel = true;
  isPhone = false;
  westPanelWidth = '0 0 19%';
  constructor(public matchMediaService: DeviceQueryService) {
    if (this.matchMediaService.IsTablet() || this.matchMediaService.IsPhone()) {
      this.isPhone = true;
    }
  }
  ngOnInit() {}
  ngAfterContentInit() {
    this.sideNavComponents = this.sideNavList.toArray();
    if (this.type === '2') {
      this.sideNavComponents[0].isShowOnlyIcon = true;
      this.sideNavComponents[0].width = '5%';
      this.westPanelWidth = '0 0 5%';
      this.sideNavComponents[0].homepageType = this.type;
      // NAVBAR
      this.amexioNavBarComponent.isLHSHide = true;
      this.amexioNavBarComponent.lhsWidth = '0 0 5%';
      this.sideNavComponents[0].onMouseLeave.subscribe((eventdata: any) =>
        this.westPanelOnMouseleave(),
      );
      this.sideNavComponents[0].onMouseOver.subscribe((eventdata: any) =>
        this.westPanelOnMouseOver(),
      );
      this.sideNavComponents[0].nodeClick.subscribe((eventdata: any) =>
        this.westPanelNodeClick(eventdata),
      );
      this.amexioNavBarComponent.onMouseOver.subscribe((eventdata: any) =>
        this.northPanelMouseOver(),
      );
      this.amexioNavBarComponent.onMouseLeave.subscribe((eventdata: any) =>
        this.northPanelMosueLeave(),
      );
    }
    if (this.amexoHomePageNorthpanel) {
      this.amexoHomePageNorthpanel.type = this.type;
      this.amexoHomePageNorthpanel.nothPanelIconClick.subscribe(
        (eventdata: any) => this.showHideWestPanel(),
      );
    }
    this.amexioNavBarComponent.homepageType = this.type;
  }
  // THIS MEHOD CALL WHEN USED MOUSE LEAVE FROM SIDENAV
  westPanelOnMouseleave() {
    this.sideNavComponents[0].isShowOnlyIcon = true;
    this.sideNavComponents[0].width = '5%';
    this.westPanelWidth = '0 0 5%';

    // NAVBAR
    this.amexioNavBarComponent.isLHSHide = true;
    this.amexioNavBarComponent.lhsWidth = '0 0 5%';
  }
  westPanelOnMouseOver() {
    this.sideNavComponents[0].isShowOnlyIcon = false;
    this.sideNavComponents[0].width = '19%';
    this.westPanelWidth = '0 0 19%';
    // NAVBAR
    this.amexioNavBarComponent.isLHSHide = false;
    this.amexioNavBarComponent.lhsWidth = '0 0 19%';
  }
  westPanelNodeClick(event: any) {
    if (
      event &&
      (!event.children || event.children === '' || event.children === null)
    ) {
      this.sideNavComponents[0].isShowOnlyIcon = true;
      this.westPanelWidth = '0 0 5%';
      // NAVBAR
      this.amexioNavBarComponent.isLHSHide = true;
      this.amexioNavBarComponent.lhsWidth = '0 0 5%';
    }
  }
  showHideWestPanel() {
    this.isDisableWestPanel = !this.isDisableWestPanel;
    if (this.matchMediaService.IsTablet() || this.matchMediaService.IsPhone()) {
      this.isPhone = true;
    }
  }

  // TO MOUSE OVER NORTH PANEL
  northPanelMouseOver() {
    this.amexioNavBarComponent.isLHSHide = false;
    // SIDE NAV
    this.sideNavComponents[0].isShowOnlyIcon = false;
    this.sideNavComponents[0].width = '19%';
    this.westPanelWidth = '0 0 19%';
  }
  // TO MOUSE LEAVE NORTH PANEL
  northPanelMosueLeave() {
    this.amexioNavBarComponent.isLHSHide = true;
    // SIDE NAV
    this.sideNavComponents[0].isShowOnlyIcon = true;
    this.sideNavComponents[0].width = '5%';
    this.westPanelWidth = '0 0 5%';
  }
}
