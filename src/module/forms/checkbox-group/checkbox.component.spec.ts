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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule],
      declarations: [CheckboxComponent],
      providers: [IconLoaderService, CommonDataService,AmexioCheckBoxGroupComponent],
    });
    fixture = TestBed.createComponent(CheckboxComponent);
    comp = fixture.componentInstance;
    event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);

    it('true is true', () => expect(true).toBe(true));
  });

  //check variables 
  it('check variables ', () => {
    expect(comp.tabFocus).toBe(false);
  });


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
});
