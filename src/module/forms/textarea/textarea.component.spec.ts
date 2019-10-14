
import { AmexioButtonComponent } from './../buttons/button.component';
import { AmexioTextAreaComponent } from './textarea.component';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index';
import { AmexioInputHelperComponent } from '../../base/input.helper.component';

describe('TextArea ', () => {
  let comp: AmexioTextAreaComponent;
  let fixture: ComponentFixture<AmexioTextAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AmexioTextAreaComponent, AmexioInputHelperComponent],
      providers: [IconLoaderService]
    });
    fixture = TestBed.createComponent(AmexioTextAreaComponent);
    comp = fixture.componentInstance;
  });

  it('get helpinfomsg', () => {
    comp.helpInfoMsg = "test";
    expect(comp.helpInfoMsg).toEqual(comp.helpInfoMsg);
  });



  it('get pattern', () => {
    expect(comp.pattern).toEqual(comp._pattern);
  });

  it('get errormsg', () => {
    expect(comp.errormsg).toEqual(comp._errormsg);
  });
  it('check for isValid', () => {
    comp.isValid = true;
    expect(comp.isValid).toEqual(true);
  });
  it('check for pattern', () => {
    comp._pattern;
    expect(comp.pattern).toBeUndefined;
  });
  it('check for _errormsg', () => {
    comp.errormsg;
    expect(comp.errormsg).toBeUndefined;
  });
  it('check for _minerrormsg', () => {
    comp.minerrormsg;
    expect(comp.minerrormsg).toBeUndefined;
  });
  it('check for _minerrormsg', () => {
    comp.maxerrormsg;
    expect('comp._maxerrormsg').toBeUndefined;
  });
  it('check for showtooltip', () => {
    // comp.showToolTip;
    expect(comp.showToolTip).toBe(false);
  });

  it('writeValue()', () => {
    let value = 'abc';
    comp.innerValue = 'xyz';
    expect(value).not.toEqual(comp.innerValue);
    comp.innerValue = value;
  })
  it('set Pattern', () => {
    comp.pattern = comp.pattern;
    comp.regEx = new RegExp(comp.pattern);
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

  //on focus()
  it('on focus()', () => {
    //comp.showToolTip=true;
    let flag = true;
    comp.onFocusEvent(event);
    event.stopPropagation();
    expect(comp.showToolTip).toEqual(flag);
  })

  // On Change()
  it('on change()', () => {
    comp.onChangeEv(event);
    event.stopPropagation();
  })

  // On Input()
  it('on input()', () => {
    comp.onInputEvent(event);
    event.stopPropagation();
  })

  it('ngOninit Method', () => {
    comp.ngOnInit();
    comp.name = comp.generateName(comp.name, comp.fieldlabel, 'textareainput');
    comp.componentId = comp.createCompId('textareainput', comp.name);
  });

});
