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
    constructor() {
        this.help = [];
    }

    @Input('error-msg')
    set errormsg(v: string) {
        this._errormsg = v;
    }
    get errormsg() {
        return this._errormsg;
    }

    @Input('min-msg')
    set minmsg(v: string) {
        this._minmsg = v;
    }
    get minmsg() {
        return this._minmsg;
    }

    @Input('max-msg')
    set maxmsg(v: string) {
        this._maxmsg = v;
    }
    get maxmsg() {
        return this._maxmsg;
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
