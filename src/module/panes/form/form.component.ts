/*
Component Name : Amexio Form
Component Selector : <amexio-form>
Component Description : Amexio Form provides an easy way to organize big form components and validating them.

*/
import {
  AfterContentInit, AfterViewInit, Component, ContentChildren,
  ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChild,
  ViewChildren} from '@angular/core';
import { AmexioButtonComponent } from './../../forms/buttons/button.component';
import { AmexioCheckBoxGroupComponent } from './../../forms/checkbox-group/checkbox.group.component';
import { AmexioCheckBoxComponent } from './../../forms/checkbox/checkbox.component';
import { AmexioDateTimePickerComponent } from './../../forms/datetimepicker/datetimepicker.component';
import { AmexioDropDownComponent } from './../../forms/dropdown/dropdown.component';
import { AmexioEmailInputComponent } from './../../forms/emailinput/emailinput.component';
import { AmexioLabelComponent } from './../../forms/label/label.component';
import { AmexioNumberInputComponent } from './../../forms/numberinput/numberinput.component';
import { AmexioPasswordComponent } from './../../forms/passwordinput/passwordinput.component';
import { AmexioRadioGroupComponent } from './../../forms/radio/radiogroup.component';
import { AmexioTagsInputComponent } from './../../forms/tagsinput/tags.input.component';
import { AmexioTextAreaComponent } from './../../forms/textarea/textarea.component';
import { AmexioTextInputComponent } from './../../forms/textinput/textinput.component';
import { ToolbarComponent} from './../../forms/toolbar/toolbar.component';
import { ToolBarActionComponent } from './../../forms/toolbar/toolbaraction.component';
import { AmexioTypeAheadComponent } from './../../forms/typeahead/typeahead.component';

import { AmexioToggleComponent } from '../../forms/toggle/toggle.component';

import { AmexioFormActionComponent } from './form.action.component';
import { AmexioFormBodyComponent } from './form.body.component';
import { AmexioFormHeaderComponent } from './form.header.component';

@Component({
  selector: 'amexio-form',
  templateUrl: './form.component.html',
})
export class AmexioFormComponent implements OnInit, AfterViewInit, AfterContentInit {

  isFormValid: boolean;

  showDialogue: boolean;

  checkForm: boolean;

  @ContentChildren(AmexioTextInputComponent, { descendants: true }) queryTextinput: QueryList<AmexioTextInputComponent>;
  textinput: AmexioTextInputComponent[];

  @ContentChildren(AmexioTextAreaComponent, { descendants: true }) queryTextArea: QueryList<AmexioTextAreaComponent>;
  textarea: AmexioTextAreaComponent[];

  @ContentChildren(AmexioEmailInputComponent, { descendants: true }) queryEmailinput: QueryList<AmexioEmailInputComponent>;
  emailinput: AmexioEmailInputComponent[];

  @ContentChildren(AmexioNumberInputComponent, { descendants: true }) queryNuminput: QueryList<AmexioNumberInputComponent>;
  numinput: AmexioNumberInputComponent[];

  @ContentChildren(AmexioPasswordComponent, { descendants: true }) queryPassword: QueryList<AmexioPasswordComponent>;
  password: AmexioPasswordComponent[];

  @ContentChildren(AmexioCheckBoxComponent, { descendants: true }) queryCheckbox: QueryList<AmexioCheckBoxComponent>;
  chkBox: AmexioCheckBoxComponent[];

  @ContentChildren(AmexioCheckBoxGroupComponent, { descendants: true }) queryCheckboxGrp: QueryList<AmexioCheckBoxGroupComponent>;
  chkBoxGrp: AmexioCheckBoxGroupComponent[];

  @ContentChildren(AmexioRadioGroupComponent, { descendants: true }) queryRadio: QueryList<AmexioRadioGroupComponent>;
  radio: AmexioRadioGroupComponent[];

  @ContentChildren(AmexioDropDownComponent, { descendants: true }) queryDropdown: QueryList<AmexioDropDownComponent>;
  dropdown: AmexioDropDownComponent[];

  @ContentChildren(AmexioTypeAheadComponent, { descendants: true }) queryTypeahead: QueryList<AmexioTypeAheadComponent>;
  typeahead: AmexioTypeAheadComponent[];

  @ContentChildren(AmexioTagsInputComponent, { descendants: true }) queryTags: QueryList<AmexioTagsInputComponent>;
  tags: AmexioTagsInputComponent[];

  @ContentChildren(AmexioDateTimePickerComponent, { descendants: true }) queryDate: QueryList<AmexioDateTimePickerComponent>;
  datefiled: AmexioDateTimePickerComponent[];

  @ContentChildren(AmexioToggleComponent, { descendants: true }) queryToggle: QueryList<AmexioToggleComponent>;
  toggle: AmexioToggleComponent[];

  @ContentChildren(AmexioButtonComponent, { descendants: true }) btns: QueryList<AmexioButtonComponent>;
  buttons: AmexioButtonComponent[];

  @ContentChildren(AmexioFormActionComponent) queryFooter: QueryList<AmexioFormActionComponent>;
  footer: AmexioFormActionComponent[];

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
default :
description : Form binding attribute
*/

  @Input('form-name') fname: string;

  /*
Properties
name : header
datatype : boolean
version : 4.2 onwards
default : false
description : Form header to display
*/
  @Input('header') header: string;

  /*
Properties
name : show-error
datatype : boolean
version : 4.2 onwards
default : false
description : Flag to show form invalid error messages
*/
  @Input('show-error') showError = false;

  /*
Properties
name : height
datatype :   any
version : 4.0 onwards
default :
description : User can set the height to form
*/
  @Input() height: any;
  /*
Properties
name : min-height
datatype :   any
version : 4.0 onwards
default :
description : Provides minimum height of the form.
*/
  @Input('min-height') minHeight: any;

  /*
Properties
name : body-height
datatype :   any
version : 4.0 onwards
default :
description : Provides form body height.
*/
  @Input('body-height') bodyheight: any;

  @ViewChild('formHeader', { read: ElementRef }) public formHeader: ElementRef;

  @ViewChild('formFooter', { read: ElementRef }) public formFooter: ElementRef;

  /*
Events
name : showErrorMsg
datatype : any
version : none
default :
description : Event fired if showError msg info button is clicked
*/
  @Output() showErrorMsg: any = new EventEmitter<any>();

  componentError: any[] = [];

  headerPadding: string;

  bodyPadding: string;

  footerPadding: string;

  @ContentChildren(AmexioFormHeaderComponent) amexioHeader: QueryList<AmexioFormHeaderComponent>;

  headerComponentList: AmexioFormHeaderComponent[];

  @ContentChildren(AmexioFormBodyComponent) amexioBody: QueryList<AmexioFormBodyComponent>;

  bodyComponentList: AmexioFormBodyComponent[];

  @ContentChildren(AmexioFormActionComponent) amexioFooter: QueryList<AmexioFormActionComponent>;

  footerComponentList: AmexioFormActionComponent[];

  @ContentChildren(AmexioLabelComponent, { descendants: true }) queryLabel: QueryList<AmexioLabelComponent>;
  label: AmexioLabelComponent[];

  constructor() {
    this.checkForm = false;
    this.isFormValid = false;
    this.showDialogue = false;
    this.headeralign = 'left';
    this.footeralign = 'right';
  }
  ngAfterContentInit() {
    // FOR HEADER PADING
    this.headerComponentList = this.amexioHeader.toArray();
    this.headerComponentList.forEach((item: AmexioFormHeaderComponent, currentIndex) => {
      if (item.padding) {
        this.headerPadding = item.padding;
      }
    });

    // FOR BODY PADDING
    this.bodyComponentList = this.amexioBody.toArray();
    this.bodyComponentList.forEach((item: AmexioFormBodyComponent, currentIndex) => {
      if (item.padding) {
        this.bodyPadding = item.padding;
      }
    });
    // FOR FOOTER PADDING
    this.footerComponentList = this.amexioFooter.toArray();
    this.footerComponentList.forEach((item: AmexioFormActionComponent, currentIndex) => {
      if (item.padding) {
        this.footerPadding = item.padding;
      }
    });
  }

  onResize() {

    if (this.bodyheight) {
      let h = (window.innerHeight / 100) * this.bodyheight;

      if (this.formHeader && this.formHeader.nativeElement && this.formHeader.nativeElement.offsetHeight) {
        h = h - this.formHeader.nativeElement.offsetHeight;
      }

      if (this.formFooter && this.formFooter.nativeElement && this.formFooter.nativeElement.offsetHeight) {
        h = h - this.formFooter.nativeElement.offsetHeight;
      }
      if (this.bodyheight === 100) {
        h = h - 40;
      }
      this.minHeight = h;
      this.height = h;
    }
  }
  ngOnInit() {

  }

  ngAfterViewInit() {
    this.buttons = [];
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
    this.label = this.queryLabel.toArray();

    this.iterate(this.textinput, 'Text Input');
    this.iterate(this.textarea, 'Text Area');
    this.iterate(this.numinput, 'Number Input');
    this.iterate(this.emailinput, 'Email Id');
    this.iterate(this.password, 'Password');
    this.iterate(this.chkBox, 'Checkbox');
    this.iterate(this.chkBoxGrp, 'Checkbox Group');
    this.iterate(this.radio, 'Radio Group');
    this.iterate(this.typeahead, 'TypeAhead');
    this.iterate(this.tags, 'Tags');
    this.iterate(this.dropdown, 'Dropdown');
    this.iterate(this.datefiled, 'Date field');
    this.iterate(this.toggle, 'Toggle');
    this.iterate(this.label, 'Label');
    setTimeout(() => {
      this.btns.toArray().forEach((c) => {
        if ((c.formbind === this.fname) && !c.disabled) {
          c.setDisabled(true);
          this.buttons.push(c);
          this.checkForm = true;
        }
      });
    }, 1000);

    this.checkFormvalidity();
    this.footer = this.queryFooter.toArray();
    this.onResize();

  }

  closeDialogue() {
    this.showDialogue = !this.showDialogue;
  }

  checkFormvalidity() {
    this.isFormValid = true;
    this.componentError = [];
    if (this.textinput && this.textinput.length > 0) {
      this.textinput.forEach((node: any) => node.isComponentValid.subscribe(
        (eventdata: any) => {
          this.validationFlagSet(node.isValid, node, 'Text Input');
        }),
      );
    }
    if (this.textarea && this.textarea.length > 0) {
      this.textarea.forEach((node) => node.isComponentValid.subscribe(
        (eventdata: any) => {
          this.validationFlagSet(node.isValid, node, 'TextArea Input');
        }),
      );
    }
    this.validationNumPassword();
    this.validationEmailChkBox();
    this.validationDateToggle();
    this.validationCkGrpType();
    this.validationDrpDownTags();

  }

  validationNumPassword() {
    if (this.numinput && this.numinput.length > 0) {
      this.numinput.forEach((node: any) => node.isComponentValid.subscribe(
        (eventdata: any) => {
          this.validationFlagSet(node.isValid, node, 'Number Input');
        }),
      );
    }
    if (this.password && this.password.length > 0) {
      this.password.forEach((node) => node.isComponentValid.subscribe(
        (eventdata: any) => {
          this.validationFlagSet(node.isValid, node, 'Password Input');
        }),
      );
    }
  }
  validationEmailChkBox() {
    if (this.emailinput && this.emailinput.length > 0) {
      this.emailinput.forEach((node: any) => node.isComponentValid.subscribe(
        (eventdata: any) => {
          this.validationFlagSet(node.isValid, node, 'Email Input');
        }),
      );
    }

    if (this.chkBox) {
      this.chkBox.forEach((node) => node.isComponentValid.subscribe(
        (eventdata: any) => {
          this.validationFlagSet(node.isValid, node, 'CheckBox Input');
        }),
      );
    }
  }

  validationDateToggle() {
    if (this.datefiled) {
      this.datefiled.forEach((node) => node.isComponentValid.subscribe(
        (eventdata: any) => {
          this.validationFlagSet(node.isValid, node, 'Date Picker');
        }),
      );
    }
    if (this.toggle && this.toggle.length > 0) {
      this.toggle.forEach((node) => node.isComponentValid.subscribe(
        (eventdata: any) => {
          this.validationFlagSet(node.isValid, node, 'Toggle');
        }),
      );
    }

    if (this.radio) {
      this.radio.forEach((node) => node.isComponentValid.subscribe(
        (eventdata: any) => {
          this.validationFlagSet(node.isValid, node, 'Radio Group');
        }),
      );
    }
  }

  validationCkGrpType() {
    if (this.chkBoxGrp && this.chkBoxGrp.length > 0) {
      this.chkBoxGrp.forEach((node) => node.isComponentValid.subscribe(
        (eventdata: any) => {
          this.validationFlagSet(node.isValid, node, 'CheckBoc Group');
        }),
      );
    }

    if (this.typeahead && this.typeahead.length > 0) {
      this.typeahead.forEach((node) => node.isComponentValid.subscribe(
        (eventdata: any) => {
          this.validationFlagSet(node.isValid, node, 'Typeahead');
        }),
      );
    }
  }

  validationDrpDownTags() {
    if (this.dropdown && this.dropdown.length > 0) {
      this.dropdown.forEach((node: any) => node.isComponentValid.subscribe(
        (eventdata: any) => {
          this.validationFlagSet(node.isValid, node, 'Dropdown');
        }),
      );
    }

    if (this.tags && this.tags.length > 0) {
      this.tags.forEach((node) => node.isComponentValid.subscribe(
        (eventdata: any) => {
          this.validationFlagSet(node.isValid, node, 'Tags');
        }),
      );
    }
  }

  iterate(components: any[], name: string) {
    setTimeout(() => {
      components.forEach((cmp) => {
        const isValid = cmp.checkValidity();
        this.validationFlagSet(isValid, cmp, name);
      });
    }, 1000);
  }

  validationFlagSet(flag: any, componentRef: any, componentName: string) {

    if (flag) {
      this.componentError.forEach((obj, index) => {
        if (obj.label === componentRef.fieldlabel) {
          this.componentError.splice(index, 1);
        }
      });
    } else {
      this.addErrorMsg(componentRef, componentName);
    }
    if (!flag && this.isFormValid) {
      this.isFormValid = flag;
    }
    if (this.componentError && this.componentError.length > 0) {
      this.buttons.forEach((button) => {
        button.disabled = true;
      });
    } else if (this.componentError && this.componentError.length === 0) {
      this.buttons.forEach((button) => {
        button.disabled = false;
      });
    }
  }

  // THIS METHOD IS USED FOR ADDING MSG
  addErrorMsg(componentRef: any, componentName: string) {
    const errorObject: any = {};
    errorObject['component'] = componentName;
    errorObject['label'] = componentRef.fieldlabel;
    let flag = true;
    this.componentError.forEach((error) => {
      if (error.label === componentRef.fieldlabel) {
        flag = false;
      }
    });

    if (flag) {
      this.componentError.push(errorObject);
    }
    this.checkForm = true;
  }

  // REMOVE OBJECT FROM ARRAY
  showErrors(event: any) {
    this.showDialogue = !this.isFormValid;
    if (!this.isFormValid) {
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
