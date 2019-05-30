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
import { AmexioHomePageComponent } from './../creative/homepage/homepage.component';

import { AmexioCarouselCEComponent } from './carousel/amexio.carouselce.component';
import {ColorPaletteComponent} from './colorpicker/colorpalette/colorpalette.component';
import {ColorPickerComponent} from './colorpicker/colorpicker.component';
import {ColorsliderComponent} from './colorpicker/colorslider/colorslider.component';
import { AmexioMenuCEComponent } from './menu/menu.component';
import { AmexioProgressCEComponent } from './progressbar/progressce.component';

import { AmexioMediaModule } from '../media/amexio.media.module';

import { AmexioCardCEComponent } from './../creative/card/amexio.cards.component';
import { AmexioCardCEActionComponent } from './../creative/common/amexio.action.component';
import { AmexioCardCEBodyComponent } from './../creative/common/amexio.body.component';
import { AmexioCardCEHeaderComponent } from './../creative/common/amexio.header.component';

import { AmexioCommonModule } from '../base/amexio.common.module';
import { AmexioFormCEComponent } from './../creative/form/amexio.form.component';
import { AmexioFormActionCEComponent } from './../creative/form/form.action.component';

import { AmexioHomePageCenterPanelComponent } from './../creative/homepage/homepage.centerpanel.component';
import { AmexioHomePageEastPanelComponent } from './../creative/homepage/homepage.eastpanel.component';
import { AmexioHomePageNorthPanelComponent } from './../creative/homepage/homepage.northpanel.component';
import { AmexioHomePageWestPanelComponent } from './../creative/homepage/homepage.westpanel.component';

import { ViewportBackgroundComponent } from './../creative/viewport/viewport.background/viewport.background.component';
import { ViewportContentBodyComponent } from './../creative/viewport/viewport.content.body/viewport.content.body.component';
import { ViewportContentComponent } from './../creative/viewport/viewport.content/viewport.content.component';
import { ViewportComponent } from './../creative/viewport/viewport/viewport.component';
import { AmexioFormsModule } from './../forms/amexio.forms.module';
import { AmexioLayoutModule } from './../layout/amexio.layout.module';
import { AmexioNavModule } from './../navigation/amexio.nav.module';
import { AmexioPaneModule } from './../panes/amexio.pane.module';

import { AmexioWindowCEComponent } from './../creative/window/amexio.window.component';

import { IconLoaderService } from '../services/icon/icon.service';

export * from './../creative/common/amexio.action.component';
export * from './../creative/common/amexio.body.component';
export * from './../creative/card/amexio.cards.component';
export * from './../creative/common/amexio.header.component';
export * from './../creative/form/form.action.component';
export * from './../creative/form/amexio.form.component';
export * from './homepage/homepage.centerpanel.component';
export * from './homepage/homepage.eastpanel.component';
export * from './homepage/homepage.northpanel.component';
export * from './homepage/homepage.westpanel.component';
export * from './homepage/homepage.component';
export * from './../creative/window/amexio.window.component';

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
    AmexioCommonModule.forRoot(),
  ],
  exports: CREATIVE_COMPONENTS,
  declarations: CREATIVE_COMPONENTS,
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
