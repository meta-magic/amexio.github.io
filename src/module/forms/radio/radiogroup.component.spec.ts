/**
 * Created by pratik on 27/11/17.
 */
import { AmexioButtonComponent } from './../buttons/button.component';
import { AmexioRadioGroupComponent } from './radiogroup.component';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService, CommonDataService } from '../../../index';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { PARAMETERS } from '@angular/core/src/util/decorators';
describe('amexio-radio-group-component', () => {
  let comp: AmexioRadioGroupComponent;
  let fixture: ComponentFixture<AmexioRadioGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AmexioRadioGroupComponent],
      providers: [IconLoaderService, CommonDataService, HttpClient, HttpHandler]
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
  it('register on change', () => {
    let fn: any;
    comp.registerOnChange(fn);
    expect(comp['onChangeCallback']).toEqual(fn);
  });
  //

  // write value method check 
  it('writeValue()', () => {
    comp.writeValue(fixture);
    expect(comp.value).toEqual(fixture);
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
});
