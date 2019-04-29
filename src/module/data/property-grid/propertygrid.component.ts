import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PropertyGridModel } from '../../../models/propertyGridModel';

@Component({
    selector: 'amexio-property-grid',
    templateUrl: './propertygrid.component.html',
    styleUrls: ['./propertygrid.component.css'],
})
export class PropertyGridComponent {

    @Input('key-value-data') data: PropertyGridModel[];

    @Input('has-border') hasBorder = false;

    @Input('has-colon') hasColon = false;

    @Input('enable-key-bold') enableKeyBold = false;

    @Input('enable-value-click') enableValueClick = false;

    @Output('onValueClick') onValueClick = new EventEmitter<any>();

    constructor() {
    }

    onClick(event: PropertyGridModel) {
        if (event.link && event.link.length > 0) {
            this.onValueClick.emit(event);
        }
    }
}
