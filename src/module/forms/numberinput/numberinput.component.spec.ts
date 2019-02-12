/**
 * Created by pratik on 1/12/17.
 */
import { AmexioNumberInputComponent } from './numberinput.component';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index'
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AmexioInputHelperComponent } from '../../base/input.helper.component';
describe('NUMBER INPUT', () => {

  let comp: AmexioNumberInputComponent;
  let fixture: ComponentFixture<AmexioNumberInputComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AmexioNumberInputComponent, AmexioInputHelperComponent],
      providers: [IconLoaderService]
    });
    fixture = TestBed.createComponent(AmexioNumberInputComponent);
    comp = fixture.componentInstance;

    it('true is true', () => expect(true).toBe(true));
  });


  it('initialize innervalue', () => {
    comp.value = 'sagfaf';
    expect(comp['innerValue']).toEqual(comp.value);
  });


  // it('get innervalue', () => {
  //   comp.value='sagfaf';

  // //this.fixture.detectChanges();
  //        expect(comp.value()).toEqual(comp['innerValue']);
  //     });

  //wrking 1- set errormsg




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


  //on focus()
  it('on focus()', () => {
    //comp.showToolTip=true;
    let flag = true;
    comp.onFocus();
    expect(comp.showToolTip).toEqual(flag);
  })

  //on blur()


  // it('writevalue', () => {
  //   comp.writeValue(fixture);

  //   expect(comp.value).not.toEqual(comp['innerValue']);

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
