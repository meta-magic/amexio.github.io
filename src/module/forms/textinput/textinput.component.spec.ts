
// describe('TextInput ', () => {
//   it('true is true', () => expect(true).toBe(true));
// });
/**
 * Created by pratik on 1/12/17.
 */
import { AmexioTextInputComponent } from './textinput.component';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index'
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AmexioInputHelperComponent } from '../../base/input.helper.component';

describe('NUMBER INPUT', () => {

  let comp: AmexioTextInputComponent;
  let fixture: ComponentFixture<AmexioTextInputComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AmexioTextInputComponent, AmexioInputHelperComponent],
      providers: [IconLoaderService]
    });
    fixture = TestBed.createComponent(AmexioTextInputComponent);
    comp = fixture.componentInstance;

    it('true is true', () => expect(true).toBe(true));
  });


  it('initialize innervalue', () => {
    comp.value = 'sagfaf';
    expect(comp['innerValue']).toEqual(comp.value);
  });




  //get pattern
  it('get pattern', () => {
    expect(comp.pattern).toEqual(comp._pattern);
  })

  //set pattern
  // it('set pattern', () => {

  //   let obj = new RegExp(comp.pattern);
  //   expect(comp.value).not.toEqual(null);
  //   expect(comp.regEx).toEqual(obj);
  //  })

  it('register on change', () => {
    let fn: any;
    comp.registerOnChange(fn);
    expect(comp['onChangeCallback']).toEqual(fn);
  })


  it('register on touched', () => {
    let fn: any;
    comp.registerOnTouched(fn);
    expect(comp['onTouchedCallback']).toEqual(fn);
  })
  it('writeValue()', () => {
    comp.writeValue(fixture);
    expect(comp.value).toEqual(fixture);
  });


  it('getCssClass()', () => {
  });


  it('check for isValid', () => {
    comp.isValid = true;
    expect(comp.isValid).toEqual(true);
  });
  it('noInnerValue()', () => {
  });
  it('otherValidation()', () => {
  });

  // it('set validation flag', () => {
  //   //comp.helpInfoMsg="test";
  //   let flag: boolean;
  //   comp.setValidationFlag(flag);
  //   expect(comp.isValid).toEqual(flag);
  // })



  //set maxerrormsg


  //set minerrormsg
  // it('set minerrormsg', () => {
  //   let testvalue = comp._minerrormsg;
  //   comp.minerrormsg = testvalue;
  //   comp.helpInfoMsg="testMin value: <br/>";
  //   let str = comp.helpInfoMsg + 'Min value: ' + comp.value+ '<br/>';
  //   expect(comp.helpInfoMsg).toBe(str);
  // });


});
