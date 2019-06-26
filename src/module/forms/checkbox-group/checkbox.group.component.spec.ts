/**
 * Created by kedar 26/6/2019.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index';
import { AmexioCheckBoxGroupComponent } from './checkbox.group.component';
import { AmexioCheckBoxComponent } from '../checkbox/checkbox.component';
import { CheckboxComponent } from './checkbox.component';
import { CommonDataService } from '../../services/data/common.data.service';
import { HttpClientModule } from '@angular/common/http';


describe('amexio-checkbox-group', () => {
  let comp: AmexioCheckBoxGroupComponent;
  let fixture: ComponentFixture<AmexioCheckBoxGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule],
      declarations: [AmexioCheckBoxGroupComponent, CheckboxComponent],
      providers: [IconLoaderService, CommonDataService],
    });
    fixture = TestBed.createComponent(AmexioCheckBoxGroupComponent);
    comp = fixture.componentInstance;
    event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);

    it('true is true', () => expect(true).toBe(true));
  });

  //check variables 
  it('check variables ', () => {

    let i = [];
    expect(comp.selectedCheckBox).toBeUndefined();
  });

  // it('check emitData() method', () => {
  //   comp.emitData();
  //   expect(comp.selectedCheckBox).toBe([]);


  //   comp.onSelection.subscribe((g: any) => {
  //     expect(comp.onSelection).toEqual(g);
  // });

  // });
  // it('checking togglePanel method', () => {


  // });

});
