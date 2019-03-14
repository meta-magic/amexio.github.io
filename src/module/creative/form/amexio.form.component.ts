import {
    AfterContentChecked, AfterContentInit, AfterViewInit, Component, ContentChildren,
    ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, QueryList, ViewChild,
    ViewChildren,
} from '@angular/core';
import { FormGroup, NgForm, NgModel } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { LifeCycleBaseComponent } from '../../base/lifecycle.base.component';
import { AmexioButtonComponent } from '../../forms/buttons/button.component';
import { AmexioCardCEActionComponent } from '../common/amexio.action.component';
import { AmexioCardCEBodyComponent } from '../common/amexio.body.component';
import { AmexioCardCEHeaderComponent } from '../common/amexio.header.component';

import { AmexioFormGroupDirective } from '../../panes/form/form.group.directive';
@Component({
    selector: 'amexio-form-ce',
    templateUrl: './amexio.form.component.html',
})
export class AmexioFormCEComponent extends LifeCycleBaseComponent implements OnDestroy, OnInit,
    AfterContentInit, AfterContentChecked, AfterViewInit {

    [x: string]: any;

    @Input('form-name') fname: string;

    @Input('show-error') showError = false;

    @Output() showErrorMsg: any = new EventEmitter<any>();

    componentError: any[] = [];

    errorMsgArray: any[];

    isFormValid: boolean;

    showDialogue: boolean;

    checkForm: boolean;

    clearTimeout: any;

    @Input('bg-image') bgimage: string;

    @Input('color') color: string;

    @Input('background') background: string;

    @Input('height') height: string;

    @Input('align') align: string;

    @Input('style-type') styleType: string;

    cclass: string;

    formFlag: true;

    windowFlag = false;

    @ContentChildren(AmexioCardCEHeaderComponent) AmexioCardCEHeaderQueryList: QueryList<AmexioCardCEHeaderComponent>;

    amexioCardHeaderList: AmexioCardCEHeaderComponent[];

    @ContentChildren(AmexioCardCEBodyComponent) AmexioCardCEBodyQueryList: QueryList<AmexioCardCEBodyComponent>;

    amexioCardBodyList: AmexioCardCEBodyComponent[];

    @ContentChildren(AmexioCardCEActionComponent) AmexioCardCEActionQueryList: QueryList<AmexioCardCEActionComponent>;

    amexioCardActionList: AmexioCardCEActionComponent[];

   @ContentChildren(AmexioButtonComponent, { descendants: true }) btns: QueryList<AmexioButtonComponent>;

    buttons: AmexioButtonComponent[];

    @ViewChild(NgForm) public form: NgForm;

    @ContentChildren(NgModel, { descendants: true }) public models: QueryList<NgModel>;

    @ContentChildren(AmexioFormGroupDirective, { descendants: true }) public fb: QueryList<AmexioFormGroupDirective>;

    constructor(public formBuilder: FormBuilder) {
        super();
        this.checkForm = false;
        this.isFormValid = false;
        this.showDialogue = false;
        this.errorMsgArray = [];
    }

    ngAfterContentInit() {
        this.setCardAligementForAllInnerComponent();
    }

    onResize() {

    }

    ngAfterViewInit() {
        const ngContentModels = this.models.toArray();
        const innerModelArray: any[] = [];
        this.fb.forEach((fbnode: any) => {
            const modelarray = fbnode.modelsarray;
            const fgc = {};
            modelarray.forEach((m: any) => {
                fgc[m.name] = m.control;
                innerModelArray.push(m);
            });
            const grp = this.formBuilder.group(fgc);
            this.form.form.registerControl(fbnode.group, grp);
        });

        ngContentModels.forEach((model) => {
            if (!this.isFieldPresentInParentAndChildBoth(innerModelArray, model.name)) {
                if (!model.name || model.name === null) {
                    model.name = model.valueAccessor['name'];
                }
                this.form.control.registerControl(model.name, model.control);
            }
        });
        this.clearTimeout = setTimeout(() => {
            this.form.form.updateValueAndValidity();
        }, 100);
        this.btns.toArray().forEach((btnCom) => {
            if ((btnCom.formbind === this.fname) && !btnCom.disabled) {
                this.buttons.push(btnCom);
            }
        });
        this.AmexioCardCEActionQueryList.toArray()[0].formFlag = true;
        this.AmexioCardCEActionQueryList.toArray()[0].showError = this.showError;
        this.AmexioCardCEHeaderQueryList.toArray()[0].windowFlag = false;
        this.validateForm();
        this.onResize();
        super.ngAfterViewInit();
    }

    isFieldPresentInParentAndChildBoth(innerModelArray: any[], name: string): boolean {
        let isPresent = false;
        innerModelArray.forEach((innerModel: any) => {
            if (name === innerModel.name) {
                isPresent = true;
            }
        });
        return isPresent;
    }

    // THIS METHOD IS USED FOR DISABLE BUTTON
    validateForm() {
        if (this.form && this.form.status === 'INVALID') {
            this.disableButton(true);
        } else {
            this.disableButton(false);
        }
    }

    disableButton(flag: boolean) {
        this.buttons.forEach((btn) => {
            btn.disabled = flag;
        });
    }

    ngAfterContentChecked(): void {
        this.validateForm();
        let form: any;
        form = this.form;
        this.AmexioCardCEActionQueryList.toArray()[0].checkFormValidation(form);
    }

    ngOnDestroy() {
        clearTimeout(this.clearTimeout);
        super.ngOnDestroy();
    }

    ngOnInit() {
        this.buttons = [];
        if (!this.color) {
            this.cclass = 'card-container-ce-color';
        }
        if (!this.background) {
            this.cclass = this.cclass + ' card-container-ce-bg-color';
        }
        this.setWiderAndNarrower();
        super.ngOnInit();
    }

    // THIS METHOD CALLL FOR HEADER AND ACTION STYLE
    setWiderAndNarrower(): void {
        switch (this.styleType) {
            case 'wider-header':
                this.cclass = this.cclass + ' card-container-wider-header';
                break;
            case 'narrower-header':
                this.cclass = this.cclass + ' card-container-narrower-header';
                break;
            case 'wider-action':
                this.cclass = this.cclass + ' card-container-wider-action';
                break;
            case 'narrower-action':
                this.cclass = this.cclass + ' card-container-narrower-action';
                break;
            case 'wider-all':
                this.cclass = this.cclass + ' card-container-wider-header card-container-wider-action';
                break;
            case 'narrower-all':
                this.cclass = this.cclass + ' card-container-narrower-header card-container-narrower-action';
                break;
            case 'wider-header-narrower-action':
                this.cclass = this.cclass + ' card-container-wider-header card-container-narrower-action';
                break;
            case 'narrower-header-wider-action':
                this.cclass = this.cclass + ' card-container-narrower-header card-container-wider-action';
                break;
            default:
                break;
        }
    }

    // TO SET ALIGN TO ALL INNER COMPONENT IN CARD
    setCardAligementForAllInnerComponent() {
        this.amexioCardHeaderList = this.AmexioCardCEHeaderQueryList.toArray();
        if (this.amexioCardHeaderList[0] !== undefined && !this.amexioCardHeaderList[0].align &&
            this.amexioCardHeaderList[0].align.length > 0) {
            this.amexioCardHeaderList[0].align = this.align;
        }

        this.amexioCardBodyList = this.AmexioCardCEBodyQueryList.toArray();
        if (this.amexioCardBodyList[0] !== undefined && !this.amexioCardBodyList[0].align && this.amexioCardBodyList[0].align.length > 0) {
            this.amexioCardBodyList[0].align = this.align;
        }

        this.amexioCardActionList = this.AmexioCardCEActionQueryList.toArray();
        if (this.amexioCardActionList[0] !== undefined && !this.amexioCardActionList[0].align &&
            this.amexioCardActionList[0].align.length > 0) {
            this.amexioCardActionList[0].align = this.align;
        } else if (this.amexioCardActionList[0] !== undefined &&
            this.amexioCardActionList[0].align === '') {
            this.amexioCardActionList[0].align = 'end';
        }

    }

}
