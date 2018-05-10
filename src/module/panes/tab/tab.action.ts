
import { Component, OnInit, QueryList, ContentChildren, ViewChild } from '@angular/core';
import { AmexioTextInputComponent } from '../../forms/textinput/textinput.component';
import { AmexioCheckBoxComponent } from '../../forms/checkbox/checkbox.component';
import { AmexioRadioGroupComponent} from '../../forms/radio/radiogroup.component';
import { AmexioLabelComponent } from '../../forms/label/label.component';
import { AmexioRatingComponent } from '../../forms/rating/rating.component';
import { AmexioToggleComponent } from '../../forms/toggle/toggle.component';
import { AmexioButtonComponent } from '../../forms/buttons/button.component';
import { AmexioImageComponent } from '../../media/image/image.component';
import { AmexioNumberInputComponent } from '../../forms/numberinput/numberinput.component';
import { AmexioDropDownComponent } from '../../forms/dropdown/dropdown.component';
import { AmexioCheckBoxGroupComponent } from '../../forms/checkbox-group/checkbox.group.component';

// import {AmexioDateTimePicker} from '../../forms/datetimepicker/datetimepicker.component';

@Component({
  selector: 'amexio-tab-action',
  template: `
   <ng-container *ngIf="showContent">
   <ng-content></ng-content>
   </ng-container>
   `
})

export class AmexioTabActionComponent implements OnInit {

  @ContentChildren(AmexioTextInputComponent, { descendants: true }) queryTextinput: QueryList<AmexioTextInputComponent>;
  textinput: AmexioTextInputComponent[];

  @ContentChildren(AmexioCheckBoxComponent, { descendants: true }) queryCheckbox: QueryList<AmexioCheckBoxComponent>;
  checkbox: AmexioCheckBoxComponent[];

  @ContentChildren(AmexioRadioGroupComponent, { descendants: true }) queryRadioGroup: QueryList<AmexioRadioGroupComponent>;
  radioGroup: AmexioRadioGroupComponent[];

  // @ContentChildren(AmexioDateTimePicker, { descendants: true }) queryDateTimePicker: QueryList<AmexioDateTimePicker>;
  // dateTimePicker: AmexioDateTimePicker[];

  @ContentChildren(AmexioLabelComponent, { descendants: true }) queryLabel: QueryList<AmexioLabelComponent>;
  label: AmexioLabelComponent[];

  @ContentChildren(AmexioNumberInputComponent, { descendants: true }) queryNumber: QueryList<AmexioNumberInputComponent>;
  number: AmexioNumberInputComponent[];

  @ContentChildren(AmexioRatingComponent, { descendants: true }) queryRating: QueryList<AmexioRatingComponent>;
  rating: AmexioRatingComponent[];

  @ContentChildren(AmexioToggleComponent, { descendants: true }) queryToggle: QueryList<AmexioToggleComponent>;
  toggle: AmexioToggleComponent[];

  @ContentChildren(AmexioButtonComponent, { descendants: true }) queryButton: QueryList<AmexioButtonComponent>;
  button: AmexioButtonComponent[];

  @ContentChildren(AmexioImageComponent, { descendants: true }) queryImage: QueryList<AmexioImageComponent>;
  image: AmexioImageComponent[];

  @ContentChildren(AmexioDropDownComponent, { descendants: true }) queryDropDown: QueryList<AmexioDropDownComponent>;
  dropdown: AmexioDropDownComponent[];

  @ContentChildren(AmexioCheckBoxGroupComponent, { descendants: true }) queryCheckBoxGroup: QueryList<AmexioCheckBoxGroupComponent>;
  checkboxgroup: AmexioCheckBoxGroupComponent[];

  actionComponent: any;



  showContent: boolean;

  constructor() {
    this.showContent = false;
    this.actionComponent = "";
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  checkActionComponent() {

    this.textinput = this.queryTextinput.toArray();
    if (this.textinput.length > 0) {
      this.actionComponent = 'text';
      this.textinput[0].haslabel = false;
      this.textinput[0].iconfeedback = false;
    }

    this.checkbox = this.queryCheckbox.toArray();
    if (this.checkbox.length > 0) {
      this.actionComponent = 'checkbox';
      this.checkbox[0].fieldlabel = "";
    }

    this.radioGroup = this.queryRadioGroup.toArray();
    if (this.radioGroup.length > 0) {
      this.actionComponent = 'radiogroup';
      this.radioGroup[0].fieldlabel = "";
      this.radioGroup[0].horizontal = true;
    }

    // this.dateTimePicker = this.queryDateTimePicker.toArray();
    // if (this.dateTimePicker.length > 0) {
    //   this.actionComponent = 'datetime';
    //   this.dateTimePicker[0].fieldlabel = "";
    // }

    this.label = this.queryLabel.toArray();
    if (this.label.length > 0) {
      this.actionComponent = 'label';
    }

    this.number = this.queryNumber.toArray();
    if (this.number.length > 0) {
      this.actionComponent = 'number';
      this.number[0].fieldlabel = "";
    }

    this.rating = this.queryRating.toArray();
    if (this.rating.length > 0) {
      this.actionComponent = 'rating';
      this.rating[0].fieldlabel = "";
    }

    this.toggle = this.queryToggle.toArray();
    if (this.toggle.length > 0) {
      this.actionComponent = 'toggle';
      this.toggle[0].fieldlabel = "";
    }

    this.button = this.queryButton.toArray();
    if (this.button.length > 0) {
      this.actionComponent = 'button';
    }

    this.image = this.queryImage.toArray();
    if (this.image.length > 0) {
      this.actionComponent = 'image';
    }
    this.dropdown = this.queryDropDown.toArray();
    if (this.dropdown.length > 0) {
      this.actionComponent = 'dropdown';
      this.dropdown[0].fieldlabel = "";
    }

    this.checkboxgroup = this.queryCheckBoxGroup.toArray();
    if (this.checkboxgroup.length > 0) {
      this.actionComponent = 'checkboxgroup';
      this.checkboxgroup[0].fieldlabel = "";
      this.checkboxgroup[0].horizontal = true;
    }
  }

}
