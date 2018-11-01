import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AmexioGridColumnComponent} from './datagrid/data.grid.column';
import {AmexioDatagridComponent} from './datagrid/datagrid.component';
import {DataGridFilterComponent} from './datagrid/datagrid.filter.component';
import {AmexioDataGridHeaderComponent} from './datagrid/datagrid.header.component';
import {AmexioGridComponent} from './gridlayout/grid.component';
import {AmexioGridItemComponent} from './gridlayout/griditem.component';
import {AmexioDataIconComponent} from './icon/icon.component';
import {AmexioItemSelectorComponent} from './itemselector/item.selector.component';
import {AmexioListBoxComponent} from './listbox/listbox.component';
import {AmexioPaginatorComponent} from './paginator/paginator.component';
import {AmexioProgressMultiBarComponent} from './progress/bar.component';
import {AmexioProgressBarComponent} from './progress/progress.component';
import {AmexioFilterTreeComponent} from './tree/filter.tree.component';
import {HorizontalTreeViewNodeComponent} from './tree/horizontalnode.component';
import {HorizontalTreeViewComponent} from './tree/horizontaltreeview.component';
import {AmexioTreeViewComponent} from './tree/tree.component';
import {TreeDataTableComponent} from './treegrid/treedatatable.component';

import {AmexioLayoutModule} from '../layout/amexio.layout.module';
import {AmexioPaneModule} from '../panes/amexio.pane.module';

import {CommonDataService} from '../services/data/common.data.service';
import {IconLoaderService} from '../services/icon/icon.service';

export * from '../services/data/common.data.service';
export * from './listbox/listbox.component';
export * from './tree/tree.component';
export * from './paginator/paginator.component';
export * from '../services/icon/icon.service';
export * from './treegrid/treedatatable.component';

const DATA_COMPONENTS = [
  AmexioGridComponent,
  AmexioGridItemComponent,
  AmexioTreeViewComponent,
  AmexioListBoxComponent,
  AmexioDatagridComponent,
  AmexioDataGridHeaderComponent,
  DataGridFilterComponent,
  AmexioPaginatorComponent,
  AmexioGridColumnComponent,
  AmexioProgressMultiBarComponent,
  AmexioProgressBarComponent,
  HorizontalTreeViewNodeComponent,
  HorizontalTreeViewComponent,
  AmexioFilterTreeComponent,
  TreeDataTableComponent,
  AmexioDataIconComponent,
  AmexioItemSelectorComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AmexioPaneModule,
    AmexioLayoutModule,
    HttpClientModule,
  ],
  exports: DATA_COMPONENTS,
  declarations: DATA_COMPONENTS,
  providers: [CommonDataService, IconLoaderService],
})
export class AmexioDataModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AmexioDataModule,
      providers: [CommonDataService, IconLoaderService],
    };
  }
}
