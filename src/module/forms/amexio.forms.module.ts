/**
 * Created by pratik on 27/11/17.
 */
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AmexioSearchAdvanceComponent } from './advancesearch/searchadvance.component';
import { SearchboxtoolComponent } from './advancesearch/searchboxtool.component';
import { AmexioButtonDropdownComponent } from './button-dropdown/button.dropdown';
import { AmexioButtonDropDownItemComponent } from './button-dropdown/button.dropdown.item';
import { AmexioSpiltButtonDropdownComponent } from './button-dropdown/split.button.dropdown';
import { AmexioButtonGroupComponent } from './buttongroup/button.group.component';
import { AmexioButtonComponent } from './buttons/button.component';
import { CheckboxComponent } from './checkbox-group/checkbox.component';
import { AmexioCheckBoxGroupComponent } from './checkbox-group/checkbox.group.component';
import { AmexioCheckBoxComponent } from './checkbox/checkbox.component';
import { AmexioChipComponent } from './chip/chip.component';
import { AmexioChipsComponent } from './chips/chips.component';
import { AmexioCreditcardComponent } from './creditcard/creditcard.component';
import { DarkmodeComponent } from './darkmode/darkmode.component';
import { AmexioDateTimePickerComponent } from './datetimepicker/datetimepicker.component';
import { AmexioDropDownMenuComponent } from './dropdown-menu/dropdownmenu.component';
import { AmexioDropDownitemsComponent } from './dropdown-menu/dropdownmenu.component.items';
import { AmexioDropDownComponent } from './dropdown/dropdown.component';
import { AmexioEmailInputComponent } from './emailinput/emailinput.component';
import { AmexioFileUploadComponent } from './fileupload/fileupload.component';
import { AmexioFloatingButtonComponent } from './floatingbutton/floatingbutton.component';
import { AmexioFloatingGroupButtonComponent } from './floatinggroupbutton/floatinggroupbutton.component';
import { GeolocComponent } from './geolocation/geolocation.component';
import { AmexioLabelComponent } from './label/label.component';
import { AmexioMultipleDatePickerComponent } from './multidatepicker/multidatepicker.component';
import { AmexioNumberInputComponent } from './numberinput/numberinput.component';
import { AmexioPasswordComponent } from './passwordinput/passwordinput.component';
import { AmexioRadioGroupComponent } from './radio/radiogroup.component';
import { AmexioRangeSliderComponent } from './rangeslider/rangeslider.component';
import { AmexioRatingComponent } from './rating/rating.component';
import { RecaptchaComponent } from './recaptcha/recaptcha.component';
import { AmexioSliderComponent } from './slider/slider.component';
import { DomHandler } from './slider/slider.handler';
import { AmexioSpinnerComponent } from './spinner/spinner.component';
import { AmexioTagsInputComponent } from './tagsinput/tags.input.component';
import { AmexioTextAreaComponent } from './textarea/textarea.component';
import { AmexioTextInputComponent } from './textinput/textinput.component';
import { AmexioToggleComponent } from './toggle/toggle.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ToolBarActionComponent } from './toolbar/toolbaraction.component';
import { ToolbaroneComponent } from './toolbar/toolbarone.component';
import { AmexioTypeAheadComponent } from './typeahead/typeahead.component';

import { AmexioCommonModule } from '../base/amexio.common.module';

import { AmexioInputHelperComponent } from '../base/input.helper.component';
import { AmexioLayoutModule } from '../layout/amexio.layout.module';

import { CommonDataService } from '../services/data/common.data.service';
import { IconLoaderService } from '../services/icon/icon.service';

import { ScriptLoadService } from '../services/script/script.load.service';
import { AmexioBadgeComponent } from './badge/badge.component';
import { LoadRecaptchaService } from './recaptcha/load.recaptcha.service';
import { FacebookAuthComponent } from './socialmedia/facebookauth/facebook.auth.component';
import { GithubAuthComponent } from './socialmedia/githubauth/github.auth.component';
import { GoogleAuthComponent } from './socialmedia/googleauth/google.auth.component';
import { LinkedInAuthComponent } from './socialmedia/linkedinauth/linkedin.auth.component';
import { AmexioSocialComponent } from './socialmedia/social.component';

import { AmexioInputPatternDirective } from '../directive/input-mask';

export * from '../services/data/common.data.service';
export * from '../services/icon/icon.service';
export * from './recaptcha/load.recaptcha.service';
export * from './buttons/button.component';
export * from './buttongroup/button.group.component';
export * from '../services/script/script.load.service';

const FORM_COMPONENTS = [
  AmexioTextInputComponent,
  AmexioCheckBoxComponent,
  AmexioDropDownComponent,
  AmexioTypeAheadComponent,
  AmexioInputHelperComponent,
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
  CheckboxComponent,
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
  AmexioSpinnerComponent,
  AmexioCreditcardComponent,
  AmexioChipComponent,
  AmexioChipsComponent,
  GithubAuthComponent,
  GoogleAuthComponent,
  LinkedInAuthComponent,
  FacebookAuthComponent,
  AmexioSocialComponent,
  AmexioBadgeComponent,
  DarkmodeComponent,
  AmexioRangeSliderComponent,
  AmexioMultipleDatePickerComponent,
  GeolocComponent,
  AmexioInputPatternDirective,

];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AmexioLayoutModule,
    HttpClientModule,
    AmexioCommonModule.forRoot(),
  ],
  exports: FORM_COMPONENTS,
  declarations: FORM_COMPONENTS,
  providers: [CommonDataService, DomHandler, ScriptLoadService,
  ],
})
export class AmexioFormsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AmexioFormsModule,
      providers: [CommonDataService, LoadRecaptchaService, ScriptLoadService],
    };
  }
}
