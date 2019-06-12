import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AmexioVirtualScrollerComponent } from './virtualscroller/virtualscroller.component';

import { AmexioGridColumnComponent } from './datagrid/data.grid.column';
import { AmexioDatagridComponent } from './datagrid/datagrid.component';
import { DataGridFilterComponent } from './datagrid/datagrid.filter.component';
import { AmexioDataGridHeaderComponent } from './datagrid/datagrid.header.component';
import { AmexioGoogleMapComponent } from './googlemap/googlemap.component';
import { AmexioItemSelectorComponent } from './itemselector/item.selector.component';
import { AmexioListBoxComponent } from './listbox/listbox.component';
import { AmexioPaginatorComponent } from './paginator/paginator.component';
import { AmexioProgressMultiBarComponent } from './progress/bar.component';
import { AmexioProgressBarComponent } from './progress/progress.component';
import { PropertyGridComponent } from './property-grid/propertygrid.component';
import { SpeechBubbleComponent } from './speech-bubble/speech-bubble.component';
import { AmexioFilterTreeComponent } from './tree/filter.tree.component';
import { HorizontalTreeViewNodeComponent } from './tree/horizontalnode.component';
import { HorizontalTreeViewComponent } from './tree/horizontaltreeview.component';
import { AmexioTreeViewComponent } from './tree/tree.component';
import { TreeDataTableComponent } from './treegrid/treedatatable.component';

import { AmexioCommonModule } from '../base/amexio.common.module';
import { AmexioBaseContextMenuModule } from '../base/base.contextmenu.component.module';

import { AmexioLayoutModule } from '../layout/amexio.layout.module';
import { AmexioPaneModule } from '../panes/amexio.pane.module';

import { CommonDataService } from '../services/data/common.data.service';
import { DisplayFieldService } from '../services/data/display.field.service';

import { IconLoaderService } from '../services/icon/icon.service';
import { GoogleMapScriptService } from '../services/script/script.data.service';

export * from '../services/data/common.data.service';
export * from '../services/script/script.data.service';
export * from './listbox/listbox.component';
export * from './tree/tree.component';
export * from './paginator/paginator.component';
export * from '../services/icon/icon.service';
export * from './treegrid/treedatatable.component';
export * from './googlemap/googlemap.component';

const DATA_COMPONENTS = [
  AmexioTreeViewComponent,
  AmexioListBoxComponent,
  AmexioDatagridComponent,
  AmexioDataGridHeaderComponent,
  AmexioGoogleMapComponent,
  DataGridFilterComponent,
  AmexioPaginatorComponent,
  AmexioGridColumnComponent,
  PropertyGridComponent,
  SpeechBubbleComponent,
  AmexioProgressMultiBarComponent,
  AmexioProgressBarComponent,
  HorizontalTreeViewNodeComponent,
  HorizontalTreeViewComponent,
  AmexioFilterTreeComponent,
  TreeDataTableComponent,
  AmexioItemSelectorComponent,
  AmexioVirtualScrollerComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AmexioPaneModule,
    AmexioLayoutModule,
    HttpClientModule,
    AmexioBaseContextMenuModule,
    AmexioCommonModule.forRoot(),
  ],
  exports: DATA_COMPONENTS,
  declarations: DATA_COMPONENTS,
  providers: [CommonDataService, GoogleMapScriptService],
})
export class AmexioDataModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AmexioDataModule,
      providers: [CommonDataService, GoogleMapScriptService],
    };
  }
}
