import { ChangeDetectorRef, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormControl, NgModel, Validators} from '@angular/forms';
import { EventBaseComponent } from './event.base.component';

export class BaseFormValidator<T> extends EventBaseComponent<T> {

    // @ViewChild(NgModel) model: NgModel;

    // public validate(c: FormControl) {
    //     return (this.model.valid ) ? null : {
    //         jsonParseError: {
    //             valid: true,
    //         },
    //     };
    // }
    constructor(public renderer: Renderer2, public element: ElementRef, private _cd: ChangeDetectorRef) {
     super(renderer, element, _cd);
    }
}
