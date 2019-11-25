/*
* Copyright [2019] [Metamagic]
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

import { ChangeDetectorRef, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormControl, NgModel, Validators} from '@angular/forms';
import { EventBaseComponent } from './event.base.component';

export class BaseFormValidator<T> extends EventBaseComponent<T> {

    // @ViewChild(NgModel) model: NgModel;

    // public validate(c: FormControl) {
    //     return (this.model.valid ) ? null : {
    //         jsonParseError: {
    //             valid: true,
    //         },
    //     };
    // }
    constructor(public renderer: Renderer2, public element: ElementRef, private _cd: ChangeDetectorRef) {
     super(renderer, element, _cd);
    }
}
