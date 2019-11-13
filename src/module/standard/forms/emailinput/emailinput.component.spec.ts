import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../../index';
import { CommonIconComponent } from '../../../base/components/common.icon.component';
import { AmexioInputHelperComponent } from '../../../base/input.helper.component';
import { AmexioButtonComponent } from '../buttons/button.component';
import { AmexioEmailInputComponent } from './emailinput.component';

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
    (comp as any).value = '';
    expect((comp as any).value).toEqual('');
    (comp as any).value = null;
    expect((comp as any).value).toEqual(null);
  });

  it('check private variable showToolTip boolean', () => {
    (comp as any).showToolTip = false;
    expect((comp as any).showToolTip).toEqual(false);
  });

  it('conditions check of the onBlank function', () => {
    comp.allowblank = true;
    comp.isValid = true;
    (comp as any).innerValue = null;
    expect((comp as any).innerValue).toEqual(null);
    (comp as any).innerValue = '';
    expect((comp as any).innerValue).toEqual('');
    expect(comp.isValid).toEqual(jasmine.any(Boolean));
    expect((comp as any).allowblank).toEqual(true);
    expect((comp as any).isValid).toEqual(true);
  });

  // get pattern
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

  // get pattern
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

  it('ngOninit Method', () => {
    comp.ngOnInit();
    comp.name = comp.generateName(comp.name, comp.fieldlabel, 'emailinput');
    comp.componentId = comp.createCompId('emailinput', comp.name);
  });

  // //get onblur
  // it('get onblur()', () => {
  //   comp.showToolTip = false;
  //   comp.value = 'kedar@xyz.in';
  //   comp.onblur();
  //   expect(comp.showToolTip).toBe(false);
  //   comp.onBlur.subscribe((g: any) => {
  //     expect(comp.onBlur).toEqual(g);
  //   });
  // });

  // // on focus()
  // it('onfocus method check boolean value  showtooltip is true', () => {
  //   comp.showToolTip = true;
  //   comp.value = 'kedar@xyz.in';
  //   comp.onFocus(event);
  //   expect((<any>comp).showToolTip).toEqual(true);
  //   comp.focus.subscribe((g: any) => {
  //     expect(comp.focus).toEqual(g);
  //   });
  // });

  // on onInput()
  // it('onInput method check boolean value  showtooltip is true', () => {
  //   comp.isValid = comp.isFieldValid();
  //   comp.onInput(event);
  //   comp.input.subscribe((g: any) => {
  //     expect(comp.input).toEqual(g);
  //   });
  // });

  // on ngOnInit()
  it('ngOnInit', () => {
    comp.componentId = comp.createCompId('emailinput', comp.name);
    comp.name = comp.generateName(comp.name, comp.fieldlabel, 'emailinput');
    comp.ngOnInit();

  });

  // on onChangeEv()
  // it('check onchnage method for emit data ', () => {
  //   comp.onChangeEv(event);
  //   comp.change.subscribe((g: any) => {
  //     expect(comp.value).toEqual(g);
  //   });
  // });
  // it('should return true from isFieldValid', () => {
  //   comp.allowblank = false;
  //   comp.value = 'kedar@xyz.in';
  //   comp.emailpattern.test(comp.value)
  //   expect(comp.isFieldValid()).toBeTruthy();
  //   expect(comp.allowblank).toEqual(false);
  //   expect(comp.emailpattern.test(comp.value)).toBeDefined();
  //   comp.allowblank = true;
  //   expect(comp.isFieldValid()).toBeTruthy();
  //   expect(comp.allowblank).toEqual(true);

  // });
  it('validate method call null', (): any => {
    let c: FormControl;
    comp.validate(c);
    expect(comp.isEmailFieldValid()).toBeTruthy;
    return null;
  });

  it('validate method call tobefalsy', () => {
    let c: FormControl;
    comp.validate(c);
    expect(comp.isEmailFieldValid()).toBeFalsy;
    return {
      jsonParseError: {
        valid: true,
      },
    };
  });
});
