/*
Component Name : Amexio Form
Component Selector : <amexio-form>
Component Description : Amexio Form provides an easy way to organize big form components and validating them.

*/
import {
  AfterContentChecked, AfterContentInit, AfterViewInit, Component, ContentChildren,
  ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChild,
   ViewChildren} from '@angular/core';
import { FormGroup , NgForm, NgModel} from '@angular/forms';
import { AmexioButtonComponent } from './../../forms/buttons/button.component';
import { AmexioFormActionComponent } from './form.action.component';
import { AmexioFormBodyComponent } from './form.body.component';
import { AmexioFormHeaderComponent } from './form.header.component';

@Component({
  selector: 'amexio-form',
  templateUrl: './form.component.html',
})
export class AmexioFormComponent implements OnInit, AfterViewInit, AfterContentInit, AfterContentChecked {

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
/*
Properties
name : form-group
datatype :   any
version : 5.3.2 onwards
default :
description : This attribute use for form binding.
*/

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

  errorMsgArray: any[];

  isFormValid: boolean;

  showDialogue: boolean;

  checkForm: boolean;

  @ContentChildren(AmexioFormHeaderComponent) amexioHeader: QueryList<AmexioFormHeaderComponent>;

  headerComponentList: AmexioFormHeaderComponent[];

  @ContentChildren(AmexioFormBodyComponent) amexioBody: QueryList<AmexioFormBodyComponent>;

  bodyComponentList: AmexioFormBodyComponent[];

  @ContentChildren(AmexioFormActionComponent) amexioFooter: QueryList<AmexioFormActionComponent>;

  footerComponentList: AmexioFormActionComponent[];

  @ContentChildren(AmexioButtonComponent, { descendants: true }) btns: QueryList<AmexioButtonComponent>;
  buttons: AmexioButtonComponent[];

  @ViewChild('amexioForm') amexioForm: FormGroup;

  @ViewChild(NgForm) public form: NgForm;

  @ContentChildren(NgModel, { descendants: true }) public models: QueryList<NgModel>;

  constructor() {
    this.checkForm = false;
    this.isFormValid = false;
    this.showDialogue = false;
    this.headeralign = 'left';
    this.footeralign = 'right';
    this.errorMsgArray = [];
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
    this.buttons = [];
  }

  ngAfterViewInit() {
    const ngContentModels = this.models.toArray();
    ngContentModels.forEach((model) => {
      if (!model.name || model.name === null) {
        model.name = model.valueAccessor['name'];
      }
      this.form.addControl(model);
    });
    this.btns.toArray().forEach((btnCom) => {
    if ((btnCom.formbind === this.fname) && !btnCom.disabled) {
      this.buttons.push(btnCom);
    }
    });
    this.validateForm();
    this.onResize();
  }

  closeDialogue() {
    this.showDialogue = !this.showDialogue;
  }
  // THIS METHOD IS USED FOR ADDING MSG
  addErrorMsg() {
    if (this.amexioForm && this.amexioForm.status === 'INVALID') {
      for ( const [key, value] of Object.entries( this.amexioForm.controls ) ) {
        if (value && value.status === 'INVALID') {
          const errorObject: any = {};
          errorObject['label'] = key;
          this.errorMsgArray.push(errorObject);
          }
        }
    }
  }

  // REMOVE OBJECT FROM ARRAY
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

  // THIS METHOD IS USED FOR DISABLE BUTTON
  validateForm() {
    if (this.amexioForm && this.amexioForm.status === 'INVALID') {
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
  }
  findformStyleClass() {
    if (this.headeralign === 'right') {
      return 'flex-end';
    }
    if (this.headeralign === 'left') {
      return 'flex-start';
    }
    if (this.headeralign === 'center') {
      return 'flex-center';
    }
  }

}
