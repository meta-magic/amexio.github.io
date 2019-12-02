import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DisplayFieldService } from './services/data/display.field.service';

import { DisplayFieldComponent } from './base/display-field/display-field.component';
import { DropDownListComponent } from './base/dropdownlist.component';

import { CommonIconComponent } from './base/components/common.icon.component';
import { FilterPipe } from './pipe/filter.pipe';
import { IconLoaderService } from './services/icon/icon.service';

import { ColorPaletteDirective } from './directive/color.palette.directive';

export * from './services/data/display.field.service';

const COMMON_COMPONENTS = [
  DisplayFieldComponent,
  DropDownListComponent,
  FilterPipe,
  CommonIconComponent,
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
export class AmexioNgExtensionsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AmexioNgExtensionsModule,
      providers: [IconLoaderService, DisplayFieldService],
    };
  }
}
