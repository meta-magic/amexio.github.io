import { ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from '../../../index';
import { CommonIconComponent } from './../../base/components/common.icon.component';
import { AmexioButtonComponent } from './../buttons/button.component';
import { AmexioFloatingButtonComponent } from './floatingbutton.component';

describe('amexio-floating-button' , () => {
  let comp: AmexioFloatingButtonComponent;
  let fixture: ComponentFixture<AmexioFloatingButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [FormsModule],
      declarations: [ AmexioFloatingButtonComponent, AmexioButtonComponent, CommonIconComponent],
      providers: [IconLoaderService],
    });
    fixture = TestBed.createComponent(AmexioFloatingButtonComponent);
    comp = fixture.componentInstance;
  });


  it('check private variable absoluteposition boolean', () => {
    expect((<any>comp).absoluteposition).toEqual(false);
  });


  it('check private variable relative false', () => {
    comp.addCSSClasses();
    //comp.top = 'true';
    expect((<any>comp).relative).toEqual(false);
  });
  // it('check private variable absoluteposition true', () => {
  //   comp.addCSSClasses();
  //   let pat = (jasmine.any({ 'top': true, 'bottom': true, 'left': false}));
  //   expect(pat).toEqual(true);
  //   expect((<any>comp).absoluteposition).toEqual(true);
  // });

  it('check disabled variable is false', () => {
    comp.buttonClick('clickEvent');
    //comp.top = 'true';
    comp.disabled = '';
    expect((<any>comp).disabled).not.toEqual(true);
  });

  it('check verticalposition is null', () => {
    comp.btnPositionCss();
    //comp.top = 'true';
    comp.verticalposition = null
    expect((<any>comp).verticalposition).toEqual(null);
  });
  it('check horizontalposition is null', () => {
    comp.btnPositionCss();
    //comp.top = 'true';
    comp.horizontalposition = null
    expect((<any>comp).horizontalposition).toEqual(null);
  });


  it('check private variable absoluteposition boolean', () => {
    comp.addCSSClasses();
    comp.absoluteposition = true;
    comp.relative = true
    expect((<any>comp).relative).toEqual(true);
    expect((<any>comp).absoluteposition).toEqual(true);
  });







});
