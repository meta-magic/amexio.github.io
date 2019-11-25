/*
* Copyright [2019] [Metamagic]
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
*  Created by sagar on 4/02/2019.
*/
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AmexioHomePageComponent } from './homepage/homepage.component';

import { AmexioCarouselCEComponent } from './carousel/amexio.carouselce.component';
import { ColorPaletteComponent } from './colorpicker/colorpalette/colorpalette.component';
import { ColorPickerComponent } from './colorpicker/colorpicker.component';
import { ColorsliderComponent } from './colorpicker/colorslider/colorslider.component';
import { AmexioMenuCEComponent } from './menu/menu.component';
import { AmexioProgressCEComponent } from './progressbar/progressce.component';
import { CeMinimizeWindowComponent } from './window/ceMinimize.window.component';

import { AmexioMediaModule } from '../standard/media/amexio.media.module';

import { AmexioCardCEComponent } from './card/amexio.cards.component';
import { AmexioCardCEActionComponent } from './common/amexio.action.component';
import { AmexioCardCEBodyComponent } from './common/amexio.body.component';
import { AmexioCardCEHeaderComponent } from './common/amexio.header.component';

import { AmexioNgExtensionsModule } from '../amexio-ng-extensions.module';
import { AmexioFormCEComponent } from './form/amexio.form.component';
import { AmexioFormActionCEComponent } from './form/form.action.component';

import { AmexioHomePageCenterPanelComponent } from './homepage/homepage.centerpanel.component';
import { AmexioHomePageEastPanelComponent } from './homepage/homepage.eastpanel.component';
import { AmexioHomePageNorthPanelComponent } from './homepage/homepage.northpanel.component';
import { AmexioHomePageWestPanelComponent } from './homepage/homepage.westpanel.component';

import { AmexioFormsModule } from '../standard/forms/amexio.forms.module';
import { AmexioLayoutModule } from '../standard/layout/amexio.layout.module';
import { AmexioNavModule } from '../standard/navigation/amexio.nav.module';
import { AmexioPaneModule } from '../standard/panes/amexio.pane.module';
import { ViewportBackgroundComponent } from './viewport/viewport.background/viewport.background.component';
import { ViewportContentBodyComponent } from './viewport/viewport.content.body/viewport.content.body.component';
import { ViewportContentComponent } from './viewport/viewport.content/viewport.content.component';
import { ViewportComponent } from './viewport/viewport/viewport.component';

import { AmexioWindowCEComponent } from './window/amexio.window.component';

import { IconLoaderService } from '../services/icon/icon.service';

export * from './common/amexio.action.component';
export * from './common/amexio.body.component';
export * from './card/amexio.cards.component';
export * from './common/amexio.header.component';
export * from './form/form.action.component';
export * from './form/amexio.form.component';
export * from './homepage/homepage.centerpanel.component';
export * from './homepage/homepage.eastpanel.component';
export * from './homepage/homepage.northpanel.component';
export * from './homepage/homepage.westpanel.component';
export * from './homepage/homepage.component';
export * from './window/amexio.window.component';

const CREATIVE_COMPONENTS = [
  AmexioCardCEHeaderComponent,
  AmexioCardCEBodyComponent,
  AmexioCardCEActionComponent,
  AmexioCardCEComponent,
  AmexioFormActionCEComponent,
  AmexioFormCEComponent,
  AmexioProgressCEComponent,
  AmexioHomePageComponent,
  AmexioHomePageCenterPanelComponent,
  AmexioHomePageEastPanelComponent,
  AmexioHomePageNorthPanelComponent,
  AmexioHomePageWestPanelComponent,
  AmexioWindowCEComponent,
  CeMinimizeWindowComponent,
  ColorPickerComponent,
  ColorPaletteComponent,
  ColorsliderComponent,
  ViewportComponent,
  ViewportBackgroundComponent,
  ViewportContentComponent,
  ViewportContentBodyComponent,
  AmexioCarouselCEComponent,
  AmexioMenuCEComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AmexioFormsModule,
    AmexioNavModule,
    AmexioLayoutModule,
    AmexioPaneModule,
    AmexioMediaModule,
    AmexioNgExtensionsModule.forRoot(),
  ],
  exports: CREATIVE_COMPONENTS,
  declarations: CREATIVE_COMPONENTS,
  entryComponents: [CeMinimizeWindowComponent],
  providers: [IconLoaderService],
})
export class AmexioCreativeModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AmexioCreativeModule,
      providers: [IconLoaderService],
    };
  }
}
