/**
 * Created by pratik on 1/12/17.
 */


import {
  Component, DoCheck, ElementRef, EventEmitter, forwardRef, HostListener, Input, OnInit, Output, Renderer2
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {CommonDataService} from "../../services/data/common.data.service";

const noop = () => {
};

export const CUSTOM_DROPDOWN_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AmexioDropDownComponent), multi: true
};


@Component({
  selector: 'amexio-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [CUSTOM_DROPDOWN_CONTROL_VALUE_ACCESSOR]
})
export class AmexioDropDownComponent implements OnInit, DoCheck, ControlValueAccessor {

  @Input('field-label') fieldlabel: string;

  @Input('allow-blank') allowblank: string;

  @Input() data: any;

  @Input('data-reader') datareader: string;

  @Input('http-method') httpmethod: string;

  @Input('http-url') httpurl: string;

  @Input('display-field') displayfield: string;

  @Input('value-field') valuefield: string;

  @Input() search: boolean;

  @Input('multi-select') multiselect: boolean;

  helpInfoMsg: string;

  displayValue: any;

  _errormsg: string;

  filteredOptions: any[] = [];

  get errormsg(): string {
    return this._errormsg;
  }

  @Input('error-msg')
  set errormsg(value: string) {
    this.helpInfoMsg = value + '<br/>';
  }

  @Output() onBlur: any = new EventEmitter<any>();

  @Output() input: any = new EventEmitter<any>();

  @Output() focus: any = new EventEmitter<any>();

  @Output() onSingleSelect: any = new EventEmitter<any>();

  @Output() onMultiSelect: any = new EventEmitter<any>();

  @Output() onClick: any = new EventEmitter<any>();

  showToolTip: boolean;

  @Input('place-holder') placeholder: string;

  @Input() disabled: boolean;

  @Input('icon-feedback') iconfeedback: boolean;

  @Input('font-style') fontstyle: string;

  @Input('font-family') fontfamily: string;

  @Input('font-size') fontsize: string;

  @Input('has-label') haslabel: boolean = true;

  @Input('enable-popover') enablepopover: boolean;


  @HostListener('document:click', ['$event.target']) @HostListener('document: touchstart', ['$event.target'])
  public onElementOutClick(targetElement: HTMLElement) {
    let parentFound = false;
    while (targetElement != null && !parentFound) {
      if (targetElement === this.element.nativeElement) {
        parentFound = true;
      }
      targetElement = targetElement.parentElement;
    }
    if (!parentFound) {
      this.showToolTip = false;
    }
  }

  responseData: any;

  previousData: any;

  viewData: any;

  multiselectValues: any[] = [];

  maskloader:boolean=true;

  constructor(public dataService: CommonDataService, public element: ElementRef, public renderer: Renderer2) {
  }

  ngOnInit() {
    if (this.placeholder == '' || this.placeholder == null) this.placeholder = 'Choose Option';
    if (this.httpmethod && this.httpurl) {
      this.dataService.fetchData(this.httpurl, this.httpmethod).subscribe(response => {
        this.responseData = response.json();
      }, error => {
      }, () => {
        this.setData(this.responseData);
      });

    } else if (this.data) {
      this.previousData = JSON.parse(JSON.stringify(this.data));
      this.setData(this.data);
    }
    this.maskloader=false;
  }


  setData(httpResponse: any) {
    //Check if key is added?
    let responsedata = httpResponse;
    if (this.datareader != null) {
      this.multiselectValues = [];
      let dr = this.datareader.split(".");
      for (let ir = 0; ir < dr.length; ir++) {
        responsedata = responsedata[dr[ir]];
      }
    } else {
      responsedata = httpResponse;
    }
    this.viewData = responsedata.sort((a: any, b: any) => a[this.displayfield].toLowerCase() !== b[this.displayfield].toLowerCase() ? a[this.displayfield].toLowerCase() < b[this.displayfield].toLowerCase() ? -1 : 1 : 0);
    this.filteredOptions = this.viewData;

    if (this.multiselect) {
      let preSelectedMultiValues: string = '';
      let optionsChecked: any [] = [];
      this.viewData.forEach((row: any) => {
        if (row.hasOwnProperty('checked') && row.checked) {
          optionsChecked.push(row[this.valuefield]);
          this.multiselectValues.push(row);
          preSelectedMultiValues == '' ? preSelectedMultiValues += row[this.displayfield] : preSelectedMultiValues += ',' + row[this.displayfield];
        }
      });
      this.value = optionsChecked;
      this.displayValue = preSelectedMultiValues;
      this.onMultiSelect.emit(this.multiselectValues);
    }

    //Set user selection
    if (this.value != null) {
      let valueKey = this.valuefield;
      let displayKey = this.displayfield;
      let val = this.value;

      this.viewData.forEach((item: any) => {
        if (item[valueKey] == val) this.displayValue = item[displayKey];
      });
      this.onSingleSelect.emit(this.value);
    }
  }

  ngDoCheck() {
    if (JSON.stringify(this.previousData) != JSON.stringify(this.data)) {
      this.previousData = JSON.parse(JSON.stringify(this.data));
      this.setData(this.data);
    }
  }

  onItemSelect(row: any) {
    if (this.multiselect) {
      let optionsChecked: any [] = [];
      this.multiselectValues = [];
      if (row.hasOwnProperty('checked')) {
        row.checked = !row.checked;
        this.filteredOptions.forEach((row: any) => {
          if (row.checked) {
            optionsChecked.push(row[this.valuefield]);
            this.multiselectValues.push(row);
          }
        });
        this.value = optionsChecked;
        this.onMultiSelect.emit(this.multiselectValues);
      }
    } else {
      this.value = row[this.valuefield];  //Issue here?
      this.displayValue = row[this.displayfield];

      this.multiselect ? this.showToolTip = true : this.showToolTip = false;
      this.onSingleSelect.emit(this.value);
    }
  }

  getDisplayText(): string {
    if (this.multiselect) {
      let multiselectDisplayString: any = '';
      this.multiselectValues.forEach((row: any) => {
        multiselectDisplayString == '' ? multiselectDisplayString += row[this.displayfield] : multiselectDisplayString += ',' + row[this.displayfield];
      });
      if (this.multiselectValues.length > 0)
        return multiselectDisplayString; else
        return '';
    } else
      return this.displayValue == undefined ? '' : this.displayValue
  }

  onDropDownClick(event: any) {
    this.onClick.emit(event);
  }

  onChange(event: any) {
    this.value = event;
  }

  onInput() {
    this.input.emit();
  }

  onDropDownSearchKeyUp(event: any) {

    if (this.search) {
      let keyword = event.target.value;
      if (keyword != null && keyword != '' && keyword != ' ') {
        this.filteredOptions = [];
        let search_Term = keyword.toLowerCase();
        this.viewData.forEach((row: any) => {
          if (row[this.displayfield].toLowerCase().startsWith(search_Term)) {
            this.filteredOptions.push(row);
          }
        });
      }
      if (keyword == '') {
        this.filteredOptions = this.viewData;
      }
    }

  }


  // The internal dataviews model
  private innerValue: any = '';

  //Placeholders for the callbacks which are later provided
  //by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  //get accessor
  get value(): any {
    return this.innerValue;
  }

  //set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  //Set touched on blur
  onblur() {
    this.onTouchedCallback();
    this.onBlur.emit();
  }

  onFocus() {
    this.showToolTip = true;
    this.focus.emit();
  }

  //From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

}

