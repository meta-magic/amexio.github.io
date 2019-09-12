import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DisplayFieldService } from '../services/data/display.field.service';

import { DisplayFieldComponent } from './display-field/display-field.component';
import { DropDownListComponent } from './dropdownlist.component';

import { FilterPipe } from '../pipe/filter.pipe';
import { IconLoaderService } from '../services/icon/icon.service';
import { CommonIconComponent } from './components/common.icon.component';

import { BaseInputEventComponent } from './base.inputevent.component';
import { LifeCycleBaseComponent } from './lifecycle.base.component';

import { ListBaseDatepickerComponent } from './list.base.datepicker.component';

import { ColorPaletteDirective } from '../directive/color-palette.directive';

export * from '../services/data/display.field.service';

const COMMON_COMPONENTS = [
  DisplayFieldComponent,
  DropDownListComponent,
  FilterPipe,
  CommonIconComponent,
  ListBaseDatepickerComponent,
  LifeCycleBaseComponent,
  BaseInputEventComponent,
  ColorPaletteDirective,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
  ],
  exports: COMMON_COMPONENTS,
  declarations: COMMON_COMPONENTS,
  providers: [],
})
export class AmexioCommonModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AmexioCommonModule,
      providers: [IconLoaderService, DisplayFieldService],
    };
  }
}
