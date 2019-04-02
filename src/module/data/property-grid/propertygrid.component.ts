import { Component, Input } from '@angular/core';
import { PropertyGridModel } from '../../../models/propertyGridModel';

@Component({
    selector: 'amexio-property-grid',
    templateUrl: './propertygrid.component.html',
})
export class PropertyGridComponent {

    @Input('key-value-data') data: PropertyGridModel[];

    @Input('has-border') hasBorder = false;

    @Input('has-colon') hasColon = false;

    @Input('enable-key-bold') enableKeyBold = false;

    constructor() {

    }
}
