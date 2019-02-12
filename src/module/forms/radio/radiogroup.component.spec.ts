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
    comp.isValid =  true;
    expect(comp.isValid).toBe(true);
  });
  // it('should emit greeting event onClick', () => {
  //   let row: any;
  //   comp.onClick(row);
  //   comp.onSelection.subscribe((g: any) => {
  //     expect(row).toEqual(g);
  //   });
  // });


});
