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

import {ModuleWithProviders, NgModule}      from '@angular/core';
import { CommonModule }  from '@angular/common';
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {TreeDataTableComponent} from "./treedatatable.component";
import {TreeDataTableService} from "./treedatatable.service";


@NgModule({
    imports: [ CommonModule ,FormsModule,HttpModule],
    declarations: [ TreeDataTableComponent  ],
    exports : [ TreeDataTableComponent ]
})
export class AmexioTreeTableModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AmexioTreeTableModule,
            providers: [TreeDataTableService]
        };
    }
}



