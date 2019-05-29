import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
    selector: 'amexio-virtualscroller',
    templateUrl: './virtualscroller.component.html',
})
export class AmexioVirtualScrollerComponent {

    @Input('height') height: string;

    @Input('data') data: any[];

    @ContentChild('amexioBodyTmpl') bodyTemplate: TemplateRef<any>;

    itemSize: number;

    constructor() {
        this.height = '200px';
        this.itemSize = 10;
    }
}
