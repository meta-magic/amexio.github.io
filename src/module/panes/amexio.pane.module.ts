/**
 * Created by pratik on 16/1/18.
 */
import {ModuleWithProviders, NgModule} from "@angular/core";
import {CommonDataService} from "../services/data/common.data.service";
import {DeviceQueryService} from "../services/device/device.query.service";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";/*
import {AmexioAccordionComponent} from "./accordion/accordion.component";
import {AmexioAccordionTabComponent} from "./accordion/accordion.pane";*/
// import {AmexioCardComponent} from "./card/card.component";
import {AmexioHeaderComponent} from "./header/pane.action.header";
import {AmexioFooterComponent} from "./action/pane.action.footer";
import {AmexioBodyComponent} from "./body/pane.action.body";
import {AmexioFieldSetComponent} from "./fieldset/fieldset.component";
import {AmexioWindowPaneComponent} from "./window/window.pane.component";
import {AmexioStepsComponent} from "./steps/steps.component";
import {AmexioTabComponent} from "./tab/tab.component";
import {AmexioTabPill} from "./tab/tab.pill.component";
import {AmexioVerticalTabComponent} from "./tab/vertical-tab/vertical.tab.component";
import {AmexioRightVerticalTabComponent} from "./tab/right-vertical-tab/right.vertical.component";
import {AmexioCarouselComponent} from "./carousel/carousel.component";
import {AmexioTemplate, AmexioTemplateWrapper} from "./carousel/carousel.template";
import {StepBlockComponent} from "./steps/step-block";
import {IconLoaderService} from "../services/icon/icon.service";
import {AmexioIconPane} from "./icon/icon.component";
import {AmexiodialoguePaneComponent} from "./dialogue/dialogue.pane.component";
import {AmexioFormsModule} from "../forms/amexio.forms.module";
import {AmexioPanelComponent} from "./panel/panel.component";

/*export * from './accordion/accordion.component';
export * from './accordion/accordion.pane';

export * from './card/card.component';*/

export * from './header/pane.action.header';
export * from './action/pane.action.footer';
export * from './body/pane.action.body';

export * from './fieldset/fieldset.component';

export * from './window/window.pane.component';
export * from './dialogue/dialogue.pane.component';

export * from './steps/steps.component';
export * from './steps/step-block';

export * from './tab/tab.pill.component';
export * from './tab/tab.component';
export * from './tab/right-vertical-tab/right.vertical.component';
export * from './tab/vertical-tab/vertical.tab.component';

export * from './carousel/carousel.component';
export * from './carousel/carousel.template';
export * from '../services/icon/icon.service';

const PANE_COMPONENTS = [
  AmexioHeaderComponent,
  AmexioFooterComponent,
  AmexioBodyComponent,
  AmexioFieldSetComponent,
  AmexioWindowPaneComponent,
  AmexioStepsComponent,
  AmexioTabPill,
  AmexioTabComponent,
  AmexioVerticalTabComponent,
  AmexioRightVerticalTabComponent,
  AmexioCarouselComponent,
  AmexioTemplate,
  AmexioTemplateWrapper,
  StepBlockComponent,
  AmexioPanelComponent,
  AmexioIconPane,
  AmexiodialoguePaneComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AmexioFormsModule,
    HttpModule
  ],
  exports: PANE_COMPONENTS,
  declarations: PANE_COMPONENTS
})
export class AmexioPaneModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AmexioPaneModule,
      providers: [CommonDataService,DeviceQueryService,IconLoaderService]
    };
  }
}
