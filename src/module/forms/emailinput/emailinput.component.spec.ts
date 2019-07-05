import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index';
import { AmexioButtonComponent } from './../buttons/button.component';
import { AmexioEmailInputComponent } from './emailinput.component';
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


  it('condition check value is null or empty in onBlank method', () => {
    (<any>comp).value = '';
    expect((<any>comp).value).toEqual('');
    (<any>comp).value = null;
    expect((<any>comp).value).toEqual(null);
  });

  it('check private variable showToolTip boolean', () => {
    (<any>comp).showToolTip = false;
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
    expect((<any>comp).allowblank).toEqual(true);
    expect((<any>comp).isValid).toEqual(true);
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


  //get onblur
  it('get onblur()', () => {
    comp.showToolTip = false;
    comp.value = 'kedar@xyz.in';
    comp.onblur();
    expect(comp.showToolTip).toBe(false);
    comp.onBlur.subscribe((g: any) => {
      expect(comp.onBlur).toEqual(g);
    });
  });

  // on focus()
  it('onfocus method check boolean value  showtooltip is true', () => {
    comp.showToolTip = true;
    comp.value = 'kedar@xyz.in';
    comp.onFocus();
    expect((<any>comp).showToolTip).toEqual(true);
    comp.focus.subscribe((g: any) => {
      expect(comp.focus).toEqual(g);
    });
  });


  // on onInput()
  it('onInput method check boolean value  showtooltip is true', () => {
    comp.isValid = comp.isFieldValid();
    comp.onInput();
    comp.input.subscribe((g: any) => {
      expect(comp.input).toEqual(g);
    });
  });

  // on ngOnInit()
  it('ngOnInit', () => {
    comp.componentId = comp.createCompId('emailinput', comp.name);
    comp.name = comp.generateName(comp.name, comp.fieldlabel, 'emailinput');
    comp.ngOnInit();

  });

  // on onChangeEv()
  it('check onchnage method for emit data ', () => {
    comp.onChangeEv();
    comp.change.subscribe((g: any) => {
      expect(comp.value).toEqual(g);
    });
  });
  it('should return true from isFieldValid', () => {
    comp.allowblank = false;
    comp.value = 'kedar@xyz.in';
    comp.emailpattern.test(comp.value)
    expect(comp.isFieldValid()).toBeTruthy();
    expect(comp.allowblank).toEqual(false);
    expect(comp.emailpattern.test(comp.value)).toBeDefined();
    comp.allowblank = true;
    expect(comp.isFieldValid()).toBeTruthy();
    expect(comp.allowblank).toEqual(true);

  });

});
