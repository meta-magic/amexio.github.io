import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TextInputComponent} from "./bootstrap3/textinput/textinput.component";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {WidgetService} from "./bootstrap3/shared/widget.shared.service";
import {TreeViewComponent} from "./bootstrap3/treeview/treeview.component";
import {TreeDataTableComponent} from "./bootstrap3/treedatatable/treedatatable.component";
import {TextAreaComponent} from "./bootstrap3/textareainput/textareainput.component";
import {TabPaneComponent} from "./bootstrap3/tabpane/tabpane.component";
import {TabComponent} from "./bootstrap3/tabpane/tabpill.component";
import {RatingInputComponent} from "./bootstrap3/ratinginput/ratinginput.component";
import {RadioGroupComponent} from "./bootstrap3/radiogroup/radiogroup.component";
import {ProgressComponent} from "./bootstrap3/progress/progress.component";
import {PasswordInputComponent} from "./bootstrap3/passwordinput/passwordinput.component";
import {NumberInputComponent} from "./bootstrap3/numberinput/numberinput.component";
import {HiddenInputComponent} from "./bootstrap3/hiddeninput/hiddeninput.component";
import {FileuploadComponent} from "./bootstrap3/fileupload/fileupload.component";
import {EmailInputComponent} from "./bootstrap3/emailinput/emailinput.component";
import {DropDownComponent} from "./bootstrap3/dropdown/dropdown.component";
import {DateTimeComponent} from "./bootstrap3/datetimepicker/datetimepicker.component";
import {DataTableComponent} from "./bootstrap3/datatable/datatable.component";
import {ColumnComponent} from "./bootstrap3/datatable/column.component";
import {CheckBoxComponent} from "./bootstrap3/checkgroup/checkbox.component";
import {CarouselComponent} from "./bootstrap3/carousel/carousel.component";
import {ButtonGroupActionComponent} from "./bootstrap3/buttongroup/buttongroup.action.component";
import {ButtonGroupComponent} from "./bootstrap3/buttongroup/buttongroup.component";
import {ButtonDropdownComponent} from "./bootstrap3/buttondropdown/button.dropdown.component";
import {ItemComponent} from "./bootstrap3/buttondropdown/dropdown.item.component";
import {ButtonComponent} from "./bootstrap3/button/button.component";
import {ItemSelectorComponent} from "./bootstrap3/itemselector/itemselector.component";
import {FilterComponent} from "./bootstrap3/datatable/filter-directive";
import {FilterTreeViewComponent} from "./bootstrap3/treeview/filtertreeview";


export * from './bootstrap3/textinput/textinput.component';

export * from './bootstrap3/baseclass/form.base.class';

export * from './bootstrap3/treeview/treeview.component';
export * from './bootstrap3/treeview/treeview.service';
export * from './bootstrap3/treeview/filtertreeview';

export * from './bootstrap3/treedatatable/treedatatable.component';
export * from './bootstrap3/treedatatable/treedatatable.service';

export * from './bootstrap3/textareainput/textareainput.component';

export * from './bootstrap3/tabpane/tabpane.component';
export * from './bootstrap3/tabpane/tabpill.component';

export * from './bootstrap3/ratinginput/ratinginput.component';

export * from './bootstrap3/radiogroup/radiogroup.component';
export * from './bootstrap3/radiogroup/radiogroup.service';

export * from './bootstrap3/progress/progress.component';

export * from './bootstrap3/passwordinput/passwordinput.component';

export * from './bootstrap3/numberinput/numberinput.component';

export * from './bootstrap3/itemselector/itemselector.component';
export * from './bootstrap3/itemselector/itemselector.service';

export * from './bootstrap3/hiddeninput/hiddeninput.component';

export * from './bootstrap3/fileupload/fileupload.component';
export * from './bootstrap3/fileupload/fileupload.service';

export * from './bootstrap3/emailinput/emailinput.component';

export * from './bootstrap3/dropdown/dropdown.component';
export * from './bootstrap3/dropdown/dropdown.service';

export * from './bootstrap3/datetimepicker/datetimepicker.component';

export * from './bootstrap3/datatable/datatable.component';
export * from './bootstrap3/datatable/column.component';
export * from './bootstrap3/datatable/datatable.service';
export * from './bootstrap3/datatable/filter-directive';

export * from './bootstrap3/checkgroup/checkbox.component';
export * from './bootstrap3/checkgroup/checkbox.service';

export * from './bootstrap3/carousel/carousel.component';
export * from './bootstrap3/carousel/carousel.service';

export * from './bootstrap3/buttongroup/buttongroup.action.component';
export * from './bootstrap3/buttongroup/buttongroup.component';

export * from './bootstrap3/buttondropdown/button.dropdown.component';
export * from './bootstrap3/buttondropdown/dropdown.item.component';

export * from './bootstrap3/button/button.component';
export * from './bootstrap3/shared/widget.shared.service';

export * from './bootstrap3/itemselector/itemselector.service';
export * from './bootstrap3/itemselector/itemselector.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    TextInputComponent,
    TreeViewComponent,
    TreeDataTableComponent,
    TextAreaComponent,
    TabPaneComponent,
    TabComponent,
    RatingInputComponent,
    RadioGroupComponent,
    ProgressComponent,
    PasswordInputComponent,
    NumberInputComponent,
    HiddenInputComponent,
    FileuploadComponent,
    EmailInputComponent,
    DropDownComponent,
    DateTimeComponent,
    DataTableComponent,
    ColumnComponent,
    CheckBoxComponent,
    CarouselComponent,
    ButtonGroupActionComponent,
    ButtonGroupComponent,
    ButtonDropdownComponent,
    ItemComponent,
    ButtonComponent,
    ItemSelectorComponent,
    FilterComponent,
    FilterTreeViewComponent
  ],
  exports: [
    TextInputComponent,
    TreeViewComponent,
    TreeDataTableComponent,
    TextAreaComponent,
    TabPaneComponent,
    TabComponent,
    RatingInputComponent,
    RadioGroupComponent,
    ProgressComponent,
    PasswordInputComponent,
    NumberInputComponent,
    HiddenInputComponent,
    FileuploadComponent,
    EmailInputComponent,
    DropDownComponent,
    DateTimeComponent,
    DataTableComponent,
    ColumnComponent,
    CheckBoxComponent,
    CarouselComponent,
    ButtonGroupComponent,
    ButtonGroupActionComponent,
    ButtonDropdownComponent,
    ItemComponent,
    ButtonComponent,
    ItemSelectorComponent,
    FilterComponent,
    FilterTreeViewComponent
  ]
})
export class AmexioWidgetModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AmexioWidgetModule,
      providers: [WidgetService]
    };
  }
}
