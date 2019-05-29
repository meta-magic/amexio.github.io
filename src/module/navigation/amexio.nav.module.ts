/**
 * Created by pratik on 27/11/17.
 */
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { ModuleWithProviders, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {CommonDataService} from '../services/data/common.data.service';
import {DeviceQueryService} from '../services/device/device.query.service';
import {IconLoaderService} from '../services/icon/icon.service';

import {AmexioFormsModule} from '../forms/amexio.forms.module';
import {AmexioLayoutModule} from '../layout/amexio.layout.module';
import {AmexioMediaModule} from '../media/amexio.media.module';

import {AmexioBreadcrumbComponent} from './breadcrumb/breadcrumb.component';
import {DockbarComponent} from './dockedbar/dockbaritem';
import {DockedBarToolComponent} from './dockedbar/dockettoolbar.component';
import {AmexioMenuBarComponent} from './menubar/menubar.component';
import {AmexioInnerNavMenuComponent} from './navbar/innermenu.component';
import {AmexioNavActionComponent } from './navbar/navaction.component';
import {AmexioNavBarComponent} from './navbar/navbar.component';
import {AmexioNavItemComponent} from './navbar/navitem.component';
import {AmexioNavMenuComponent} from './navbar/navmenu.component';
import {AmexioNavTextFieldComponent } from './navbar/navtextfield.component';
import {AmexioNotificationComponent} from './notification/notification.component';
import {AmexioSideNavComponent} from './sidenav/sidenav.component';
import {AmexioSideNavInnerNodeComponent} from './sidenav/sidenavinnernode.component';
import {SideNavNodeComponent} from './sidenav/sidenavnode.component';

import { AmexioBannerComponent } from './navbar/banner/banner.component';

import { AmexioCommonModule } from '../base/amexio.common.module';

export * from '../services/data/common.data.service';
export * from '../services/device/device.query.service';
export * from './sidenav/sidenav.component';
export * from './sidenav/sidenavnode.component';
export * from './navbar/navbar.component';
export * from './notification/notification.component';

const NAV_COMPONENTS = [
  AmexioSideNavComponent,
  SideNavNodeComponent,
  AmexioNavBarComponent,
  AmexioNavItemComponent,
  AmexioNotificationComponent,
  AmexioNavActionComponent,
  AmexioNavTextFieldComponent,
  AmexioNavMenuComponent,
  AmexioNavItemComponent,
  AmexioInnerNavMenuComponent,
  DockbarComponent,
  DockedBarToolComponent,
  AmexioMenuBarComponent,
  AmexioBreadcrumbComponent,
  AmexioSideNavInnerNodeComponent,
  AmexioBannerComponent,

];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AmexioMediaModule,
    AmexioLayoutModule,
    AmexioFormsModule,
    HttpClientModule,
    AmexioCommonModule.forRoot(),
  ],
  exports: NAV_COMPONENTS,
  declarations: NAV_COMPONENTS,
  providers: [CommonDataService, DeviceQueryService],
})
export class AmexioNavModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AmexioNavModule,
      providers: [CommonDataService, DeviceQueryService],
    };
  }
}
