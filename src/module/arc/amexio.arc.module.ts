/**
 * Created by Ketan Gote on 22/02/2019
 */
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AmexioCommonModule } from '../base/amexio.common.module';
import { AmexioRuntimeComponent } from './amexioruntime.component';

export * from '../services/data/common.data.service';
export * from '../services/icon/icon.service';

const FORM_COMPONENTS = [
  AmexioRuntimeComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AmexioCommonModule.forRoot(),
  ],
  exports: FORM_COMPONENTS,
  declarations: FORM_COMPONENTS,
  providers: [],
})
export class AmexioRuntimeModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AmexioRuntimeModule,
      providers: [],
    };
  }
}
