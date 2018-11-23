import { AfterContentInit, Component, ContentChild, ContentChildren, Input, QueryList} from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
    selector: 'amexio-form-group',
    template: `<ng-content></ng-content>`,
})
export class AmexioFormGroupComponent implements AfterContentInit {

    @Input('group') group: string;

    @ContentChildren(NgModel, { descendants: true }) public models: QueryList<NgModel>;

    modelsarray: NgModel[];

    ngAfterContentInit() {
        this.modelsarray = this.models.toArray();
    }
}
