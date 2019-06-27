/**
 * Created by kedar on 26/6/19.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index';
import { AmexioDropDownComponent } from './dropdown.component';
import { CommonDataService } from '../../services/data/common.data.service';
import { HttpClientModule } from '@angular/common/http';
import { DisplayFieldComponent } from '../../base/display-field/display-field.component';
import { CommonIconComponent } from '../../base/components/common.icon.component';


describe('amexio-dropdown', () => {
  let comp: AmexioDropDownComponent;
  let fixture: ComponentFixture<AmexioDropDownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule],
      declarations: [AmexioDropDownComponent, DisplayFieldComponent,CommonIconComponent],
      providers: [IconLoaderService, CommonDataService],
    });
    fixture = TestBed.createComponent(AmexioDropDownComponent);
    comp = fixture.componentInstance;
    event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);

    it('true is true', () => expect(true).toBe(true));
  });

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


  it('should call get function and return true', () => {
    // comp.data();
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

 
// });


  //setUserSelection check

  it('check setUserSelection method',() =>{

    comp.setUserSelection();
    comp.innerValue = 'kedar';
    expect(comp.innerValue).not.toBe(null);
  
    const valueKey = comp.valuefield;
    expect(valueKey).toBe(undefined);
    const val = comp.innerValue;

    expect(val).toEqual(comp.innerValue);
  })


   //on onBlur()
   it('on onBlur()', () => {

    let fn = event;
    comp.onblur(fn);
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
    comp.showToolTip = false;
    comp.disabled = true;

    comp.onIconClick();
    expect(comp.disabled).toEqual(true);
    const showflag = comp.showToolTip;
    expect(comp.showToolTip).toBe(false);
    expect(comp.onBaseFocusEvent({})).toHaveBeenCalled;

    
    comp.disabled = false;
    expect(comp.disabled).toBe(false);
    expect(comp.onBaseFocusEvent({})).toHaveBeenCalled;
    expect(comp.showToolTip).not.toBe(true)
  });


   //writeChangedValue () 
   it('on writeChangedValue()', () => {
    
    comp.value  = 'kedar';
    let item = comp.value;
    comp.innerValue ='kokil';
    let status = false;
    comp.writeChangedValue(item);
    expect(comp.innerValue).not.toBe('kokil');
    expect(status).toEqual(false);
   
     status =  true;
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
    comp.value  = 'kedar';
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
});
