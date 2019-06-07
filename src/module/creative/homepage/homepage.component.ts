import { AfterContentInit, AfterViewInit, Component, ContentChild, ContentChildren, Input, OnInit, QueryList } from '@angular/core';
import { AmexioNavBarComponent } from './../../navigation/navbar/navbar.component';
import { AmexioSideNavComponent } from './../../navigation/sidenav/sidenav.component';
import { DeviceQueryService } from './../../services/device/device.query.service';
import { AmexioHomePageNorthPanelComponent } from './homepage.northpanel.component';
import { AmexioHomePageWestPanelComponent } from './homepage.westpanel.component';
@Component({
  selector: 'amexio-homepage-ce',
  templateUrl: './homepage.component.html',
})
export class AmexioHomePageComponent implements OnInit, AfterContentInit {

  @Input('type') type = '1';
  @ContentChild(AmexioHomePageNorthPanelComponent)
  amexoHomePageNorthpanel: AmexioHomePageNorthPanelComponent;

  @ContentChildren(AmexioSideNavComponent, { descendants: true }) sideNavList: QueryList<AmexioSideNavComponent>;
  sideNavComponents: AmexioSideNavComponent[];

  @ContentChild(AmexioHomePageWestPanelComponent) amexioHomePageWestPanelComponent: AmexioHomePageWestPanelComponent;

  @ContentChild(AmexioNavBarComponent) amexioNavBarComponent: AmexioNavBarComponent;

  isDisableWestPanel = true;
  isPhone = false;
  westPanelWidth = '0 0 19%';
  northPanelHeight = 50;
  constructor(public matchMediaService: DeviceQueryService) {
    if (this.matchMediaService.IsTablet() || this.matchMediaService.IsPhone()) {
      this.isPhone = true;
    }
  }
  ngOnInit() { }
  ngAfterContentInit() {
    setTimeout(() => {
      this.sideNavComponents = this.sideNavList.toArray();
      this.setTimeoutMethodSeoerate();
      this.sideNavComponents[0].handleMobileDevice = false;
      if (this.type === '3') {
        this.sideNavComponents[0].isShowOnlyIcon = true;
        this.sideNavComponents[0].width = '5%';
        this.westPanelWidth = '0 0 5%';
        this.sideNavComponents[0].setHomePageType(this.type);
        // NAVBAR
        this.amexioNavBarComponent.isLHSHide = true;
        this.amexioNavBarComponent.lhsWidth = '0 0 5%';
        this.amexioNavBarComponent.onIconClick.subscribe((eventdata: any) =>
          this.northPanelClick(eventdata),
        );
      }
      if (this.amexoHomePageNorthpanel) {
        this.amexoHomePageNorthpanel.type = this.type;
        this.amexoHomePageNorthpanel.nothPanelIconClick.subscribe(
          (eventdata: any) => this.showHideWestPanel(),
        );
      }
      this.amexioNavBarComponent.homepageType = this.type;
      if (this.amexioHomePageWestPanelComponent) {
        this.amexioNavBarComponent.onNavLoad.subscribe((onLoadData: any) => {
          this.northPanelHeight = onLoadData.offsetHeight;
          if (this.sideNavComponents[0].sidenavexpandedinsmalldevice) {
            this.amexioHomePageWestPanelComponent.setPadding(this.northPanelHeight);
          } else if (this.matchMediaService.IsTablet() || this.matchMediaService.IsPhone()) {
            this.amexioHomePageWestPanelComponent.setPadding(0);
          } else {
            this.amexioHomePageWestPanelComponent.setPadding(this.northPanelHeight);
          }
        });
      }
    }, 0);
  }
  setTimeoutMethodSeoerate() {
    this.sideNavComponents.forEach((sidenav: any) => {
      sidenav.nodeClick.subscribe((node: any) => {
        if (sidenav.smalldevice && (!node.children || node.children === null || node.children === '')) {
          this.sideNavComponents[0].collapseSidenav();
          if (this.sideNavComponents[0].sidenavexpandedinsmalldevice) {
            this.amexioHomePageWestPanelComponent.setPadding(this.northPanelHeight);
          } else {
            this.amexioHomePageWestPanelComponent.setPadding(0);
          }
        } else {
          this.sideNavComponents[0].isSideNavEnable = true;
        }
      });
    });
  }

  // tslint:disable-next-line:no-identical-functions
  resize(event: any) {
    if (this.matchMediaService.IsTablet() || this.matchMediaService.IsPhone()) {
      this.isPhone = true;
    } else {
      this.isPhone = false;
    }
  }
  showHideWestPanel() {
    this.isDisableWestPanel = !this.isDisableWestPanel;
    if (this.matchMediaService.IsTablet() || this.matchMediaService.IsPhone()) {
      this.isPhone = true;
      this.sideNavComponents[0].toggle();
      if (this.sideNavComponents[0].sidenavexpandedinsmalldevice) {
        this.amexioHomePageWestPanelComponent.setPadding(this.northPanelHeight);
      } else {
        this.amexioHomePageWestPanelComponent.setPadding(0);
      }
    }
  }

  // ON NORTH PANEL CLICK
  northPanelClick(isExpand: any) {
    if (isExpand) {
      this.amexioNavBarComponent.isLHSHide = false;
      // SIDE NAV
      this.sideNavComponents[0].isShowOnlyIcon = false;
      this.sideNavComponents[0].width = '19%';
      this.westPanelWidth = '0 0 19%';
    } else {
      this.amexioNavBarComponent.isLHSHide = true;
      // SIDE NAV
      this.sideNavComponents[0].isShowOnlyIcon = true;
      this.sideNavComponents[0].width = '5%';
      this.westPanelWidth = '0 0 5%';
    }
    this.sideNavComponents[0].setHomePageType(this.type);
  }

}
