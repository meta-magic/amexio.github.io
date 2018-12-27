
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonDataService} from '../services/data/common.data.service';
import {IconLoaderService} from '../services/icon/icon.service';

import { AmexioContextMenuComponent } from './base.contextmenu.component';

export * from '../services/data/common.data.service';
export * from '../services/icon/icon.service';

const CONTEXTMENU_COMPONENTS = [
    AmexioContextMenuComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
  ],
  exports: CONTEXTMENU_COMPONENTS,
  declarations: CONTEXTMENU_COMPONENTS,
  providers: [CommonDataService, IconLoaderService],
})
export class AmexioBaseContextMenuModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AmexioBaseContextMenuModule,
      providers: [CommonDataService, IconLoaderService],
    };
  }
}
