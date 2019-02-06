
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DisplayFieldComponent } from './display-field/display-field.component';

const COMMON_COMPONENTS = [
  DisplayFieldComponent,
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
      providers: [],
    };
  }
}
