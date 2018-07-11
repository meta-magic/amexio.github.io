import {CommonModule} from '@angular/common';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AmexioTypeAheadComponent} from './typeahead.component';

import {CommonDataService} from '../../services/data/common.data.service';

export * from './typeahead.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [AmexioTypeAheadComponent],
  declarations: [AmexioTypeAheadComponent],
  providers: [CommonDataService],
})
export class AmexioTypeAheadModule { }
