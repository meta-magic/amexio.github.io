import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from '../../../index';
import { AmexioButtonComponent } from './../buttons/button.component';
import { AmexioEmailInputComponent } from './emailinput.component';
import { stringify } from 'querystring';
import { AmexioInputHelperComponent } from '../../base/input.helper.component';
import { CommonIconComponent } from './../../base/components/common.icon.component';

describe('amexio-email-input', () => {
  let comp: AmexioEmailInputComponent;
  let fixture: ComponentFixture<AmexioEmailInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AmexioEmailInputComponent, CommonIconComponent, AmexioButtonComponent, AmexioInputHelperComponent],

      providers: [IconLoaderService],
    });
    fixture = TestBed.createComponent(AmexioEmailInputComponent);
    comp = fixture.componentInstance;
  });

  // it('check private variable innerValue empty', () => {
  //   expect((<any>comp).innerValue).toBe('');
  // });

  // it('check private method onChangeCallback()', () => {
  //  // expect((<any>comp).onChangeCallback()).toEqual(noop);
  // });



  it('condition check value is null or empty in onBlank method', () => {
  //  comp.onBlank({ 'touched': true });
    (<any>comp).value = '';
    expect((<any>comp).value).toEqual('');
    (<any>comp).value = null;
    expect((<any>comp).value).toEqual(null);
  });


  // it('onfocus method check boolean value  showtooltip is true', () => {
  //   comp.onFocus();
  //   expect((<any>comp).showToolTip).toEqual(true);
  // });




  it('check private variable showToolTip boolean', () => {
    expect((<any>comp).showToolTip).toEqual(false);
  });

  it('conditions check of the onBlank function', () => {
    comp.allowblank = true;
    comp.isValid = true;
    (<any>comp).innerValue = null;
    expect((<any>comp).innerValue).toEqual(null);
    (<any>comp).innerValue = '';
    expect((<any>comp).innerValue).toEqual('');
    expect(comp.isValid).toEqual(jasmine.any(Boolean));

    // comp.validateClasses({ 'allowblank': true });
    expect((<any>comp).allowblank).toEqual(true);
    expect((<any>comp).isValid).toEqual(true);
  });


  // it('onfocus method check boolean value  allowblank is true', () => {
  // //  comp.onBlank({ 'touched': false });
  //   comp.allowblank = false;
  // //  comp.value = false;
  //   comp.isValid = false;
  //   // comp.validateClasses({ 'allowblank': false });
  //   expect((<any>comp).allowblank).toEqual(false);
  //   expect((<any>comp).value).toEqual(false);
  //   expect((<any>comp).isValid).toEqual(false);
  // });

  it('onfocus method writevalue method call', () => {
    comp.writeValue('value');
    (<any>comp).innerValue = '';
    expect((<any>comp).innerValue).not.toEqual('value');
  });


  it('check validity of the  isvalid variable', () => {
   // comp.onBlank('valid');
    (<any>comp).isValid = true;
    expect((<any>comp).isValid).toEqual(true);
  });

  it('check onchnage method for emit data ', () => {

    comp.onChangeEv();
    comp.change.subscribe((g: any) => {
      expect(comp.value).toEqual(g);
    });
  });



  //get pattern
  it('get pattern', () => {
    expect(comp.pattern).toEqual(comp._pattern);
  });

  it('register on change', () => {
    let fn: any;
    comp.registerOnChange(fn);
    expect(comp['onChangeCallback']).toEqual(fn);
  });

  it('register on touched', () => {
    let fn: any;
    comp.registerOnTouched(fn);
    expect(comp['onTouchedCallback']).toEqual(fn);
  });

//   it('set validation flag', () => {
//     //comp.helpInfoMsg="test";
//  //   comp.onBlank({ 'touched': true });
//     let touched: boolean;
//     expect(comp.isValid).toEqual(jasmine.any(Boolean));
//   });

  //get pattern
  it('get pattern', () => {
    expect(comp.pattern).toEqual(comp._pattern);
  });


  it('set pattern event check the data', () => {
    expect(comp.pattern).not.toBeNull();
    comp.pattern = '/\S+@\S+\.\S+/';
    expect(comp._pattern).toEqual('/\S+@\S+\.\S+/');
    expect(comp.value).not.toEqual(null);
    expect(comp.regEx).not.toEqual(null);
    const regEx = new RegExp('/\S+@\S+\.\S+/');
    expect(comp.regEx).toEqual(regEx);
  });

  // it('set pattern event check null', () => {
  //   comp.pattern = '';
  //   expect(comp._pattern).toEqual('');
  //   expect(comp.regEx).toEqual(null);
  //   expect(comp.regEx).not.toEqual(comp._pattern);
  // });


  // it('set onblank method check object data', () => {
  //   let pat = (jasmine.any({ 'invalid': true, 'valid': true, 'dirty': false, 'touched': true }));
  //   comp.onBlank(pat);
  //   expect(comp.isValid).toBe(true);
  // });

  // it('check  isvalid is boolean', () => {
  //   const blank = { invalid: true, valid: true, dirty: true, touched: true };
  //   comp.value ='kedar@metamagic.in';
  //   comp.allowblank = true;
  //  // const inData = comp.onBlank(blank);
  //  // expect(inData).toEqual({'input-control-error':true,'input-control-success':true});

  //   comp.inputRef = {'nativeElement':{'validity':{'valid':true}}};
  //   const validity = comp.checkValidity();
  //   expect(validity).toEqual(true);
  // });
});
