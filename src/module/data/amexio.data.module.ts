import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonDataService} from "../services/data/common.data.service";
import {HttpModule} from "@angular/http";
import {AmexioTreeViewComponent} from "./tree/tree.component";
import {AmexioListBoxComponent} from "./listbox/listbox.component";
import {AmexioDatagridComponent} from "./datagrid/datagrid.component";
import {DataGridFilterComponent} from "./datagrid/datagrid.filter.component";
import {AmexioPaginatorComponent} from "./paginator/paginator.component";
import {AmexioGridColumnComponent} from "./datagrid/data.grid.column";
import {AmexioProgressMultiBarComponent} from "./progress/bar.component";
import {AmexioProgressBarComponent} from "./progress/progress.component";
import {IconLoaderService} from "../services/icon/icon.service";
import {HorizontalTreeViewNodeComponent} from "./tree/horizontalnode.component";
import {HorizontalTreeViewComponent} from "./tree/horizontaltreeview.component";
import {AmexioFilterTreeComponent} from "./tree/filter.tree.component";

export * from '../services/data/common.data.service';
export * from './listbox/listbox.component';
export * from './tree/tree.component';
export * from './paginator/paginator.component';
export * from '../services/icon/icon.service';

const DATA_COMPONENTS = [
  AmexioTreeViewComponent,
  AmexioListBoxComponent,
  AmexioDatagridComponent,
  DataGridFilterComponent,
  AmexioPaginatorComponent,
  AmexioGridColumnComponent,
  AmexioProgressMultiBarComponent,
  AmexioProgressBarComponent,
  HorizontalTreeViewNodeComponent,
  HorizontalTreeViewComponent,
  AmexioFilterTreeComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule
  ],
  exports: DATA_COMPONENTS,
  declarations: DATA_COMPONENTS
})
export class AmexioDataModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AmexioDataModule,
      providers: [CommonDataService,IconLoaderService]
    };
  }
}
