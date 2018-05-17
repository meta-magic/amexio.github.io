import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import {AmexioFormsModule} from "./forms/amexio.forms.module";
import {CommonDataService} from "./services/data/common.data.service";
import {AmexioNavModule} from "./navigation/amexio.nav.module";
import {AmexioDataModule} from "./data/amexio.data.module";
import {DeviceQueryService} from "./services/device/device.query.service";
import {AmexioLayoutModule} from "./layout/amexio.layout.module";
import {AmexioMediaModule} from "./media/amexio.media.module";
import {IconLoaderService} from "./services/icon/icon.service";
import {AmexioPaneModule} from "./panes/amexio.pane.module";
import {HttpClientModule} from "@angular/common/http";
import { AmexioTabPill } from '../index';

export * from './services/data/common.data.service';
export * from './services/device/device.query.service';
export * from './services/icon/icon.service';
export * from './services/icon/icon.mapping.config';

@NgModule({
  imports: [
    CommonModule,
    AmexioFormsModule,
    AmexioNavModule,
    AmexioDataModule,
    AmexioLayoutModule,
    AmexioMediaModule,
    AmexioPaneModule,
    HttpClientModule
  ],
  entryComponents:[AmexioTabPill],
  exports: [
    AmexioFormsModule,
    AmexioNavModule,
    AmexioDataModule,
    AmexioLayoutModule,
    AmexioMediaModule,
    AmexioPaneModule
  ],
  declarations: [],
  providers : [CommonDataService,DeviceQueryService,IconLoaderService]
})
export class AmexioWidgetModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AmexioWidgetModule,
      providers: [CommonDataService,DeviceQueryService,IconLoaderService]
    };
  }
}
