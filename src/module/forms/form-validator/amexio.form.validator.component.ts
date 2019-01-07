import { ViewChild } from '@angular/core';
import { FormControl, NgModel, Validators } from '@angular/forms';

export class AmexioFormValidator {

    // @ViewChild(NgModel) model: NgModel;

    // public validate(c: FormControl) {
    //     return (this.model.valid ) ? null : {
    //         jsonParseError: {
    //             valid: true,
    //         },
    //     };
    // }

    createCompId(inputType: any, name: any) {
        return inputType + '_' + name + '_' + Math.floor(Math.random() * 1000 + 999);
    }
}
