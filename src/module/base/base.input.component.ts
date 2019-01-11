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

import { InputValidator } from './input.validator';
import { ValueAccessorBase } from './value-accessor';

export class BaseInput<T> extends ValueAccessorBase<T> {

    onBaseInputFocus(event: any) {
        this.checkValidity();
    }
    onBaseInput(event: any) {
        this.checkValidity();
    }

    onBlur2(event: any) {
        this.checkValidity();
    }

    onBaseInputChange(event: any) {
        this.checkValidity();
    }

    checkValidity() {
    }

    validateOnInit() {
        return true;
    }

    isVali1d() {
        return true;
    }

}
