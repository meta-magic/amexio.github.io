import { AfterContentChecked,  AfterViewInit, Component, ContentChildren, EventEmitter, Input, OnInit,
  Output , QueryList, ViewChild } from '@angular/core';
import { FormBuilder , FormGroup, NgForm, NgModel} from '@angular/forms';
import { IconLoaderService } from './../../services/icon/icon.service';

@Component({
 selector : 'amexio-step-wizard-item',
 templateUrl : './stepwizard.item.component.html',
})
export class StepWizardItemComponent  implements OnInit, AfterContentChecked, AfterViewInit {

 @Input('title') title: string;

 @Input('icon') icon: string;

 @Input('active') active = false;
 @Input('footer-align') footerAlign = 'space-between';

 @Output() onNextStep: any = new EventEmitter<any>();

 @Output() onPreviousStep: any = new EventEmitter<any>();

 @ViewChild(NgForm) public form: NgForm;

 @ContentChildren(NgModel, { descendants: true }) public models: QueryList<NgModel>;

  index = 0;

  showPreviousButton = true;

  showNextButton = true;

  activeClass: string;

  nextLabel = 'Next';

  previousIcon = 'fa fa-chevron-left';

  nextIcon = 'fa fa-chevron-right';

 isNextButtonDisable: boolean;

 constructor(public formBuilder: FormBuilder, private iconService: IconLoaderService) {
   if (this.iconService.iconToUse !== 'fa') {
     this.previousIcon = 'keyboard_arrow_left';
     this.nextIcon = 'keyboard_arrow_right';
   }
 }

 onPreviousClick(event: any) {
   this.onPreviousStep.emit({title: this.title,
    index: this.index, data: this.form.value, emitData: {currentdata: this.form.value, event}});
 }
 onNextClick(event: any) {
   this.onNextStep.emit({title: this.title, index: this.index, data: this.form.value, emitData: {currentdata: this.form.value, event}});
 }
 ngOnInit() {
 }

 ngAfterViewInit() {
   this.registerFormComponent();
   this.validateForm();
 }

 ngAfterContentChecked(): void {
   this.validateForm();
 }

 validateForm() {
   if (this.form && this.form.status === 'INVALID') {
     this.isNextButtonDisable = true;
   } else {
     this.isNextButtonDisable = false;
   }
 }

registerFormComponent() {
   const ngContentModels = this.models.toArray();
   const innerModelArray: any[] = [];

   ngContentModels.forEach((model) => {
     if (!this.isFieldPresentInParentAndChildBoth(innerModelArray, model.name )) {
       if (!model.name || model.name === null) {
         model.name = model.valueAccessor['name'];
       }
       this.form.control.registerControl(model.name, model.control);
     }
   });
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
}
