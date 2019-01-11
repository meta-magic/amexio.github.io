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

import { Component, Input } from '@angular/core';

@Component({
    selector: 'input-help',
    templateUrl: './input.helper.component.html',
    styleUrls: ['./input.helper.scss'],
})
export class AmexioInputHelperComponent {
    public _errormsg: string;
    public _minmsg: string;
    public _maxmsg: string;
    public help: string[];
    public _minerrormsg: string;
    public _maxerrormsg: string;
    constructor() {
        this.help = [];
    }
    @Input('min-length') minlength: number;
    @Input('max-length') maxlength: number;

    @Input('min-value') minvalue: number;
    @Input('max-value') maxvalue: number;

    @Input('is-number') isNumberComponent = false;
    // error Msg
    @Input('error-msg')
    set errormsg(v: string) {
        this._errormsg = v;
    }
    get errormsg() {
        return this._errormsg;
    }
    // Min Msg

    @Input('min-msg')
    set minmsg(v: string) {
        this._minmsg = v;
    }
    get minmsg() {
        return this._minmsg;
    }
    // Max Msg

    @Input('max-msg')
    set maxmsg(v: string) {
        this._maxmsg = v;
    }
    get maxmsg() {
        return this._maxmsg;
    }

    // mini error msg
    @Input('min-error-msg')
    set minerrormsg(v: string) {
        this._minerrormsg = v;
    }
    get minerrormsg() {
        return this._minerrormsg;
    }

    // max error msg
    @Input('max-error-msg')
    set maxerrormsg(v: string) {
        this._maxerrormsg = v;
    }
    get maxerrormsg(): string {
        return this._maxerrormsg;
    }

    private createHelpMsg() {
        if (this.errormsg && this.errormsg.length > 0) {
            this.help.push(this.errormsg);
        }
        if (this.errormsg && this.errormsg.length > 0) {
            this.help.push(this.errormsg);
        }
        if (this.errormsg && this.errormsg.length > 0) {
            this.help.push(this.errormsg);
        }
    }

}
