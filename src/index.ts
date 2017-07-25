import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {ButtonComponent} from "./button/button.component";
import {CommonHttpService} from "./common.http.service";
import {TextInputComponent} from "./textinput/textinput.component";

export * from "./button/button.component";
export * from './common.http.service';
export * from './textinput/textinput.component';
export * from './baseclass/form.base.class';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    ButtonComponent,
    TextInputComponent
  ],
  exports: [
    ButtonComponent,
    TextInputComponent
  ]
})
export class AmexioWidgetModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AmexioWidgetModule,
      providers: [CommonHttpService]
    };
  }
}
