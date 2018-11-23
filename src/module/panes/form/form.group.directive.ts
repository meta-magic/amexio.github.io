import { AfterContentInit, Component, ContentChild, ContentChildren, Directive, Input, QueryList} from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
   selector: '[form-group]',
})
export class AmexioFormGroupDirective implements AfterContentInit {

    @Input('form-group') group: string;

    @ContentChildren(NgModel, { descendants: true }) public models: QueryList<NgModel>;

    modelsarray: NgModel[];

    ngAfterContentInit() {
        this.modelsarray = this.models.toArray();
    }
}
