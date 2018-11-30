import { InputValidator } from './input.validator';
import { ValueAccessorBase } from './value-accessor';

export class BaseInput<T> extends ValueAccessorBase<T> {

    onBaseInputFocus(event: any) {
        this.checkValidity();
    }
    onBaseInput(event: any) {
        this.checkValidity();
    }

    onBlur2(event: any) {
        this.checkValidity();
    }

    onBaseInputChange(event: any) {
        this.checkValidity();
    }

    checkValidity() {
    }

    validateOnInit() {
        return true;
    }

    isVali1d() {
        return true;
    }

}
