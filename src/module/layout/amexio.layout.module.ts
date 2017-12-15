/**
 * Created by pratik on 27/11/17.
 */
import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonDataService} from "../services/data/common.data.service";
import {HttpModule} from "@angular/http";
import {DeviceQueryService} from "../services/device/device.query.service";
import {AmexioTabComponent} from "./tab/tab.component";
import {AmexioTabPill} from "./tab/tab.pill.component";
import {AmexioVerticalTabComponent} from "./tab/vertical-tab/vertical.tab.component";
import {AmexioRightVerticalTabComponent} from "./tab/right-vertical-tab/right.vertical.component";
import {AmexioFieldSetComponent} from "./fieldset/fieldset.component";

export * from '../services/data/common.data.service';
export * from '../services/device/device.query.service';

export * from './tab/tab.component';
export * from './tab/tab.pill.component';

export * from './tab/vertical-tab/vertical.tab.component';
export * from './tab/right-vertical-tab/right.vertical.component';

export * from './fieldset/fieldset.component';

const LAYOUT_COMPONENTS = [
  AmexioTabComponent,
  AmexioTabPill,
  AmexioVerticalTabComponent,
  AmexioRightVerticalTabComponent,
  AmexioFieldSetComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule
  ],
  exports: LAYOUT_COMPONENTS,
  declarations: LAYOUT_COMPONENTS
})
export class AmexioLayoutModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AmexioLayoutModule,
      providers: [CommonDataService,DeviceQueryService]
    };
  }
}
