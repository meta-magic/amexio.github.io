import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

import {AmexioWidgetModule} from 'amexio-ng-extensions';

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
      AmexioWidgetModule
    ],
    declarations: [HomeComponent],
})
export class HomeModule { }
