import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {CommonDataService} from "../../services/data/common.data.service";
import {AmexioTypeAheadComponent} from "./typeahead.component";


export * from './typeahead.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule
  ],
  exports: [AmexioTypeAheadComponent],
  declarations: [AmexioTypeAheadComponent],
  providers: [CommonDataService],
})
export class AmexioTypeAheadModule { }
