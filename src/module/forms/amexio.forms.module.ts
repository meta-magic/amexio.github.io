/**
 * Created by pratik on 27/11/17.
 */
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AmexioSearchAdvanceComponent} from './advancesearch/searchadvance.component';
import {SearchboxtoolComponent } from './advancesearch/searchboxtool.component';
import {AmexioButtonDropdownComponent} from './button-dropdown/button.dropdown';
import {AmexioButtonDropDownItemComponent} from './button-dropdown/button.dropdown.item';
import {AmexioSpiltButtonDropdownComponent} from './button-dropdown/split.button.dropdown';
import {AmexioButtonGroupComponent} from './buttongroup/button.group.component';
import {AmexioButtonComponent} from './buttons/button.component';
import {AmexioCheckBoxGroupComponent} from './checkbox-group/checkbox.group.component';
import {AmexioCheckBoxComponent} from './checkbox/checkbox.component';
import {AmexioDateTimePickerComponent} from './datetimepicker/datetimepicker.component';
import { AmexioDropDownMenuComponent } from './dropdown-menu/dropdownmenu.component';
import { AmexioDropDownitemsComponent} from './dropdown-menu/dropdownmenu.component.items';
import {AmexioDropDownComponent} from './dropdown/dropdown.component';
import {AmexioEmailInputComponent} from './emailinput/emailinput.component';
import {AmexioFileUploadComponent} from './fileupload/fileupload.component';
import { AmexioFloatingButtonComponent } from './floatingbutton/floatingbutton.component';
import { AmexioFloatingGroupButtonComponent } from './floatinggroupbutton/floatinggroupbutton.component';
import {AmexioFormIconComponent} from './icon/icon.component';
import {AmexioLabelComponent} from './label/label.component';
import {AmexioNumberInputComponent} from './numberinput/numberinput.component';
import {AmexioPasswordComponent} from './passwordinput/passwordinput.component';
import {AmexioRadioGroupComponent} from './radio/radiogroup.component';
import {AmexioRatingComponent} from './rating/rating.component';
import {RecaptchaComponent} from './recaptcha/recaptcha.component';
import {AmexioSliderComponent} from './slider/slider.component';
import {DomHandler} from './slider/slider.handler';
import {AmexioTagsInputComponent} from './tagsinput/tags.input.component';
import {AmexioTextAreaComponent} from './textarea/textarea.component';
import {AmexioTextInputComponent} from './textinput/textinput.component';
import {AmexioToggleComponent} from './toggle/toggle.component';
import { ToolbarComponent} from './toolbar/toolbar.component';
import {ToolBarActionComponent} from './toolbar/toolbaraction.component';
import { ToolbaroneComponent } from './toolbar/toolbarone.component';
import {AmexioTypeAheadComponent} from './typeahead/typeahead.component';

import {AmexioLayoutModule} from '../layout/amexio.layout.module';

import {CommonDataService} from '../services/data/common.data.service';
import {IconLoaderService} from '../services/icon/icon.service';

import { LoadRecaptchaService } from './recaptcha/load.recaptcha.service';

export * from '../services/data/common.data.service';
export * from '../services/icon/icon.service';
export * from './recaptcha/load.recaptcha.service';

const FORM_COMPONENTS = [
  AmexioTextInputComponent,
  AmexioCheckBoxComponent,
  AmexioDropDownComponent,
  AmexioTypeAheadComponent,
  AmexioRadioGroupComponent,
  AmexioEmailInputComponent,
  AmexioNumberInputComponent,
  AmexioPasswordComponent,
  AmexioTextAreaComponent,
  AmexioToggleComponent,
  AmexioRatingComponent,
  AmexioButtonComponent,
  AmexioButtonGroupComponent,
  AmexioButtonDropdownComponent,
  AmexioSpiltButtonDropdownComponent,
  AmexioButtonDropDownItemComponent,
  AmexioCheckBoxGroupComponent,
  AmexioFormIconComponent,
  AmexioSliderComponent,
  AmexioTagsInputComponent,
  AmexioDateTimePickerComponent,
  AmexioButtonDropDownItemComponent,
  AmexioButtonDropdownComponent,
  AmexioSpiltButtonDropdownComponent,
  AmexioFileUploadComponent,
  AmexioLabelComponent,
  AmexioFloatingButtonComponent,
  AmexioFloatingGroupButtonComponent,
  AmexioDropDownitemsComponent,
  AmexioDropDownMenuComponent,
  ToolbarComponent,
  ToolbaroneComponent,
  ToolBarActionComponent,
  SearchboxtoolComponent,
  AmexioSearchAdvanceComponent,
  RecaptchaComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AmexioLayoutModule,
    HttpClientModule,
  ],
  exports: FORM_COMPONENTS,
  declarations: FORM_COMPONENTS,
  providers: [CommonDataService, IconLoaderService, DomHandler],
})
export class AmexioFormsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AmexioFormsModule,
      providers: [CommonDataService, IconLoaderService, LoadRecaptchaService],
    };
  }
}
