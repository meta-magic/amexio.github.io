/*
* Copyright [2019] [Metamagic]
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
*  Created by sagar on 4/02/2019.
*/
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { AmexioCardCEActionComponent } from './../creative/card/amexio.action.component';
import { AmexioCardCEBodyComponent } from './../creative/card/amexio.body.component';
import { AmexioCardCEComponent } from './../creative/card/amexio.cards.component';
import { AmexioCardCEHeaderComponent } from './../creative/card/amexio.header.component';

export * from './../creative/card/amexio.action.component';
export * from './../creative/card/amexio.body.component';
export * from './../creative/card/amexio.cards.component';
export * from './../creative/card/amexio.header.component';
const CREATIVE_COMPONENTS = [
    AmexioCardCEHeaderComponent,
    AmexioCardCEBodyComponent,
    AmexioCardCEActionComponent,
    AmexioCardCEComponent,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: CREATIVE_COMPONENTS,
  declarations: CREATIVE_COMPONENTS,
  providers : [],
})
export class AmexioCreativeModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AmexioCreativeModule,
      providers: [],
    };
  }
}
