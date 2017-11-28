import { NgModule, ModuleWithProviders } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {CommonModule} from "@angular/common";
import {TextInputComponent} from "./textinput/textinput.component";
import {CommonHttpService} from "./common.http.service";
import {AmexioAccordionTabComponent} from "./accordion/amexio-accordion-tab";
import {ButtonComponent} from "./button/button.component";
import {ButtonDropdownComponent} from "./buttondropdown/button.dropdown.component";
import {ButtonSplitDropdownComponent} from "./buttondropdown/button.split.dropdown.component";
import {DropdownItemComponent} from "./buttondropdown/dropdown.item.component";
import {ButtonGroupActionComponent} from "./buttongroup/buttongroup.action.component";
import {ButtonGroupComponent} from "./buttongroup/buttongroup.component";
import {CarouselComponent} from "./carousel/carousel.component";
import {DataTableComponent} from "./datatable/datatable.component";
import {ColumnComponent} from "./datatable/column.component";
import {FilterComponent} from "./datatable/datatable.filter.component";
import {DropDownComponent} from "./dropdown/dropdown";
import {DateTimeComponent} from "./datetimepicker/datetimepicker.component";
import {DockbarComponent} from "./dockedbar/dockbaritem";
import {DockedBarToolComponent} from "./dockedbar/dockettoolbar.component";
import {EmailInputComponent} from "./emailinput/emailinput.component";
import {FieldSetComponent} from "./fieldset/fieldset.component";
import {FieldSetBodyComponent} from "./fieldset/fieldsetbody.component";
import {FileuploadComponent} from "./fileupload/fileupload.component";
import {ImageComponent} from "./image/image.component";
import {ItemSelectorComponent} from "./itemselector/itemselector.component";
import {ListBoxComponent} from "./listbox/listbox.component";
import {NavbarSubMenuComponent} from "./navbar/navbarsubmenu.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {SideNavBarComponent} from "./navbar/sidenavbar.component";
import {NotifyComponent} from "./notify/notify.component";
import {NumberInputComponent} from "./numberinput/numberinput.component";
import {AmexioPaginatorComponent} from "./paginator/paginator.component";
import {CardComponent} from "./panes/card.component";
import {DialogComponent} from "./panes/dialog.component";
import {PaneActionComponent} from "./panes/paneaction.component";
import {PaneBodyComponent} from "./panes/panebody.component";
import {PaneHeaderComponent} from "./panes/paneheader.component";
import {WindowPaneComponent} from "./panes/windowpane.component";
import {ProgressComponent} from "./progress/progress.component";
import {ProgressMultiComponent} from "./progress/progress.bar";
import {PasswordInputComponent} from "./passwordinput/passwordinput.component";
import {RadioGroupComponent} from "./radiogroup/radiogroup.component";
import {RatingInputComponent} from "./ratinginput/ratinginput.component";
import {SingleCheckbox} from "./singlecheckbox/single.checkbox";
import {AmexioSliderComponent} from "./slider/slider.component";
import {StepBlockComponent} from "./steps/step-block";
import {StepsComponent} from "./steps/steps.component";
import {TabPaneComponent} from "./tabpane/tabpane.component";
import {TabComponent} from "./tabpane/tabpill.component";
import {VerticalRightTabPaneComponent} from "./tabpane/verticalrighttab.component";
import {TagInputComponent} from "./taginput/tag.input.component";
import {TextAreaComponent} from "./textareainput/textareainput.component";
import {AmexioToggleComponent} from "./toggle/toggle.button.comonent";
import {TreeDataTableComponent} from "./treedatatable/treedatatable.component";
import {FilterTreeViewComponent} from "./treeview/filtertreeview";
import {TypeAheadComponent} from "./typeahead/autocomplete.component";
import {AmexioVideoPlayerComponent} from "./video-player/video.player.component";
import {TreeViewComponent} from "./treeview/treeview.component";
import {VerticalLeftTabPaneComponent} from './tabpane/verticallefttab.component';

export * from './common.http.service';
export * from './baseclass/form.base.class';
export * from './textinput/textinput.component';
export * from  './accordion/amexio-accordion-tab';
export * from './button/button.component';

export * from './checkgroup/checkbox.component';
export * from './carousel/carousel.component';

/*Button exports*/
export * from './buttongroup/buttongroup.action.component'
export * from './buttongroup/buttongroup.component';
export * from './buttondropdown/dropdown.item.component';
export * from './buttondropdown/button.dropdown.component';
export * from './buttondropdown/button.split.dropdown.component';


/* Datatable */
export * from './datatable/datatable.component';
export * from './datatable/column.component';
export * from './datatable/datatable.filter.component';

export * from './dropdown/dropdown';

export * from './datetimepicker/datetimepicker.component';
export * from './dockedbar/dockbaritem';
export * from './dockedbar/dockettoolbar.component';
export * from './emailinput/emailinput.component';

export * from './fieldset/fieldset.component';
export * from './fieldset/fieldsetbody.component';

export * from './fileupload/fileupload.component';

export * from './image/image.component';

export * from './itemselector/itemselector.component';

export * from './listbox/listbox.component';

export * from './navbar/navbar.component';
export * from './navbar/navbarsubmenu.component';
export * from './navbar/sidenavbar.component';

export * from './notify/notify.component';
export * from './numberinput/numberinput.component';
export * from './paginator/paginator.component';

export * from './panes/card.component';
export * from './panes/dialog.component';
export * from './panes/paneaction.component';
export * from './panes/panebody.component';
export * from './panes/paneheader.component';
export * from './panes/windowpane.component';

export * from './passwordinput/passwordinput.component';
export * from './progress/progress.bar';
export * from './progress/progress.component';

export * from './radiogroup/radiogroup.component';
export * from './ratinginput/ratinginput.component';
export * from './singlecheckbox/single.checkbox';

export * from './slider/slider.component';
export * from './steps/step-block';
export * from './steps/steps.component';

export * from './tabpane/tabpill.component';
export * from './tabpane/tabpane.component';
export * from './tabpane/verticallefttab.component';
export * from './tabpane/verticalrighttab.component';
export * from './taginput/tag.input.component';
export * from './textareainput/textareainput.component';

export * from './toggle/toggle.button.comonent';
export * from './treedatatable/treedatatable.component';
export * from './treeview/filtertreeview';
export * from './treeview/treeview.component';
export * from './typeahead/autocomplete.component';
export * from './video-player/video.player.component';





const COMPONENTS = [
  TextInputComponent,
  AmexioAccordionTabComponent,
  ButtonComponent,
  ButtonDropdownComponent,
  ButtonSplitDropdownComponent,
  DropdownItemComponent,
  ButtonGroupActionComponent,
  ButtonGroupComponent,
  CarouselComponent,
  DataTableComponent,
  ColumnComponent,
  FilterComponent,
  DropDownComponent,
  DateTimeComponent,
  DockbarComponent,
  DockedBarToolComponent,
  EmailInputComponent,
  FieldSetComponent,
  FieldSetBodyComponent,
  FileuploadComponent,
  ImageComponent,
  ItemSelectorComponent,
  ListBoxComponent,
  NavbarSubMenuComponent,
  NavbarComponent,
  SideNavBarComponent,
  NotifyComponent,
  NumberInputComponent,
  AmexioPaginatorComponent,
  CardComponent,
  DialogComponent,
  PaneActionComponent,
  PaneBodyComponent,
  PaneHeaderComponent,
  WindowPaneComponent,
  ProgressComponent,
  ProgressMultiComponent,
  PasswordInputComponent,
  RadioGroupComponent,
  RatingInputComponent,
  SingleCheckbox,
  AmexioSliderComponent,
  StepBlockComponent,
  StepsComponent,
  TabPaneComponent,
  TabComponent,
  VerticalRightTabPaneComponent,
  VerticalLeftTabPaneComponent,
  TagInputComponent,
  TextAreaComponent,
  AmexioToggleComponent,
  TreeDataTableComponent,
  FilterTreeViewComponent,
  TreeViewComponent,
  TypeAheadComponent,
  AmexioVideoPlayerComponent
];

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class AmexioWidgetModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AmexioWidgetModule,
      providers: [CommonHttpService]
    };
  }
}
