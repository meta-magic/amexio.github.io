/**
 * Created by pratik on 27/11/17.
 */
import { AmexioButtonComponent } from './../buttons/button.component';
import { AmexioFormIconComponent } from './../icon/icon.component';
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
      declarations: [AmexioRadioGroupComponent, AmexioFormIconComponent],
      providers: [IconLoaderService, CommonDataService, HttpClient, HttpHandler]
    });
    fixture = TestBed.createComponent(AmexioRadioGroupComponent);
    comp = fixture.componentInstance;
  });
  it('amxHttp: CommonDataService', () => {
    expect(comp.amxHttp.fetchData(comp.httpurl, comp.httpmethod)).toBe(comp.responseData);
  });
  it('check for condition', () => {
    comp.isValid = true;
    expect(comp.isValid).toEqual(true);
  });
// it('should work',() => {
//   let oldValue=comp.abcd;
//   let data = [];
//   comp.onInput(()=>{

//   })
//   comp.onInput(comp.input);
//   comp.input.emit();
// expect(comp.abcd).toBeGreaterThan(oldValue);
// })
// it('should emit greeting event', (done) => { 
//   comp.input.subscribe(input=> { expect(input).toEqual({onInput:'hello'});
//      done(); 
//   });
//});
});
 