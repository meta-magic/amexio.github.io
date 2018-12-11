import { Component, Input } from '@angular/core';

@Component({
    selector: 'input-help',
    templateUrl: './input.helper.component.html',
    styleUrls: ['./input.helper.scss'],
})
export class AmexioInputHelperComponent {
    public _errormsg: string;
    public _maxerrormsgno: string;
    public _minerrormsgno: string;
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
