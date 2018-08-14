/**
 * Created by kedar on 14/08/18.
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from '../../../index';
import { AmexioToggleComponent } from './toggle.component';

describe('amexio-toggle', () => {
  let comp: AmexioToggleComponent;
  let fixture: ComponentFixture<AmexioToggleComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AmexioToggleComponent],
      providers: [IconLoaderService],
    });
    fixture = TestBed.createComponent(AmexioToggleComponent);
    comp = fixture.componentInstance;
  });
  it('check innervalue variable', () => {
    (<any>comp).innerValue = '';
    expect((<any>comp).innerValue).toEqual('');
  });

  it('check routeBackToApp method', () => {
    comp.shape = 'round';
    comp.ngOnInit();
    expect(comp.shape).toEqual('round');


    comp.ngOnInit();
    comp.isValid = true;
    comp.required = false;
    expect(comp.isValid).not.toBe(comp.required);

    comp.isComponentValid.subscribe((g: any) => {
      expect(false).toEqual(g);
    });
  });


  it('check onToggle method', () => {

    comp.onToggle();
    comp.isValid = true;
    comp.value = true;
    expect(comp.isValid).toBe(comp.value);
    comp.onToggle();

    comp.isComponentValid.subscribe((g: any) => {
      expect(comp.value).toEqual(g);
    });
    comp.onToggle();

    comp.onChange.subscribe((g: any) => {
      expect(comp.value).toEqual(g);
    });
  });

  it('check checkValidity method', () => {

    comp.checkValidity();
    comp.isValid =  true;
    expect(comp.isValid).toBe(true);
  });

  it('check writeValue method', () => {

    let value: any;
    value = 23;
    (<any>comp).innerValue = '';
    comp.writeValue(value);
    expect(value).toBe( (<any>comp).innerValue);
    value = 20;
    (<any>comp).innerValue = '';
    comp.writeValue(value);
    expect(value).toBe( (<any>comp).innerValue);
    expect(comp.isValid).toEqual(value);

   
  });


});


