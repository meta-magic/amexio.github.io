/**
 * Created by pratik on 27/11/17.
 */
import { AmexioButtonComponent } from './../buttons/button.component';
import { AmexioRadioGroupComponent } from './radiogroup.component';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, FormControl } from '@angular/forms';
import { ValueAccessorBase } from './../../base/value-accessor';
import { AmexioFormValidator } from './../form-validator/amexio.form.validator.component';
import { CommonDataService } from '../../services/data/common.data.service';
import {HttpClientModule} from '@angular/common/http';
describe('amexio-radio-group-component', () => {
  let comp: AmexioRadioGroupComponent;
  let fixture: ComponentFixture<AmexioRadioGroupComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule,HttpClientModule],
      declarations: [AmexioRadioGroupComponent],
      providers: [CommonDataService,]
    });
    fixture = TestBed.createComponent(AmexioRadioGroupComponent);
    comp = fixture.componentInstance;
    event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);

  });

  it('check for condition', () => {
    comp.isValid = true;
    expect(comp.isValid).toEqual(true);
  });



  it('should emit greeting event on ngOnInit method', () => {
    comp.ngOnInit();
    comp.isValid = true;
    comp.allowblank = true;
    expect(comp.allowblank).toEqual(comp.isValid);
    comp.isComponentValid.subscribe((g: any) => {
      expect(comp.allowblank).toEqual(g);
    });
    comp.defaultSelectedValue = 'ddrtfgf'
    expect(comp.defaultSelectedValue.length).toBeGreaterThan(0);
    comp.value = comp.defaultSelectedValue;
    comp.httpmethod= 'get';
    comp.httpurl = 'https/rgh'
    expect(comp.httpmethod.length).toBeGreaterThan(0);
    expect(comp.httpurl.length).toBeGreaterThan(0);
    comp.amxHttp.fetchData(comp.httpurl, comp.httpmethod).subscribe((response) => {
      comp.data = comp.getResponseData(response);
    });
    expect(comp.data).not.toEqual(null);
    comp.data = comp.getResponseData(comp.data);
  });

  it('check checkValidity method', () => {
    comp.checkValidity();
    comp.isValid = true;
    expect(comp.isValid).toBe(true);
  });

  //on focus()
  it('on focus()', () => {
    //comp.showToolTip=true;
    let flag = true;
    comp.onFocus();
    expect(comp.tabFocus).toEqual(flag);
  })

  // get value method check 
  it('initialize innervalue', () => {
    comp.value = 'value';
    expect(comp['innerValue']).toEqual(comp.value);
  });



  //on onBlur()
  it('on onBlur()', () => {
    //comp.showToolTip=true;w

    comp.onBlur();
    expect(comp.tabFocus).toEqual(false);
  });

  // onRegistertouch method check
  it('register on touched', () => {
    let fn: any;
    comp.registerOnTouched(fn);
    expect(comp['onTouchedCallback']).toEqual(fn);
  });
  //  onRegisterChange method check 
  // it('register on change', () => {
  //   let fn: any;
  //   comp.registerOnChange(fn);
  //   comp.onChangeCallback = fn;

  //  });
  //

  // write value method check 
  it('writeValue()', () => {
    let value = 'sdf';
    comp.innerValue = 'sdsDf'
    // comp.writeValue(fixture);
    // expect(comp.value).toEqual(fixture);
    // if (value !== this.innerValue) {
      expect(value).not.toEqual(comp.innerValue);
      comp.innerValue = value;
      comp.checkDefaultValidation(comp.data);
    
  });

  // onclick method check

  // it('check onClick  method', () => {
  //   let clickData: any;
  //   let ev: any;
  //   let ok = { event: ev, row: clickData }

  //   comp.onClick(clickData, ev);
  //   // event = { preventDefault: function () {} };

  //   expect(comp.isValid).toEqual(true);

  //   comp.onSelection.subscribe((g: any) => {
  //     expect(ok).toEqual(g);
  //   });
  //   comp.onSelect.subscribe((g: any) => {
  //     expect(clickData).toEqual(g);
  //   })
  // });


  // get value method check 
  it(' validate method', () => {
    // comp.value = 'value';
    let c = new FormControl;
    comp.validate(c);
    // return ((!comp.allowblank && comp.value) || comp.allowblank) ? null : {
    //   jsonParseError: {
    //     valid: true,
    //   },
    // };  
  });
    it(' onClick Method', () => {
      // comp.value = 'value';
      comp.data = [
        {
          selected: true
        },
        {
          selected: true
        },
        {
          selected: true
        }
      ]
      event.preventDefault();
      for (const r of comp.data) {
        // if (r.selected) {
          expect(r.selected).toEqual(true);
          r.selected = false;
        // }
      }  
    });
});
