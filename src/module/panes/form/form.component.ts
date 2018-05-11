 /*
 Component Name : Amexio Form
 Component Selector : <amexio-form>
 Component Description : Amexio Form provides an easy way to organize big form components and validating them.

*/
import { Component, OnInit, Input,ViewChild,ElementRef, EventEmitter,Output, AfterViewInit, AfterContentInit, QueryList, ViewChildren, ContentChildren } from "@angular/core";

import { AmexioTextInputComponent } from "./../../forms/textinput/textinput.component";
import { AmexioTextAreaComponent } from "./../../forms/textarea/textarea.component";
import { AmexioEmailInputComponent } from "./../../forms/emailinput/emailinput.component";
import { AmexioNumberInputComponent } from "./../../forms/numberinput/numberinput.component";
import { AmexioPasswordComponent } from "./../../forms/passwordinput/passwordinput.component";
import { AmexioCheckBoxComponent } from "./../../forms/checkbox/checkbox.component";
import { AmexioCheckBoxGroupComponent } from "./../../forms/checkbox-group/checkbox.group.component";
import { AmexioRadioGroupComponent } from "./../../forms/radio/radiogroup.component";
import { AmexioDropDownComponent } from "./../../forms/dropdown/dropdown.component";
import { AmexioTypeAheadComponent} from "./../../forms/typeahead/typeahead.component"
import { AmexioTagsInputComponent} from "./../../forms/tagsinput/tags.input.component"
import { AmexioDateTimePicker} from "./../../forms/datetimepicker/datetimepicker.component"
import { AmexioButtonComponent} from "./../../forms/buttons/button.component"
import { AmexioFormActionComponent} from "./form.action.component"
import { AmexioFormHeaderComponent} from "./form.header.component"
import { AmexioFormBodyComponent} from "./form.body.component"
 import {AmexioToggleComponent} from "../../forms/toggle/toggle.component";

@Component({
    selector: 'amexio-form',
    templateUrl: './form.component.html',
  })
export class AmexioFormComponent implements OnInit, AfterViewInit, AfterContentInit {

    isFormValid : boolean ;

    showDialogue : boolean ;

    checkForm : boolean;

    @ContentChildren(AmexioTextInputComponent, {descendants: true}) queryTextinput : QueryList<AmexioTextInputComponent>;
    textinput: AmexioTextInputComponent[];

    @ContentChildren(AmexioTextAreaComponent, {descendants: true}) queryTextArea : QueryList<AmexioTextAreaComponent>;
    textarea: AmexioTextAreaComponent[];

    @ContentChildren(AmexioEmailInputComponent, {descendants: true}) queryEmailinput : QueryList<AmexioEmailInputComponent>;
    emailinput: AmexioEmailInputComponent[];

    @ContentChildren(AmexioNumberInputComponent, {descendants: true}) queryNuminput : QueryList<AmexioNumberInputComponent>;
    numinput: AmexioNumberInputComponent[];

    @ContentChildren(AmexioPasswordComponent, {descendants: true}) queryPassword : QueryList<AmexioPasswordComponent>;
    password: AmexioPasswordComponent[];

    @ContentChildren(AmexioCheckBoxComponent, {descendants: true}) queryCheckbox : QueryList<AmexioCheckBoxComponent>;
    chkBox: AmexioCheckBoxComponent[];

    @ContentChildren(AmexioCheckBoxGroupComponent, {descendants: true}) queryCheckboxGrp : QueryList<AmexioCheckBoxGroupComponent>;
    chkBoxGrp: AmexioCheckBoxGroupComponent[];

    @ContentChildren(AmexioRadioGroupComponent, {descendants: true}) queryRadio : QueryList<AmexioRadioGroupComponent>;
    radio: AmexioRadioGroupComponent[];

    @ContentChildren(AmexioDropDownComponent, {descendants: true}) queryDropdown : QueryList<AmexioDropDownComponent>;
    dropdown: AmexioDropDownComponent[];

    @ContentChildren(AmexioTypeAheadComponent, {descendants: true}) queryTypeahead : QueryList<AmexioTypeAheadComponent>;
    typeahead: AmexioTypeAheadComponent[];

    @ContentChildren(AmexioTagsInputComponent, {descendants: true}) queryTags : QueryList<AmexioTagsInputComponent>;
    tags: AmexioTagsInputComponent[];

    @ContentChildren(AmexioDateTimePicker, {descendants: true}) queryDate : QueryList<AmexioDateTimePicker>;
    datefiled: AmexioDateTimePicker[];

    @ContentChildren(AmexioToggleComponent, {descendants: true}) queryToggle : QueryList<AmexioToggleComponent>;
    toggle: AmexioToggleComponent[];

  @ContentChildren(AmexioButtonComponent, {descendants: true}) btns : QueryList<AmexioButtonComponent>;
    buttons : AmexioButtonComponent[];

    @ContentChildren(AmexioFormActionComponent) queryFooter: QueryList<AmexioFormActionComponent>;
    footer : AmexioFormActionComponent[];

      /*
Properties
name : header-align
datatype : string
version : 4.2 onwards
default : left
description : Align of item elements inside card header example [right center left].
*/
     @Input('header-align') headeralign: string;

  /*
Properties
name : footer-align
datatype :  string
version : 4.2 onwards
default : right
description : Align of item elements inside card footer example [right center left]
*/
    @Input('footer-align') footeralign: string;
  /*
Properties
name : form-name
datatype :  string
version : 4.2 onwards
default : none
description : form binding attribute
*/

    @Input('form-name') fname : string;

      /*
Properties
name : header
datatype : boolean
version : 4.2 onwards
default : false
description : form header to display
*/
    @Input('header') header : string;

      /*
Properties
name : show-error
datatype : boolean
version : 4.2 onwards
default : false
description : Flag to show form invalid error messages
*/
    @Input('show-error') showError : boolean = false;

  /*
Properties
name : height
datatype :   any
version : 4.0 onwards
default : none
description : User can set the height to form
*/
  @Input()  height : any;
  /*
Properties
name : min-height
datatype :   any
version : 4.0 onwards
default : none
description : provides minimum height of the form.
*/
  @Input('min-height')  minHeight : any;

  /*
Properties
name : body-height
datatype :   any
version : 4.0 onwards
default : none
description : provides form body height.
*/
  @Input('body-height') bodyheight : any;

  @ViewChild('formHeader', {read: ElementRef}) public formHeader: ElementRef;

  @ViewChild('formFooter', {read: ElementRef}) public formFooter: ElementRef;

  /*
Events
name : showErrorMsg
datatype : any
version : none
default : 
description : Event fired if showError msg info button is clicked
*/
      @Output() showErrorMsg: any = new EventEmitter<any>();

      componentError:any[] = [];

    constructor(){
        this.checkForm = false;
        this.isFormValid = false;
        this.showDialogue = false;
        this.headeralign = "left";
        this.footeralign = "right";
    }


  onResize(){

    if(this.bodyheight){
      let h = (window.innerHeight/100)*this.bodyheight;

      if(this.formHeader && this.formHeader.nativeElement && this.formHeader.nativeElement.offsetHeight)
        h = h - this.formHeader.nativeElement.offsetHeight;

      if(this.formFooter && this.formFooter.nativeElement && this.formFooter.nativeElement.offsetHeight)
        h = h - this.formFooter.nativeElement.offsetHeight;


      if(this.bodyheight === 100)
        h = h - 40;

      this.minHeight = h;
      this.height = h;
    }
  }
    ngOnInit(){

    }

    ngAfterViewInit(){

        this.textinput = this.queryTextinput.toArray();
        this.textarea = this.queryTextArea.toArray();
        this.password = this.queryPassword.toArray();
        this.emailinput = this.queryEmailinput.toArray();
        this.numinput = this.queryNuminput.toArray();
        this.chkBox = this.queryCheckbox.toArray();
        this.chkBoxGrp = this.queryCheckboxGrp.toArray();
        this.radio = this.queryRadio.toArray();
        this.dropdown = this.queryDropdown.toArray();
        this.typeahead = this.queryTypeahead.toArray();
        this.tags = this.queryTags.toArray();
        this.datefiled = this.queryDate.toArray();
        this.toggle = this.queryToggle.toArray();

      this.btns.toArray().forEach((c)=>{
        if (c.formbind == this.fname && !c.disabled) {
          c.disabled = true;
          this.buttons.push(c);
          this.checkForm = true;

        }
      });

        this.footer = this.queryFooter.toArray();
    }

    ngAfterContentInit(){

    }

    ngDoCheck(){
        this.checkFormvalidity();
    }

    closeDialogue()
    {
        this.showDialogue = !this.showDialogue;
    }

    checkFormvalidity(){
        this.isFormValid = true;
        this.componentError= [];

        if(this.textinput && this.textinput.length>0){
            this.textinput.forEach((c)=>{
                 let flag = c.isComponentValid && c.isValid;
                 this.validationFlagSet(flag,c,'Text Input');
            });
        }

        if(this.dropdown && this.dropdown.length>0){
            this.dropdown.forEach((c)=>{
                 let flag = c.isComponentValid ;
                 this.validationFlagSet(flag,c,'DropDown');
            });
        }

        if(this.typeahead && this.typeahead.length>0){
            this.typeahead.forEach((c)=>{
                 let flag = c.isComponentValid;
                 this.validationFlagSet(flag,c,'Typeahead');
            });
        }

        if(this.datefiled){
            this.datefiled.forEach((c)=>{
                let flag;
                flag = c.isComponentValid;
                this.validationFlagSet(flag,c,'Date Picker');
            });
        }
        if(this.tags && this.tags.length>0){
            this.tags.forEach((c)=>{
                 let flag = c.isComponentValid;
                 this.validationFlagSet(flag,c,'Tag Input');
            });
        }
        if(this.numinput && this.numinput.length>0){
            this.numinput.forEach((c)=>{
                let flag = c.isComponentValid && c.isValid;
                this.validationFlagSet(flag,c,'Number Input');
            });
        }

       if(this.password && this.password.length>0){
            this.password.forEach((c)=>{
                let flag = c.isComponentValid && c.isValid;
                this.validationFlagSet(flag,c,'Password Input');
            });
        }

        if(this.emailinput && this.emailinput.length>0){
            this.emailinput.forEach((c)=>{
                let flag = c.isComponentValid && c.isValid;
                this.validationFlagSet(flag,c,'Email Input');
            });
        }

        if(this.radio){
            this.radio.forEach((c)=>{
                let flag = c.isComponentValid;
                this.validationFlagSet(flag,c,'RadioGroup');
            });
        }
        if(this.chkBox){
            this.chkBox.forEach((c)=>{
                let flag = c.isComponentValid;
                this.validationFlagSet(flag,c,'Checkbox');
            });
        }

        if(this.chkBoxGrp && this.chkBoxGrp.length > 0 ){
            this.chkBoxGrp.forEach((c)=>{
                let flag = c.isComponentValid;
                this.validationFlagSet(flag,c,'CheckBox Group');
            });
        }

        if(this.textarea && this.textarea.length>0){
            this.textarea.forEach((c)=>{
                let flag = c.isComponentValid && c.isValid;
                this.validationFlagSet(flag,c,'Textarea Input');
            });
        }

      if(this.toggle && this.toggle.length>0){
        this.toggle.forEach((c)=>{
          let flag = c.isComponentValid;
          this.validationFlagSet(flag,c,'Toggle Input');
        });
      }

       /* if(this.footer  && this.footer.length>0){
            this.footer.forEach((c)=>{
                this.buttons = this.footer[0].buttons;
                this.buttons.forEach((c)=>{
                    if(c.formbind == this.fname) {
                    c.disabled = !this.isFormValid;

                    }
                });
            });
        }*/

      if (this.checkForm) {
        this.buttons.forEach((c)=>{
          c.disabled = !this.isFormValid;
        });
      }

      }


      validationFlagSet(flag:any, componentRef:any, componentName:string) {
        let errorObject:any = {};
        if(!flag) {
          errorObject['component'] = componentName;
          errorObject['label'] = componentRef.fieldlabel;
          this.componentError.push(errorObject);
        }
        if(!flag && this.isFormValid)
        {
          this.isFormValid = flag;
        }
      }

      showErrors(event:any)
      {
          this.showDialogue = !this.isFormValid;
          if(! this.isFormValid) {
            this.showErrorMsg.emit(this.componentError);
            this.showDialogue = true;
          } else {
            this.showErrorMsg.emit(this.componentError);
            this.showDialogue = false;
          }
      }

      getErrorMsgData(): any {
       return this.componentError;
      }

}
