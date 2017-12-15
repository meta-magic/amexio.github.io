import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import {AmexioFormsModule} from "./forms/amexio.forms.module";
import {CommonDataService} from "./services/data/common.data.service";
import {AmexioNavModule} from "./navigation/amexio.nav.module";
import {AmexioDataModule} from "./data/amexio.data.module";
import {DeviceQueryService} from "./services/device/device.query.service";
import {AmexioLayoutModule} from "./layout/amexio.layout.module";

export * from './services/data/common.data.service';
export * from './services/device/device.query.service';

@NgModule({
  imports: [
    CommonModule,
    AmexioFormsModule,
    AmexioNavModule,
    AmexioDataModule,
    AmexioLayoutModule
  ],
  exports: [],
  declarations: []
})
export class AmexioWidgetModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AmexioWidgetModule,
      providers: [CommonDataService,DeviceQueryService]
    };
  }
}
