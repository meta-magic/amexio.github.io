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
import {CheckBoxGroup} from "./checkgroup/checkbox.component";
import {DateTimeComponent} from "./datetimepicker/datetimepicker.component";
import {DropDownComponent} from "./dropdown/dropdown";
import {EmailInputComponent} from "./emailinput/emailinput.component";
import {NumberInputComponent} from "./numberinput/numberinput.component";
import {PasswordInputComponent} from "./passwordinput/passwordinput.component";
import {ProgressComponent} from "./progress/progress.component";
import {RadioGroupComponent} from "./radiogroup/radiogroup.component";
import {RatingInputComponent} from "./ratinginput/ratinginput.component";
import {TextAreaComponent} from "./textareainput/textareainput.component";
import {TypeAheadComponent} from "./typeahead/autocomplete.component";

export * from './button/button.component';
export * from './common.http.service';
export * from './textinput/textinput.component';
export * from './baseclass/form.base.class';
export * from './checkgroup/checkbox.component';
export * from './datetimepicker/datetimepicker.component';
export * from './dropdown/dropdown';
export * from './emailinput/emailinput.component';
export * from './numberinput/numberinput.component';
export * from './passwordinput/passwordinput.component';
export * from './progress/progress.component';
export * from './radiogroup/radiogroup.component';
export * from './ratinginput/ratinginput.component';
export * from './textareainput/textareainput.component';
export * from './typeahead/autocomplete.component';

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
    ButtonGroupComponent,
    CheckBoxGroup,
    DateTimeComponent,
    DropDownComponent,
    EmailInputComponent,
    NumberInputComponent,
    PasswordInputComponent,
    ProgressComponent,
    RadioGroupComponent,
    RatingInputComponent,
    TextAreaComponent,
    TypeAheadComponent
  ],
  exports: [
    ButtonComponent,
    TextInputComponent,
    ButtonDropdownComponent,
    ButtonSplitDropdownComponent,
    DropdownItemComponent,
    ButtonGroupActionComponent,
    ButtonGroupComponent,
    CheckBoxGroup,
    DateTimeComponent,
    DropDownComponent,
    EmailInputComponent,
    NumberInputComponent,
    PasswordInputComponent,
    ProgressComponent,
    RadioGroupComponent,
    RatingInputComponent,
    TextAreaComponent,
    TypeAheadComponent
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
