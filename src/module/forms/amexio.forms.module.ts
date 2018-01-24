/**
 * Created by pratik on 27/11/17.
 */
import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonDataService} from "../services/data/common.data.service";
import {AmexioTextInputComponent} from "./textinput/textinput.component";
import {AmexioCheckBoxComponent} from "./checkbox/checkbox.component";
import {AmexioDropDownComponent} from "./dropdown/dropdown.component";
import {AmexioTypeAheadComponent} from "./typeahead/typeahead.component";
import {HttpModule} from "@angular/http";
import {AmexioRadioGroupComponent} from "./radio/radiogroup.component";
import {AmexioEmailInputComponent} from "./emailinput/emailinput.component";
import {AmexioNumberInputComponent} from "./numberinput/numberinput.component";
import {AmexioPasswordComponent} from "./passwordinput/passwordinput.component";
import {AmexioTextAreaComponent} from "./textarea/textarea.component";
import {AmexioToggleComponent} from "./toggle/toggle.component";
import {AmexioRatingComponent} from "./rating/rating.component";
import {AmexioButtonComponent} from "./buttons/button.component";
import {AmexioButtonGroupComponent} from "./buttongroup/button.group.component";
import {AmexioCheckBoxGroupComponent} from "./checkbox-group/checkbox.group.component";
import {AmexioLayoutModule} from "../layout/amexio.layout.module";
import {AmexioFormIconComponent} from "./icon/icon.component";
import {IconLoaderService} from "../services/icon/icon.service";
import {AmexioSliderComponent} from "./slider/slider.component";
import {AmexioTagsInputComponent} from "./tagsinput/tags.input.component";
import {AmexioDateTimePicker} from "./datetimepicker/datetimepicker.component";
import {AmexioButtonDropdownComponent} from "./button-dropdown/button.dropdown";
import {AmexioSpiltButtonDropdownComponent} from "./button-dropdown/split.button.dropdown";
import {AmexioButtonDropDownItemComponent} from "./button-dropdown/button.dropdown.item";
import {AmexioFileUploadComponent} from "./fileupload/fileupload.component";
export * from '../services/data/common.data.service';
export * from '../services/icon/icon.service';

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
  AmexioDateTimePicker,
  AmexioButtonDropDownItemComponent,
  AmexioButtonDropdownComponent,
  AmexioSpiltButtonDropdownComponent,
  AmexioFileUploadComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    AmexioLayoutModule
  ],
  exports: FORM_COMPONENTS,
  declarations: FORM_COMPONENTS
})
export class AmexioFormsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AmexioFormsModule,
      providers: [CommonDataService,IconLoaderService]
    };
  }
}
