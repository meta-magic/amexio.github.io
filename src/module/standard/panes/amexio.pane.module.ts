/**
 * Created by pratik on 16/1/18.
 */
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AmexioTemplateDirective } from '../../directive/carousel.template.directive';
import { AmexioTemplateWrapperDirective } from '../../directive/carousel.wrapper.template.directive';
import { AmexioFooterComponent } from './action/pane.action.footer';
import { AmexioBodyComponent } from './body/pane.action.body';
import { AmexioCarouselComponent } from './carousel/carousel.component';
import { AmexiodialoguePaneComponent } from './dialogue/dialogue.pane.component';
import { AmexioFieldSetComponent } from './fieldset/fieldset.component';
import { AmexioFloatingPanelComponent } from './floatingpanel/floatingpanel.component';
import { AmexioFormActionComponent } from './form/form.action.component';
import { AmexioFormBodyComponent } from './form/form.body.component';
import { AmexioFormComponent } from './form/form.component';
import { AmexioFormHeaderComponent } from './form/form.header.component';
import { AmexioHeaderComponent } from './header/pane.action.header';
import { AmexioPanelComponent } from './panel/panel.component';
import { AmexioPanelHeaderComponent } from './panel/panel.header.component';
import { AmexioStepsComponent } from './steps/steps.component';
import { AmexioRightVerticalTabComponent } from './tab/right-vertical-tab/right.vertical.component';
import { AmexioTabActionComponent } from './tab/tab.action';
import { AmexioTabComponent } from './tab/tab.component';
import { AmexioTabPillComponent } from './tab/tab.pill.component';
import { AmexioVerticalTabComponent } from './tab/vertical-tab/vertical.tab.component';
import { AmexiotimelineComponent } from './timeline/amexiotimeline.component';
import { AmexiotimelineeventComponent } from './timeline/amexiotimelineevent.component';
import { MinimizeWindowComponent } from './window/minimize.window.component';
import { AmexioWindowPaneComponent } from './window/window.pane.component';
import { AmexioWindowHeaderComponent } from './window/window.pane.header.component';

import { AmexioFormGroupDirective } from '../../directive/form.group.directive';
import { CommonDataService } from '../../services/data/common.data.service';
import { DeviceQueryService } from '../../services/device/device.query.service';
import { IconLoaderService } from '../../services/icon/icon.service';

import { AmexioFormsModule } from '../forms/amexio.forms.module';

import { AmexioCommonModule } from '../../base/amexio.common.module';
import { OverlayContainerComponent } from './overlay/overlay.component';

import { AmexioBaseContextMenuModule } from '../../base/base.contextmenu.component.module';
import { PanelItemComponent } from './slidingpanel/panelitem.component';
import { SlidingPanelComponent } from './slidingpanel/slidingpanel.component';

import { StackableItemComponent } from './stackablepanel/stackablepanel-item/stackablepanel-item.component';
import { StackablePanelComponent } from './stackablepanel/stackablepanel/stackablepanel.component';
import { StepBlockComponent } from './steps/step-block.component';

import { AmexioMediaModule } from '../media/amexio.media.module';

export * from './action/pane.action.footer';
export * from './body/pane.action.body';
export * from './carousel/carousel.component';
export * from '../../directive/carousel.template.directive';
export * from '../../directive/carousel.wrapper.template.directive';
export * from './dialogue/dialogue.pane.component';
export * from './fieldset/fieldset.component';
export * from './form/form.action.component';
export * from './form/form.body.component';
export * from './form/form.component';
export * from './form/form.header.component';
export * from './header/pane.action.header';
export * from './panel/panel.header.component';
export * from './stackablepanel/stackablepanel-item/stackablepanel-item.component';
export * from './stackablepanel/stackablepanel/stackablepanel.component';
export * from './steps/steps.component';
export * from './steps/step-block.component';
export * from './tab/right-vertical-tab/right.vertical.component';
export * from './tab/tab.action';
export * from './tab/tab.component';
export * from './tab/tab.pill.component';
export * from './tab/vertical-tab/vertical.tab.component';
export * from './timeline/amexiotimeline.component';
export * from './timeline/amexiotimelineevent.component';
export * from './window/window.pane.component';
export * from './window/window.pane.header.component';
export * from './window/minimize.window.component';
export * from './overlay/overlay.component';
export * from '../../directive/form.group.directive';
export * from '../../services/icon/icon.service';

const PANE_COMPONENTS = [
  AmexioHeaderComponent,
  AmexioFooterComponent,
  AmexioBodyComponent,
  AmexioFieldSetComponent,
  AmexioFloatingPanelComponent,
  AmexioWindowPaneComponent,
  AmexioWindowHeaderComponent,
  AmexioStepsComponent,
  AmexioTabPillComponent,
  AmexioTabComponent,
  AmexioVerticalTabComponent,
  AmexioRightVerticalTabComponent,
  AmexioCarouselComponent,
  AmexioTemplateDirective,
  AmexioTemplateWrapperDirective,
  StepBlockComponent,
  AmexioPanelComponent,
  AmexioPanelHeaderComponent,
  AmexiodialoguePaneComponent,
  AmexioFormComponent,
  AmexioFormActionComponent,
  AmexioFormHeaderComponent,
  AmexioFormBodyComponent,
  AmexioFormGroupDirective,
  AmexioTabActionComponent,
  AmexiotimelineComponent,
  AmexiotimelineeventComponent,
  OverlayContainerComponent,
  PanelItemComponent,
  SlidingPanelComponent,
  MinimizeWindowComponent,
  StackablePanelComponent,
  StackableItemComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AmexioFormsModule,
    HttpClientModule,
    AmexioBaseContextMenuModule,
    AmexioCommonModule,
    AmexioMediaModule,
  ],
  entryComponents: [AmexioTabPillComponent, MinimizeWindowComponent],
  exports: PANE_COMPONENTS,
  declarations: PANE_COMPONENTS,
  providers: [CommonDataService, DeviceQueryService, IconLoaderService],
})
export class AmexioPaneModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AmexioPaneModule,
      providers: [CommonDataService, DeviceQueryService, IconLoaderService],
    };
  }
}
