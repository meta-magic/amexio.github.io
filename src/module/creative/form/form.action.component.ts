import { AfterContentInit, Component, ContentChildren, HostBinding, Input, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
@Component({
    selector: 'form-action-ce',
    templateUrl: './form.action.component.html',
})
export class AmexioFormActionCEComponent implements  AfterContentInit {

    errorMsgArray: any[];

    isFormValid: boolean;

    showDialogue: boolean;

    checkForm: boolean;

    form: NgForm;

    formFlag: boolean;

    enableaction = false;

    constructor(public formBuilder: FormBuilder) {
        this.isFormValid = false;
        this.showDialogue = false;
        this.errorMsgArray = [];
    }

    ngAfterContentInit() {
    }

    showErrors(event: any) {
        this.errorMsgArray = [];
        this.addErrorMsg();
        this.showDialogue = !this.isFormValid;
        if (!this.isFormValid) {
            this.showDialogue = true;
        } else {
            this.showDialogue = false;
        }
    }

    closeDialogue() {
        this.showDialogue = !this.showDialogue;
    }
    // THIS METHOD IS USED FOR ADDING MSG
    addErrorMsg() {
        if (this.form && this.form.status === 'INVALID') {
            for (const [key, value] of Object.entries(this.form.controls)) {
                if (value && value.status === 'INVALID') {
                    const errorObject: any = {};
                    errorObject['label'] = key;
                    this.errorMsgArray.push(errorObject);
                }
            }
        }
    }

    getValidationForm(form: any, formFlag: boolean) {
        this.enableaction = true;
        this.formFlag = formFlag;
        this.form = form;
    }
}
