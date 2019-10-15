
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'amexio-ee-appointment',
    templateUrl: './amexio-ee-textarea.component.html',
})
export class AmexioEeTextAreaComponent {

    compute(number: number) {
        if (number < 0) {
            return 0;
        } else {
            console.log(number);
            return number + 1;
        }
    }
}
