
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'amexio-rich-textarea',
    templateUrl: './rich-editable-textarea.component.html',
})
export class AmexioRichEditorComponent {

    constructor() { }

    @Input('rich-height') richHeight = 400;
    @Input('enable-source-code') enableSourceCode = false;
    @Input('toolbar-position') toolbarPosition = 'top';

    @Output() onCodeClick: any = new EventEmitter<any>();

    emitSourceCode(data: any) {
        this.onCodeClick.emit(data);
    }
}
