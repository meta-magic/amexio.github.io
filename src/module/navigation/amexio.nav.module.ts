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
import {AmexioPaginatorComponent} from "./paginator/paginator.component";
import {DeviceQueryService} from "../services/device/device.query.service";

export * from '../services/data/common.data.service';
export * from '../services/device/device.query.service';
export * from './sidenav/sidenav.component';
export * from './sidenav/sidenavnode.component';
export * from './paginator/paginator.component';

const NAV_COMPONENTS = [
  AmexioPaginatorComponent,
  AmexioSideNav,
  SideNavNodeComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule
  ],
  exports: NAV_COMPONENTS,
  declarations: NAV_COMPONENTS
})
export class AmexioNavModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AmexioNavModule,
      providers: [CommonDataService,DeviceQueryService]
    };
  }
}
