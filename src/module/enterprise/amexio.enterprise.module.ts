/**
 * Created by pratik on 27/11/17.
 */
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AmexioFormsModule } from '../forms/amexio.forms.module';
import { MultiMediaCarouselComponent } from './ee-carousel/ee.carousel.component';
import { ContentComponent } from './ee-content/ee.content';

import { CommonDataService } from '../services/data/common.data.service';
import { DeviceQueryService } from '../services/device/device.query.service';

import { AmexioWeekDayAvailiblityComponent } from './amexio-ee-appointment/amexio-ee-appointment.component';
import { AmexioYoutubePlayerComponent } from './youtube-player/youtube.player.component';

import { AmexioCommonModule } from '../base/amexio.common.module';
import { AmexioMediaModule } from '../media/amexio.media.module';
import { AmexioPaneModule } from '../panes/amexio.pane.module';
import { AmexioCreativeModule } from './../creative/amexio.creative.module';
import { AmexioCalendarComponent } from './calendar/calendar.component';
import { AmexioCalendarDayTimeWiseComponent } from './calendar/calendar.daytimewise.component';
import { AmexioCalendarMonthComponent } from './calendar/calendar.month';
import { AmexioCalendarYearComponent } from './calendar/calendar.year.component';
import { StepWizardComponent } from './stepwizard/stepwizard.component';
import { StepWizardItemComponent } from './stepwizard/stepwizard.item.component';
import { AmexioThemeSwitcherComponent } from './themeswitcher/amexio.themeswitcher.component';
import {TreeTabComponent} from './tree-tab/tree-tab.component';

import { AmexioThemeSwitcherService } from '../services/data/amexio.theme.service';

import { AmexioLayoutModule } from '../layout/amexio.layout.module';
import { AmexioNavModule } from '../navigation/amexio.nav.module';

export * from './ee-carousel/ee.carousel.component';
export * from './ee-content/ee.content';
export * from '../services/data/common.data.service';
export * from '../services/device/device.query.service';
export * from './youtube-player/youtube.player.component';
export * from './amexio-ee-appointment/amexio-ee-appointment.component';
export * from './calendar/calendar.component';
export * from './calendar/calendar.daytimewise.component';
export * from './calendar/calendar.month';
export * from './calendar/calendar.year.component';
export * from '../services/data/amexio.theme.service';
export * from './themeswitcher/amexio.themeswitcher.component';

const ENTERPRISE_COMPONENTS = [
  MultiMediaCarouselComponent,
  ContentComponent,
  AmexioYoutubePlayerComponent,
  AmexioWeekDayAvailiblityComponent,
  AmexioCalendarComponent,
  AmexioCalendarDayTimeWiseComponent,
  AmexioCalendarMonthComponent,
  AmexioCalendarYearComponent,
  AmexioThemeSwitcherComponent,
  StepWizardComponent,
  StepWizardItemComponent,
  TreeTabComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AmexioFormsModule,
    AmexioPaneModule,
    AmexioMediaModule,
    AmexioCreativeModule,
    AmexioCommonModule,
    HttpClientModule,
    AmexioNavModule,
    AmexioLayoutModule,

  ],
  exports: ENTERPRISE_COMPONENTS,
  declarations: ENTERPRISE_COMPONENTS,
  providers: [CommonDataService, DeviceQueryService, AmexioThemeSwitcherService],
})
export class AmexioEnterpriseModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AmexioEnterpriseModule,
      providers: [CommonDataService, DeviceQueryService, AmexioThemeSwitcherService],
    };
  }
}
