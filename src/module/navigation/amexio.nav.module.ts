/**
 * Created by pratik on 27/11/17.
 */
import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonDataService} from "../services/data/common.data.service";
import {HttpModule} from "@angular/http";
import {AmexioSideNav} from "./sidenav/sidenav.component";
import {SideNavNodeComponent} from "./sidenav/sidenavnode.component";
import {DeviceQueryService} from "../services/device/device.query.service";
import { AmexioNavBarComponent} from "./navbar/navbar.component";
import {AmexioNavItemComponent} from "./navbar/navitem.component";
import {AmexioNotificationComponent} from "./notification/notification.component";
import {AmexioMediaModule} from "../media/amexio.media.module";
import {DockbarComponent} from "./dockedbar/dockbaritem";
import {DockedBarToolComponent} from "./dockedbar/dockettoolbar.component";
import {AmexioMenuBarComponent} from "./menubar/menubar.component";
import {AmexioLayoutModule} from "../layout/amexio.layout.module";
import {AmexioNavIconPane} from "./icon/icon.component";
import {IconLoaderService} from "../services/icon/icon.service";
import {AmexioFormsModule} from "../forms/amexio.forms.module";

export * from '../services/data/common.data.service';
export * from '../services/device/device.query.service';
export * from './sidenav/sidenav.component';
export * from './sidenav/sidenavnode.component';
export * from './navbar/navbar.component';
export * from './notification/notification.component';

const NAV_COMPONENTS = [
  AmexioSideNav,
  SideNavNodeComponent,
  AmexioNavBarComponent,
  AmexioNavItemComponent,
  AmexioNotificationComponent,
  DockbarComponent,
  DockedBarToolComponent,
  AmexioMenuBarComponent,
  AmexioNavIconPane
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    AmexioMediaModule,
    AmexioLayoutModule,
    AmexioFormsModule
  ],
  exports: NAV_COMPONENTS,
  declarations: NAV_COMPONENTS,
  providers: [CommonDataService,DeviceQueryService,IconLoaderService]
})
export class AmexioNavModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AmexioNavModule,
      providers: [CommonDataService,DeviceQueryService,IconLoaderService]
    };
  }
}
