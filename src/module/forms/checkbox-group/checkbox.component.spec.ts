/**
 * Created by kedar 26/6/2019.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index';
import { CheckboxComponent } from './checkbox.component';
import { CommonDataService } from '../../services/data/common.data.service';
import { HttpClientModule } from '@angular/common/http';
import { AmexioCheckBoxGroupComponent } from './checkbox.group.component';


describe('checkbox', () => {
  let comp: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;
  let comp1: AmexioCheckBoxGroupComponent;
  let fixture1: ComponentFixture<AmexioCheckBoxGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule],
      declarations: [CheckboxComponent,AmexioCheckBoxGroupComponent],
      providers: [IconLoaderService, CommonDataService,AmexioCheckBoxGroupComponent],
    });


    fixture1 = TestBed.createComponent(AmexioCheckBoxGroupComponent);
    comp1 = fixture1.componentInstance;
    comp1.data = [];

    fixture = TestBed.createComponent(CheckboxComponent);
    comp = fixture.componentInstance; 
    comp['checkboxGroup'] = comp1;
    fixture.detectChanges();

    event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);
    comp.checked = true;

    it('true is true', () => expect(true).toBe(true));
  });

  //check variables 
  it('check variables ', () => {
    expect(comp.tabFocus).toBe(false);
  });

// check private method
  it('check private methods', () => {
    let fn: any;
    comp['onTouchedCallback']();
    comp['onChangeCallback'](fn);
  });


  //on onBlur()
  it('on onBlur()', () => {
    comp.onBlur();
    expect(comp.tabFocus).toEqual(false);
  });

  //on onFocus()
  it('on onFocus()', () => {
    comp.onFocus();
    expect(comp.tabFocus).toEqual(true);
  });
  it('ngOnInit', () =>{
    comp.ngOnInit();
    comp.componentId =comp.createCompId('checkbox',comp.name);
  });

  it('ischecked method is check',() => {
    let name = comp.isChecked();
    expect(name).toBe(true);
  });

  it('toggleCheck check method',() =>{

    comp.checked = true;
    comp.value = {};
    comp.toggleCheck(); 
    expect(comp.checked).toEqual(false);
    comp.toggleCheck(); 
    expect(comp.value.checked).toEqual(true);

  })
});
