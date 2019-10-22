
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { EditableTextComponent } from './editable-text/editable-text.component';

@Component({
    selector: 'amexio-rich-textarea',
    templateUrl: './rich-editable-textarea.component.html',
})
export class AmexioRichEditorComponent {

    constructor() { }
    printTabSource: any;

    @Input('rich-height') richHeight = 400;
    @Input('enable-source-code') enableSourceCode = false;
    @Input('toolbar-position') toolbarPosition = 'top';
    @ViewChild(EditableTextComponent) editableComponentRef: EditableTextComponent;

    @Output() onCodeClick: any = new EventEmitter<any>();

    emitSourceCode(data: any) {
        this.printTabSource = data;
        this.onCodeClick.emit(data);
    }
    onTabSourceCode() {
        this.editableComponentRef.onHtmlCodeClick();
    }
}
