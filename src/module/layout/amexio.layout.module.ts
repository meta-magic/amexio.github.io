/**
 * Created by pratik on 27/11/17.
 */
import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonDataService} from "../services/data/common.data.service";
import {HttpModule} from "@angular/http";
import {DeviceQueryService} from "../services/device/device.query.service";
import {AmexioRowComponent} from "./rows/row.component";
import {AmexioColumnComponent} from "./columns/column.component";
import {AmexioBorderLayoutItemComponent} from "./border/borderlayoutitem.component";
import {AmexioBorderLayoutComponent} from "./border/borderlayout.component";
import {AmexioCardComponent} from "./card/card.component";
import {AmexioAccordionTabComponent} from "./accordion/accordion.pane";
import {AmexioAccordionComponent} from "./accordion/accordion.component";
import {AccordionService} from "./accordion/accordion.service";

export * from '../services/data/common.data.service';
export * from '../services/device/device.query.service';

export * from './rows/row.component';
export * from './columns/column.component';
export * from './border/borderlayoutitem.component';
export * from './border/borderlayout.component';

export * from './accordion/accordion.pane';
export * from './accordion/accordion.component';
export * from './card/card.component';
export * from './accordion/accordion.service';


const LAYOUT_COMPONENTS = [
  AmexioRowComponent,
  AmexioColumnComponent,
  AmexioBorderLayoutItemComponent,
  AmexioBorderLayoutComponent,
  AmexioCardComponent,
  AmexioAccordionTabComponent,
  AmexioAccordionComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule
  ],
  exports: LAYOUT_COMPONENTS,
  declarations: LAYOUT_COMPONENTS,
  providers : [AccordionService]
})
export class AmexioLayoutModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AmexioLayoutModule,
      providers: [CommonDataService,DeviceQueryService,AccordionService]
    };
  }
}
