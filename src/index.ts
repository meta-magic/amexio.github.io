/*
 * Copyright 2016-2017 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Author - Ketan Gote, Pratik Kelwalkar, Dattaram Gawas
 *
 */

import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AmexioTextInputModule} from './bootstrap3/textinput/textinput.module';
import {TextInputComponent} from './bootstrap3/textinput/textinput.component';
import {WidgetService} from "./bootstrap3/shared/widget.shared.service";
import {AmexioTreeModule} from "./bootstrap3/treeview/treeview.module";
import {AmexioTreeTableModule} from "./bootstrap3/treedatatable/treetable.module";
import { TreeDataTableComponent } from './bootstrap3/treedatatable/treedatatable.component';
import { TreeDataTableService } from './bootstrap3/treedatatable/treedatatable.service';
import { TreeViewComponent } from './bootstrap3/treeview/treeview.component';
import { TreeViewService } from './bootstrap3/treeview/treeview.service';
import {AmexioBtnModule} from "./bootstrap3/button/button.module";
import {AmexioBtnDropdownModule} from "./bootstrap3/buttondropdown/button.dropdown.module";
import {AmexioBtnGroupModule} from "./bootstrap3/buttongroup/buttongroup.module";
import {AmexioCarouselModule} from "./bootstrap3/carousel/carousel.module";
import {AmexioCheckBoxModule} from "./bootstrap3/checkgroup/checkbox.module";
import {AmexioDataTableModule} from "./bootstrap3/datatable/datatable.module";
import {AmexioDateTimeModule} from "./bootstrap3/datetimepicker/datetimepicker.module";
import {AmexioDropDownModule} from "./bootstrap3/dropdown/dropdown.module";
import {AmexioEmailModule} from "./bootstrap3/emailinput/emailinput.module";
import {AmexioFileUploadModule} from "./bootstrap3/fileupload/fileupload.module";
import {AmexioHiddenModule} from "./bootstrap3/hiddeninput/hiddeninput.module";
import {AmexioItemSelectorModule} from "./bootstrap3/itemselector/itemselector.module";
import {AmexioNumberModule} from "./bootstrap3/numberinput/numberinput.module";
import {AmexioPasswordModule} from "./bootstrap3/passwordinput/passwordinput.module";
import {AmexioProgressModule} from "./bootstrap3/progress/progress.module";
import {AmexioRadioModule} from "./bootstrap3/radiogroup/radiogroup.module";
import {AmexioRatingModule} from "./bootstrap3/ratinginput/ratinginput.module";
import {AmexioTabPaneModule} from "./bootstrap3/tabpane/tabpane.module";
import {AmexioTextAreaModule} from "./bootstrap3/textareainput/textareainput.module";
import {ButtonComponent} from './bootstrap3/button/button.component';
import {ButtonDropdownComponent} from './bootstrap3/buttondropdown/button.dropdown.component';
import {ItemComponent} from './bootstrap3/buttondropdown/dropdown.item.component';
import {ButtonGroupComponent} from './bootstrap3/buttongroup/buttongroup.component';
import {ButtonGroupActionComponent} from './bootstrap3/buttongroup/buttongroup.action.component';
import {CarouselComponent} from './bootstrap3/carousel/carousel.component';
import {CarouselService} from './bootstrap3/carousel/carousel.service';
import {CheckBoxComponent} from './bootstrap3/checkgroup/checkbox.component';
import {CheckBoxService} from './bootstrap3/checkgroup/checkbox.service';
import {DataTableComponent} from './bootstrap3/datatable/datatable.component';
import {ColumnComponent} from './bootstrap3/datatable/column.component';
import {DataTableService} from './bootstrap3/datatable/datatable.service';
import {DateTimeComponent} from './bootstrap3/datetimepicker/datetimepicker.component';
import {DropDownComponent} from './bootstrap3/dropdown/dropdown.component';
import {DropDownService} from './bootstrap3/dropdown/dropdown.service';
import {EmailInputComponent} from './bootstrap3/emailinput/emailinput.component';
import {FileuploadComponent} from './bootstrap3/fileupload/fileupload.component';
import {FileUploadService} from './bootstrap3/fileupload/fileupload.service';
import {HiddenInputComponent} from './bootstrap3/hiddeninput/hiddeninput.component';
import {ItemSelectorComponent} from './bootstrap3/itemselector/itemselector.component';
import {ItemSelectorService} from './bootstrap3/itemselector/itemselector.service';
import {NumberInputComponent} from './bootstrap3/numberinput/numberinput.component';
import {PasswordInputComponent} from './bootstrap3/passwordinput/passwordinput.component';
import {ProgressComponent} from './bootstrap3/progress/progress.component';
import {RadioGroupComponent} from './bootstrap3/radiogroup/radiogroup.component';
import {RadioGroupService} from './bootstrap3/radiogroup/radiogroup.service';
import {RatingInputComponent} from './bootstrap3/ratinginput/ratinginput.component';
import {TabPaneComponent} from './bootstrap3/tabpane/tabpane.component';
import {TabComponent} from './bootstrap3/tabpane/tabpill.component';
import {TextAreaComponent} from './bootstrap3/textareainput/textareainput.component';
import { FormInputBase } from './bootstrap3/baseclass/form.base.class';

export { AmexioTextInputModule , TextInputComponent }
export { AmexioTreeTableModule , TreeDataTableComponent , TreeDataTableService}
export { AmexioTreeModule , TreeViewComponent, TreeViewService}
export { AmexioBtnModule,ButtonComponent}
export { AmexioBtnDropdownModule,ButtonDropdownComponent,ItemComponent}
export { AmexioBtnGroupModule,ButtonGroupComponent,ButtonGroupActionComponent}
export { AmexioCarouselModule,CarouselComponent,CarouselService}
export { AmexioCheckBoxModule,CheckBoxComponent,CheckBoxService}
export { AmexioDataTableModule,DataTableComponent,ColumnComponent,DataTableService}
export { AmexioDateTimeModule,DateTimeComponent}
export { AmexioDropDownModule,DropDownComponent,DropDownService}
export { AmexioEmailModule,EmailInputComponent}
export { AmexioFileUploadModule,FileuploadComponent,FileUploadService}
export { AmexioHiddenModule,HiddenInputComponent}
export { AmexioItemSelectorModule,ItemSelectorComponent,ItemSelectorService}
export { AmexioNumberModule,NumberInputComponent}
export { AmexioPasswordModule,PasswordInputComponent}
export { AmexioProgressModule,ProgressComponent}
export { AmexioRadioModule,RadioGroupComponent,RadioGroupService}
export { AmexioRatingModule,RatingInputComponent}
export { AmexioTabPaneModule,TabPaneComponent,TabComponent}
export { AmexioTextAreaModule,TextAreaComponent}
export { WidgetService , FormInputBase }



const MODULES = [
    AmexioTextInputModule, AmexioTreeTableModule , AmexioTreeModule,
    AmexioBtnModule,
    AmexioBtnDropdownModule,
    AmexioBtnGroupModule,
    AmexioCarouselModule,
    AmexioCheckBoxModule,
    AmexioDataTableModule,
    AmexioDateTimeModule,
    AmexioDropDownModule,
    AmexioEmailModule,
    AmexioFileUploadModule,
    AmexioHiddenModule,
    AmexioItemSelectorModule,
    AmexioNumberModule,
    AmexioPasswordModule,
    AmexioProgressModule,
    AmexioRadioModule,
    AmexioRatingModule,
    AmexioTabPaneModule,
    AmexioTextAreaModule,
];

@NgModule({
  imports: [
    CommonModule, FormsModule, HttpModule,
    AmexioTextInputModule.forRoot(),
    AmexioTreeModule.forRoot(),
    AmexioTreeTableModule.forRoot(),
    AmexioBtnModule.forRoot(),
    AmexioBtnDropdownModule.forRoot(),
    AmexioBtnGroupModule.forRoot(),
    AmexioCarouselModule.forRoot(),
    AmexioCheckBoxModule.forRoot(),
    AmexioDataTableModule.forRoot(),
    AmexioDateTimeModule.forRoot(),
    AmexioDropDownModule.forRoot(),
    AmexioEmailModule.forRoot(),
    AmexioFileUploadModule.forRoot(),
    AmexioHiddenModule.forRoot(),
    AmexioItemSelectorModule.forRoot(),
    AmexioNumberModule.forRoot(),
    AmexioPasswordModule.forRoot(),
    AmexioProgressModule.forRoot(),
    AmexioRadioModule.forRoot(),
    AmexioRatingModule.forRoot(),
    AmexioTabPaneModule.forRoot(),
    AmexioTextAreaModule.forRoot(),
  ],
  exports: MODULES
})
export class AmexioWidgetsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AmexioWidgetsModule,
      providers: [WidgetService]
    };
  }
}
