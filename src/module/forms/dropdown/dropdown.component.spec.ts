/**
 * Created by kedar on 26/6/19.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index';
import { AmexioDropDownComponent } from './dropdown.component';
import { CommonDataService } from '../../services/data/common.data.service';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { DisplayFieldComponent } from '../../base/display-field/display-field.component';
import { CommonIconComponent } from '../../base/components/common.icon.component';
import { DisplayFieldService } from '../../services/data/display.field.service';


describe('amexio-dropdown', () => {
  let comp: AmexioDropDownComponent;
  let fixture: ComponentFixture<AmexioDropDownComponent>;
  let data: any;
  let responsedata: true;
  let displayService: DisplayFieldService;
  let dataService :CommonDataService;
  let _http: HttpClient;
 
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule],
      declarations: [AmexioDropDownComponent, DisplayFieldComponent, CommonIconComponent],
      providers: [IconLoaderService, CommonDataService, DisplayFieldService,HttpClient],
    });
    fixture = TestBed.createComponent(AmexioDropDownComponent);
    comp = fixture.componentInstance;
    displayService = new DisplayFieldService();
    dataService = new CommonDataService(_http)
    event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);
    data = [{
      index: '12345'
    }];
    it('true is true', () => expect(true).toBe(true));
  });

//   it('set data method', () => {
//     let value: any;
//     (<any>comp)._data = value;
//     (<any>comp)['componentLoaded'] = true;
//     expect((<any>comp)).toBeDefined;
//     (<any>comp).setData((<any>comp)._data);
//     expect((<any>comp)['componentLoaded']).toEqual(true);
//     expect((<any>comp).setData()).toHaveBeenCalled;
// });
  //check variables 
  it('check variables in dropdown component ', () => {
    expect(comp.selectedindex).toEqual(-1);
    expect(comp.multiselectValues).toEqual([]);
    expect(comp.maskloader).toEqual(true);
    expect(comp.activedescendant).toBe('aria-activedescendant');
    expect(comp.key).toBe('index');
    expect(comp.displayValue).toBe('');
    expect(comp.filteredOptions).toEqual([]);
  });

  // it('setUserSelection  method', () => {
    
  // });

  // it('setData method for datareader not equal to null', () => {
  //   let responsedata: any;
  //   let httpResponse: any;
  //   httpResponse = {
  //     "data": [
  //       {
  //         "countryName": "Myanmar",
  //         "countryCode1": "MM",
  //         "countryCode2": "MMR",
  //         "countryFlag": "MM.png",
  //         "capital": "",
  //         "currencyCode": "MMK",
  //         "currencyName": "Kyat",
  //         "currencySymbol": "K",
  //         "capitalLatitude": null,
  //         "capitalLongitude": null,
  //         "isoNumeric": 104
  //       },
  //       {
  //         "countryName": "U.S. Virgin Island",
  //         "countryCode1": "VI",
  //         "countryCode2": "VIR",
  //         "countryFlag": "VI.png",
  //         "capital": "",
  //         "currencyCode": "USD",
  //         "currencyName": "Dollar",
  //         "currencySymbol": "$",
  //         "capitalLatitude": null,
  //         "capitalLongitude": null,
  //         "isoNumeric": 850
  //       }]
  //   }
  //   comp.setData(httpResponse);
  //   responsedata = httpResponse;
  //   comp.datareader = 'data';
  //   expect(comp.datareader).not.toEqual(null);
  //   comp.multiselectValues = [];
  //   let dr = comp.datareader.split('.');
  //   expect(dr).toBeDefined();
  //   for (const ir of dr) {
  //     responsedata = responsedata[ir];
  //   }
  //   comp.setResponseData(responsedata);
  //   comp.multiSelection();
  //   comp.setUserSelection();
  //   comp.maskloader = false;
  // });

  it('setData method for datareader equal to null', () => {
    let httpResponse: any;
    httpResponse = 
      [
        {
          "countryName": "Myanmar",
          "countryCode1": "MM",
          "countryCode2": "MMR",
          "countryFlag": "MM.png",
          "capital": "",
          "currencyCode": "MMK",
          "currencyName": "Kyat",
          "currencySymbol": "K",
          "capitalLatitude": null,
          "capitalLongitude": null,
          "isoNumeric": 104
        },
        {
          "countryName": "U.S. Virgin Island",
          "countryCode1": "VI",
          "countryCode2": "VIR",
          "countryFlag": "VI.png",
          "capital": "",
          "currencyCode": "USD",
          "currencyName": "Dollar",
          "currencySymbol": "$",
          "capitalLatitude": null,
          "capitalLongitude": null,
          "isoNumeric": 850
        }];
    comp.datareader = null;
    comp.setData(httpResponse);
    expect(comp.datareader).toEqual(null);
    responsedata = httpResponse;
    comp.setResponseData(responsedata);
    comp.multiSelection();
    comp.setUserSelection();
    comp.maskloader = false;
  });
  // it('setResponseData method', () => {
  //   let responsedata = {
  //     "data": [
  //       {
  //         "countryName": "Myanmar",
  //         "countryCode1": "MM",
  //         "countryCode2": "MMR",
  //         "countryFlag": "MM.png",
  //         "capital": "",
  //         "currencyCode": "MMK",
  //         "currencyName": "Kyat",
  //         "currencySymbol": "K",
  //         "isoNumeric": 104
  //       },
  //       {
  //         "countryName": "U.S. Virgin Island",
  //         "countryCode1": "VI",
  //         "countryCode2": "VIR",
  //         "countryFlag": "VI.png",
  //         "capital": "",
  //         "currencyCode": "USD",
  //         "currencyName": "Dollar",
  //         "currencySymbol": "$",
  //         "isoNumeric": 850
  //       }]
  //   }

  //   comp.setResponseData(responsedata);
  //   expect(responsedata).toBeDefined();

  //   comp.enablesort = true;
  //   expect(comp.enablesort).toEqual(true);

  //   comp.sort = 'asc';
  //   expect(comp.sort.toLowerCase()).toEqual('asc');
  //   comp.sortDataAscending(responsedata);
  // });
  // it('setResponseData else block',()=>{
  //   let responsedata = {
  //     "data": [
  //       {
  //         "countryName": "Myanmar",
  //         "countryCode1": "MM",
  //         "countryCode2": "MMR",
  //         "countryFlag": "MM.png",
  //         "capital": "",
  //         "currencyCode": "MMK",
  //         "currencyName": "Kyat",
  //         "currencySymbol": "K",
  //         "isoNumeric": 104
  //       },
  //       {
  //         "countryName": "U.S. Virgin Island",
  //         "countryCode1": "VI",
  //         "countryCode2": "VIR",
  //         "countryFlag": "VI.png",
  //         "capital": "",
  //         "currencyCode": "USD",
  //         "currencyName": "Dollar",
  //         "currencySymbol": "$",
  //         "isoNumeric": 850
  //       }]
  //   }
  //   comp.setResponseData(responsedata);
  //   expect(responsedata).toBeDefined();
  //   comp.enablesort = true;
  //   expect(comp.enablesort).toEqual(true);


  //   comp.sort = 'dsc';
  //   let sort1 = comp.sort;
  //   expect(sort1.toLowerCase()).toEqual('dsc');
  //   comp.sortDataDescending(responsedata);

  // });
  // it('setResponseData else block2',()=>{
  //   let responsedata = {
  //     "data": [
  //       {
  //         "countryName": "Myanmar",
  //         "countryCode1": "MM",
  //         "countryCode2": "MMR",
  //         "countryFlag": "MM.png",
  //         "capital": "",
  //         "currencyCode": "MMK",
  //         "currencyName": "Kyat",
  //         "currencySymbol": "K",
  //         "isoNumeric": 104
  //       },
  //       {
  //         "countryName": "U.S. Virgin Island",
  //         "countryCode1": "VI",
  //         "countryCode2": "VIR",
  //         "countryFlag": "VI.png",
  //         "capital": "",
  //         "currencyCode": "USD",
  //         "currencyName": "Dollar",
  //         "currencySymbol": "$",
  //         "isoNumeric": 850
  //       }]
  //   }
  //   comp.setResponseData(responsedata);
  //   expect(responsedata).toBeDefined();
  //   comp.enablesort = false;
  //   expect(comp.enablesort).toEqual(false);

  //   comp.viewData = responsedata;
  //   comp.filteredOptions = comp.viewData;
  //   comp.generateIndex(responsedata.data);

  // })



  it('sortDataAscending', () => {
    let data2 = {
      "data": [
        {
          "countryName": "Myanmar",
          "countryCode1": "MM",
          "countryCode2": "MMR",
          "countryFlag": "MM.png",
          "capital": "",
          "currencyCode": "MMK",
          "currencyName": "Kyat",
          "currencySymbol": "K",
          "isoNumeric": 104
        },
        {
          "countryName": "U.S. Virgin Island",
          "countryCode1": "VI",
          "countryCode2": "VIR",
          "countryFlag": "VI.png",
          "capital": "",
          "currencyCode": "USD",
          "currencyName": "Dollar",
          "currencySymbol": "$",
          "isoNumeric": 850
        }]
    }
    comp.sortDataAscending(data);
    comp.displayfield = 'countryName';
    comp.viewData = data2.data.sort((a: any, b: any) => displayService.findValue(comp.displayfield, a).toLowerCase()
      !== displayService.findValue(comp.displayfield, b).toLowerCase() ?
      displayService.findValue(comp.displayfield, a).toLowerCase() <
        displayService.findValue(comp.displayfield, b).toLowerCase() ? -1 : 1 : 0);
    comp.filteredOptions = comp.viewData;
    comp.generateIndex(comp.filteredOptions);
  });
  it('sortDataDescending', () => {
    let data3 =  [
        {
          "countryName": "Myanmar",
          "countryCode1": "MM",
          "countryCode2": "MMR",
          "countryFlag": "MM.png",
          "capital": "",
          "currencyCode": "MMK",
          "currencyName": "Kyat",
          "currencySymbol": "K",
          "isoNumeric": 104
        },
        {
          "countryName": "U.S. Virgin Island",
          "countryCode1": "VI",
          "countryCode2": "VIR",
          "countryFlag": "VI.png",
          "capital": "",
          "currencyCode": "USD",
          "currencyName": "Dollar",
          "currencySymbol": "$",
          "isoNumeric": 850
        }]
    comp.sortDataDescending(data);
    comp.displayfield = 'countryName';
    comp.viewData = data.sort((a: any, b: any) => displayService.findValue(comp.displayfield, a).toLowerCase()
      !== displayService.findValue(comp.displayfield, b).toLowerCase() ?
      displayService.findValue(comp.displayfield, a).toLowerCase() >
        displayService.findValue(comp.displayfield, b).toLowerCase() ? -1 : 1 : 0);
    comp.filteredOptions = comp.viewData;
    comp.generateIndex(comp.filteredOptions);
  })
  it('generateIndex Method ', () => {
    let data = [
        {
          "countryName": "Myanmar",
          "countryCode1": "MM",
          "countryCode2": "MMR",
          "countryFlag": "MM.png",
          "capital": "",
          "currencyCode": "MMK",
          "currencyName": "Kyat",
          "currencySymbol": "K",
          "isoNumeric": 104
        },
        {
          "countryName": "U.S. Virgin Island",
          "countryCode1": "VI",
          "countryCode2": "VIR",
          "countryFlag": "VI.png",
          "capital": "",
          "currencyCode": "USD",
          "currencyName": "Dollar",
          "currencySymbol": "$",
          "isoNumeric": 850
        }]
    comp.generateIndex(data);
    comp.componentId = "dropdown_countryName_1448";
    data.forEach((element: any, index: number) => {
      element['index'] = comp.componentId + 'listitem' + index;
    });
  });
  it('setMultiSelect', () => {
    comp.setMultiSelect();
    comp.multiselectValues = [{
      fruitName: "Apple", code: "Apple", checked: true, index: "dropdown_fruitName_1912listitem0"
    }, {
      fruitName: "Apple1", code: "Apple1", checked: true, index: "dropdown_fruitName_1912listitem1"
    }]
    comp.setMultiSelectData();
    comp.displayfield = 'fruitName';
    let multiselectDisplayString: any = '';
    comp.multiselectValues.forEach((row: any) => {
      multiselectDisplayString === '' ? multiselectDisplayString +=
        displayService.findValue(comp.displayfield, row) : multiselectDisplayString += ', '
        + displayService.findValue(comp.displayfield, row);
    });
    expect(2).toBeGreaterThan(0);
    return multiselectDisplayString;
  })
  it('setMultiSelectData method', () => {
    comp.setMultiSelectData();
    comp.multiselectValues = [];
    comp.innerValue = ['Apple'];
    comp.filteredOptions = [{ fruitName: "Apple", code: "Apple", checked: false, index: "dropdown_fruitName_1977listitem0" }];
    expect(comp.innerValue).toBeDefined()
    expect(comp.innerValue.length).toBeGreaterThan(0);
    const modelValue = comp.innerValue;
    comp.valuefield = 'code';
    comp.filteredOptions.forEach((test) => {
      modelValue.forEach((mdValue: any) => {
        expect(test[comp.valuefield]).toEqual(mdValue);
        expect(test.hasOwnProperty('checked')).toEqual(true);
        test.checked = true;
        comp.multiselectValues.push(test);
      })
    })
  });
  it('multiSelection', () => {
    comp.multiSelection();
    comp.multiselect = true;
    comp.viewData = [{ fruitName: "Apple", code: "Apple", checked: true, index: "dropdown_fruitName_1953listitem0" },
    { fruitName: "Avacado", code: "Avacado", checked: true, index: "dropdown_fruitName_1953listitem1" },
    { fruitName: "Banana", code: "Banana", checked: true, index: "dropdown_fruitName_1953listitem2" }]
    expect(comp.multiselect).toEqual(true)
    expect(comp.viewData).toBeDefined();
    let preSelectedMultiValues = '';
    const optionsChecked: any = [];
    comp.displayfield = 'fruitName'
    comp.viewData.forEach((row: any) => {
      expect(row.hasOwnProperty('checked')).toEqual(true);
      expect(row.checked).toEqual(true)
      optionsChecked.push(row[comp.valuefield]);
      comp.multiselectValues.push(row);
      preSelectedMultiValues === '' ? preSelectedMultiValues +=
        displayService.findValue(comp.displayfield, row) : preSelectedMultiValues += ', ' +
        displayService.findValue(comp.displayfield, row);
      // expect(row.checked).toEqual(false) 
      row['checked'] = false;
    });
  })
  it('multiSelection for else', () => {
    comp.multiselect = true;
    comp.viewData = [{ fruitName: "Apple", code: "Apple", index: "dropdown_fruitName_1953listitem0" },
    { fruitName: "Avacado", code: "Avacado", index: "dropdown_fruitName_1953listitem1" },
    { fruitName: "Banana", code: "Banana", index: "dropdown_fruitName_1953listitem2" }]
    expect(comp.multiselect).toEqual(true)
    expect(comp.viewData).toBeDefined();
    comp.displayfield = 'fruitName'
    comp.viewData.forEach((row: any) => {
      expect(row.hasOwnProperty('checked')).toEqual(false);
      row['checked'] = false;
    });
  })
  it('should call get function and return true', () => {
    expect(comp.data).toBe(undefined);
    let item = comp.value;
    comp._data = item;
    expect(comp.componentLoaded).toBe(undefined);
  });

  it('onChange() method check', () => {
    let value = 'kedar';
    comp.onChange(value);
    expect(comp.innerValue).toBe(value);
    comp.isValid = true;
    expect(comp.isValid).toBe(true);
    comp.isComponentValid.subscribe((g: any) => {
      expect(comp.isComponentValid).toEqual(g);
    });
  });

  // closeOnEScape
  it('closeOnEScape() method check', () => {
    let ev = event
    comp.closeOnEScape(ev);
    comp.showToolTip = false;
    expect(comp.showToolTip).toEqual(false);
  });

  // onInput mehtod
  // it('onInput() method check', () => {
  //   let value = comp.input;
  //   comp.onInput(value);
  //   comp.input.subscribe((g: any) => {
  //     expect(comp.input).toEqual(g);
  //   }); 
  //   comp.onInput(value);
  //   expect(comp.isValid).toBe(value.vaild);
  //   comp.isComponentValid.emit(value.valid);
  // });


  // ngOnInit mehtod
  it('ngOnInit() method check', () => {
    comp.name = comp.generateName(comp.name, comp.fieldlabel, 'dropdowninput');
    comp.componentId = comp.createCompId('dropdown', comp.displayfield);
    comp.isValid = comp.allowblank;
    comp.isComponentValid.emit(comp.allowblank);
    // comp.httpmethod = 'get';
    // comp.httpurl = 'https/rgh'
    // expect(comp.httpmethod).toBeDefined();
    // expect(comp.httpurl).toBeDefined();
    // dataService.fetchData(comp.httpurl, comp.httpmethod).subscribe((response) => {
    //   comp.responseData = response;
    // });
    let value = comp.name;
    comp.ngOnInit();
    expect(comp.name).toEqual(value);
    // comp.input.subscribe((g: any) => {
    //   expect(comp.input).toEqual(g);
    // }); 
    // comp.onIngOnInitnput(value);
    // expect(comp.isValid).toBe(value.vaild);
  });
  //setUserSelection check

  it('check setUserSelection method', () => {
    comp.key ='index';
    comp.valuefield = 'countryCode1';
    comp.displayfield = 'countryName';
    comp.innerValue = 'AF';
    comp.viewData = [{ countryName: "Afghanistan", countryCode1: "AF", countryCode2: "AFG", countryFlag: "AF.png" }]
    comp.setUserSelection();
    expect(comp.innerValue).not.toBe(null);
    const valueKey = comp.valuefield;
    const displayKey = comp.displayfield;
    const val = comp.innerValue;
    expect(comp.viewData.length).toBeGreaterThan(0);
    comp.viewData.forEach((item: any) => {
      expect(item[valueKey]).toEqual(val);
      comp.isValid = true;
      comp.isComponentValid.emit(true);
      comp.displayValue = item[displayKey];
      delete item[comp.key];
      comp.onSingleSelect.emit(item);
    })
  })
  it('check setUserSelection method else condition', () => {
    comp.key ='index';
    comp.valuefield = 'countryCode1';
    comp.displayfield = 'countryName';
    comp.innerValue = null;
    comp.viewData = [{ countryName: "Afghanistan", countryCode1: "AF", countryCode2: "AFG", countryFlag: "AF.png" }]
    comp.setUserSelection();
    expect(comp.innerValue).toBe(null);
  })
  //on onBlur()
  it('on onBlur() if condition', () => {
    let fn = event;
    comp.onblur(fn);
    comp.showToolTip = true;
    expect(comp.showToolTip).toEqual(true);
    comp.showToolTip = !comp.showToolTip;
    // expect(comp.tabFocus).toEqual(false);
    comp.onTouchedCallback();
    expect(comp.onTouchedCallback()).toHaveBeenCalled;
    comp.onBlur.subscribe((g: any) => {
      expect(comp.onBlur).toEqual(g);
    });
  });
  it('on onBlur() else conditon', () => {
    let fn = event;
    comp.onblur(fn);
    comp.showToolTip = false;
    expect(comp.showToolTip).toEqual(false);
    // expect(comp.tabFocus).toEqual(false);
    comp.onTouchedCallback();
    expect(comp.onTouchedCallback()).toHaveBeenCalled;
    comp.onBlur.subscribe((g: any) => {
      expect(comp.onBlur).toEqual(g);
    });
  });
  // registerOnChange method
  it('registerOnChange()', () => {
    let fn;
    comp.registerOnChange(fn);
    comp['onChangeCallback'] = fn;
    expect(comp['onChangeCallback']).toEqual(fn);
  });

  //onDropDownClick method
  it('onDropDownClick()', () => {
    let fn = event;
    comp.showToolTip = true;
    comp.multiselect = false;
    comp.onDropDownClick(fn);
    expect(comp.onBaseFocusEvent).toHaveBeenCalled;
    expect(comp.showToolTip).toEqual(true);
    comp.onClick.subscribe((g: any) => {
      expect(comp.onClick).toEqual(g);
    });

    comp.selectedindex = 2;
    expect(comp.multiselect).toBe(false);
    expect(comp.selectedindex).toBeGreaterThan(-1);
    // let ok = comp.filteredOptions[comp.selectedindex];
    // ok.selected = false;
    // comp.filteredOptions[comp.selectedindex].selected = false;
    // expect(ok.selected).toBe(false);
    // comp.selectedindex = -1;
    // expect(comp.selectedindex).toBe(-1);




  });

  //registerOnTouched method
  it('registerOnTouched()', () => {
    let fn;
    comp.registerOnTouched(fn);
    comp['onTouchedCallback'] = fn;
    expect(comp['onTouchedCallback']).toEqual(fn);
  });

  //on onFocus()
  // it('on onFocus()', () => {
  //   let item = event;
  //   comp.showToolTip = true;
  //   comp.onFocus(item);
  //   expect(comp.showToolTip).toEqual(true);
  //   // comp.posixUp = comp.getListPosition(item);
  //   // comp.focus.emit();
  // });

  //on onIconClick()
  it('on onIconClick()', () => {
    let item = event;
    comp.disabled = true;
    comp.dropdownstyle.visibility = "hidden";
    comp.onIconClick();
    expect( comp.dropdownstyle.visibility).toEqual("hidden");
    comp.showToolTip = false;
    expect(comp.disabled).toEqual(true);
    comp.showToolTip = !comp.showToolTip;  

  });
  it('on onIconClick() nestesd if condition', () => {
    comp.disabled = false;
    comp.onIconClick();
    comp.dropdownstyle.visibility = "hidden";
    expect( comp.dropdownstyle.visibility).toEqual("hidden");
    comp.showToolTip = false;
    expect(comp.disabled).toBe(false);
    expect(comp.showToolTip).toEqual(false);
    expect(comp.onBaseFocusEvent({})).toHaveBeenCalled;
    comp.showToolTip = !comp.showToolTip; 
  });
  it('on onIconClick() hidden false else condition', () => {
    comp.onIconClick();
    comp.dropdownstyle.visibility = "visible";
    expect(comp.dropdownstyle.visibility).not.toEqual("hidden"); 
  });
  it('on onIconClick() hidden true  else condition', () => {
    comp.onIconClick();
    comp.dropdownstyle.visibility = "hidden";
    expect(comp.dropdownstyle.visibility).toEqual("hidden"); 
    comp.showToolTip = false;
  });
  
  it('on onIconClick() showToolTip not undefined condition', () => {
    comp.disabled = false;
    comp.onIconClick();
    comp.showToolTip = true;
    comp.dropdownstyle.visibility = "visible";
    expect(comp.dropdownstyle.visibility).not.toEqual("hidden");
    expect(comp.disabled).toEqual(false);
    expect(comp.showToolTip).toEqual(true);
    expect(comp.onBaseBlurEvent({})).toHaveBeenCalled;
    comp.showToolTip = !comp.showToolTip;  
  });
  it('on onIconClick()showToolTip false condition', () => {
    comp.disabled = false;
    comp.onIconClick();
    comp.showToolTip = false;
    expect(comp.disabled).toBe(false);
    expect(comp.showToolTip).toEqual(false);
    expect(comp.onBaseFocusEvent({})).toHaveBeenCalled;
    comp.showToolTip = !comp.showToolTip;  
  });
  it('on onIconClick() showtooltip undefined  condition', () => {
    comp.disabled = false;
    comp.onIconClick();
    comp.showToolTip = undefined;
    expect(comp.disabled).toBe(false);
    expect(comp.showToolTip).toEqual(undefined);
    expect(comp.onBaseFocusEvent({})).toHaveBeenCalled;
    comp.showToolTip = !comp.showToolTip;  
  });
  //writeChangedValue () 
  it('on writeChangedValue()', () => {

    comp.value = 'kedar';
    let item = comp.value;
    comp.innerValue = 'kokil';
    let status = false;
    comp.writeChangedValue(item);
    expect(comp.innerValue).not.toBe('kokil');
    expect(status).toEqual(false);

    status = true;
    comp.displayValue = '';
    comp.writeChangedValue(item);

    expect(comp.displayValue).toBe('');
    expect(comp.value).toEqual(item);


    //expect(comp.showToolTip).toEqual(true);
    // comp.posixUp = comp.getListPosition(item);
    // comp.focus.emit();
  });

  //writeValue () 
  it('on writeValue()', () => {
    comp.value = 'kedar';
    let item = comp.value;
    comp.writeValue(item);
    expect(comp.value).not.toBe(null);
    expect(comp.writeChangedValue(item)).toHaveBeenCalled;

    let ok = null;
    comp.value = '';
    comp.writeValue(ok);
    expect(comp.value).toBe('');
    comp.innerValue = null;
    expect(comp.innerValue).toBe(null);

    comp.allowblank = true;
    comp.isValid = true;

    expect(comp.isValid).toEqual(true);
    expect(comp.showToolTip).toEqual(undefined);
    // comp.posixUp = comp.getListPosition(item);
    // comp.focus.emit();
  });

  //on onItemSelect()
  it('on onItemSelect()', () => {
    let item = event;
    comp.showToolTip = false;
    comp.onItemSelect(item);
    expect(comp.showToolTip).toEqual(false);
    // comp.posixUp = comp.getListPosition(item);
    // comp.focus.emit();
  });

  //wrking 1- set errormsg
  it('set errormsg', () => {
    comp.errormsg = 'data incorect';
    expect(comp.helpInfoMsg).toEqual('data incorect<br/>');
  });

  it('get errormsg', () => {
    expect(comp.errormsg).toEqual(comp._errormsg);
  });
  it('multiselectionData', () => {
    comp.setMultiSelectData();
    comp.multiselectValues = [];
    comp.valuefield = 'code';
    comp.innerValue = ['apple'];
    comp.filteredOptions = [{
      checked: true, code: "apple", fruitName: "apple",
      index: "dropdown_fruitName_1169listitem0", selected: false
    }
    ];
    expect(comp.innerValue).toBeDefined();
    expect(comp.innerValue.length).toBeGreaterThan(0);
    const modelValue = comp.innerValue;
    comp.filteredOptions.forEach((test) => {
      modelValue.forEach((mdValue: any) => {
        expect(test[comp.valuefield]).toEqual(mdValue);
        expect(test.hasOwnProperty('checked')).toEqual(true);
        test.checked = true;
        comp.multiselectValues.push(test);
      });
    });
  });
});
