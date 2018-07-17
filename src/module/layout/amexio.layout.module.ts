/**
 * Created by pratik on 27/11/17.
 */

import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AmexioAccordionComponent} from './accordion/accordion.component';
import {AmexioAccordionTabComponent} from './accordion/accordion.pane';
import {AmexioBorderLayoutComponent} from './border/borderlayout.component';
import {AmexioBorderLayoutItemComponent} from './border/borderlayoutitem.component';
import {AmexioBoxComponent} from './box/box.component';
import {AmexioCardComponent} from './card/card.component';
import {AmexioColumnComponent} from './columns/column.component';
import {AmexioIconLayoutComponent} from './icon/icon.component';
import {AmexioRowComponent} from './rows/row.component';

import {CommonDataService} from '../services/data/common.data.service';
import {DeviceQueryService} from '../services/device/device.query.service';
import {IconLoaderService} from '../services/icon/icon.service';

export * from './accordion/accordion.pane';
export * from './accordion/accordion.component';
export * from './accordion/accordion.service';
export * from './border/borderlayoutitem.component';
export * from './border/borderlayout.component';
export * from './box/box.component';
export * from './card/card.component';
export * from './columns/column.component';
export * from './rows/row.component';
export * from '../services/data/common.data.service';
export * from '../services/device/device.query.service';
export * from '../services/icon/icon.service';
const LAYOUT_COMPONENTS = [
  AmexioRowComponent,
  AmexioColumnComponent,
  AmexioBorderLayoutItemComponent,
  AmexioBorderLayoutComponent,
  AmexioCardComponent,
  AmexioBoxComponent,
  AmexioAccordionTabComponent,
  AmexioAccordionComponent,
  AmexioIconLayoutComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
  ],
  exports: LAYOUT_COMPONENTS,
  declarations: LAYOUT_COMPONENTS,
  providers : [CommonDataService, DeviceQueryService, IconLoaderService],
})
export class AmexioLayoutModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AmexioLayoutModule,
      providers: [CommonDataService, DeviceQueryService, IconLoaderService],
    };
  }
}
