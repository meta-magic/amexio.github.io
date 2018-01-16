/**
 * Created by pratik on 16/1/18.
 */
import {ModuleWithProviders, NgModule} from "@angular/core";
import {CommonDataService} from "../services/data/common.data.service";
import {DeviceQueryService} from "../services/device/device.query.service";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AmexioAccordionComponent} from "./accordion/accordion.component";
import {AmexioAccordionTabComponent} from "./accordion/accordion.pane";
import {AmexioCardComponent} from "./card/card.component";
import {AmexioHeaderComponent} from "./header/pane.action.header";
import {AmexioFooterComponent} from "./action/pane.action.footer";
import {AmexioBodyComponent} from "./body/pane.action.body";
import {AmexioFieldSetComponent} from "./fieldset/fieldset.component";

export * from './accordion/accordion.component';
export * from './accordion/accordion.pane';

export * from './card/card.component';

export * from './header/pane.action.header';
export * from './action/pane.action.footer';
export * from './body/pane.action.body';

export * from './fieldset/fieldset.component';

const PANE_COMPONENTS = [
  AmexioAccordionComponent,
  AmexioAccordionTabComponent,
  AmexioCardComponent,
  AmexioHeaderComponent,
  AmexioFooterComponent,
  AmexioBodyComponent,
  AmexioFieldSetComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule
  ],
  exports: PANE_COMPONENTS,
  declarations: PANE_COMPONENTS
})
export class AmexioPaneModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AmexioPaneModule,
      providers: [CommonDataService,DeviceQueryService]
    };
  }
}
