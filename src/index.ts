import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {ButtonComponent} from "./button/button.component";

export * from "./button/button.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    ButtonComponent
  ],
  exports: [
    ButtonComponent
  ]
})
export class AmexioWidgetModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AmexioWidgetModule,
      providers: []
    };
  }
}
