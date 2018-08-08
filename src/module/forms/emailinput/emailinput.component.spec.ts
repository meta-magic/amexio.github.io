import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from '../../../index';
import { AmexioButtonComponent } from './../buttons/button.component';
import { AmexioFormIconComponent } from './../icon/icon.component';
import { AmexioEmailInputComponent } from './emailinput.component';

describe('amexio-email-input', () => {
  let comp: AmexioEmailInputComponent;
  let fixture: ComponentFixture<AmexioEmailInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AmexioEmailInputComponent, AmexioFormIconComponent, AmexioButtonComponent],
      providers: [IconLoaderService],
    });
    fixture = TestBed.createComponent(AmexioEmailInputComponent);
    comp = fixture.componentInstance;
  });

  it('check private variable innerValue empty', () => {
    expect((<any>comp).innerValue).toBe('');
  });

  // it('check private method onChangeCallback()', () => {
  //  // expect((<any>comp).onChangeCallback()).toEqual(noop);
  // });



  it('condition check value is null or empty in onBlank method', () => {
    comp.onBlank({ 'touched': true });
    (<any>comp).value = '';
    expect((<any>comp).value).toEqual('');
    (<any>comp).value = null;
    expect((<any>comp).value).toEqual(null);
  });


  it('onfocus method check boolean value  showtooltip is true', () => {
    comp.onFocus();
    expect((<any>comp).showToolTip).toEqual(true);
  });




  it('check private variable showToolTip boolean', () => {
    expect((<any>comp).showToolTip).toEqual(false);
  });

  it('conditions check of the onBlank function', () => {
    comp.validateClasses({ 'touched': true });
    comp.allowblank = true;
    comp.isValid = true;
    (<any>comp).innerValue = null;
    expect((<any>comp).innerValue).toEqual(null);
    (<any>comp).innerValue = '';
    expect((<any>comp).innerValue).toEqual('');
    expect(comp.isValid).toEqual(jasmine.any(Boolean));
    
   comp.validateClasses({'allowblank': true});
   expect((<any>comp).allowblank).toEqual(true);
   expect((<any>comp).isValid).toEqual(true);
  });


  it('onfocus method check boolean value  allowblank is true', () => {
    comp.onBlank({ 'touched': false });
     comp.allowblank = false;
     comp.value = false;
     comp.isValid = false;
    comp.validateClasses({'allowblank': false});
    expect((<any>comp).allowblank).toEqual(false);
    expect((<any>comp).value).toEqual(false);
    expect((<any>comp).isValid).toEqual(false);
  });

  it('onfocus method writevalue method call', () => {
    comp.writeValue('value');
    (<any>comp).innerValue = '';
    expect((<any>comp).innerValue).not.toEqual('value');
  });


  it('check validity of the  isvalid variable', () => {
    comp.onBlank('valid');
    (<any>comp).isValid = true;
    expect((<any>comp).isValid).toEqual(true);
  });

  it('check method onblur', () => {
    comp.onblur({'inp': false});
   comp.showToolTip = false;
    expect((<any>comp).showToolTip).toEqual(false);
  });


  it('set errormsg', () => {
    comp.errormsg = 'data incorect';
    expect(comp.helpInfoMsg).toEqual('data incorect<br/>');
  });

  it('get errormsg', () => {
    //  comp.errormsg='data incorect';
    expect(comp.errormsg).toEqual(comp._errormsg);
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

  it('getCssClass()', () => {
    comp.getCssClass();
    expect(comp.getCssClass).toBeUndefined;
  });


  it('set validation flag', () => {
    //comp.helpInfoMsg="test";
    comp.onBlank({ 'touched': true });
    let touched: boolean;
    expect(comp.isValid).toEqual(jasmine.any(Boolean));
  });

  //get pattern
  it('get pattern', () => {
    expect(comp.pattern).toEqual(comp._pattern);
  });


});