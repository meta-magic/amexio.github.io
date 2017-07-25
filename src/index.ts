import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {ButtonComponent} from './button/button.component';
import {CommonHttpService} from './common.http.service';
import {TextInputComponent} from './textinput/textinput.component';
import {ButtonDropdownComponent} from './buttondropdown/button.dropdown.component';
import {ButtonSplitDropdownComponent} from './buttondropdown/button.split.dropdown.component';
import {DropdownItemComponent} from './buttondropdown/dropdown.item.component';
import {ButtonGroupActionComponent} from './buttongroup/buttongroup.action.component';
import {ButtonGroupComponent} from './buttongroup/buttongroup.component';

export * from './button/button.component';
export * from './common.http.service';
export * from './textinput/textinput.component';
export * from './baseclass/form.base.class';

/*Button exports*/
export * from './buttongroup/buttongroup.action.component'
export * from './buttongroup/buttongroup.component';
export * from './buttondropdown/dropdown.item.component';
export * from './buttondropdown/button.dropdown.component';
export * from './buttondropdown/button.split.dropdown.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    ButtonComponent,
    TextInputComponent,
    ButtonDropdownComponent,
    ButtonSplitDropdownComponent,
    DropdownItemComponent,
    ButtonGroupActionComponent,
    ButtonGroupComponent
  ],
  exports: [
    ButtonComponent,
    TextInputComponent,
    ButtonDropdownComponent,
    ButtonSplitDropdownComponent,
    DropdownItemComponent,
    ButtonGroupActionComponent,
    ButtonGroupComponent
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
