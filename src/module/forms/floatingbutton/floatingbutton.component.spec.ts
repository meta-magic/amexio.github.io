import { ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from '../../../index';
import { AmexioButtonComponent } from './../buttons/button.component';
import { AmexioFormIconComponent } from './../icon/icon.component';
import { AmexioFloatingButtonComponent } from './floatingbutton.component';

describe('amexio-floating-button' , () => {
  let comp: AmexioFloatingButtonComponent;
  let fixture: ComponentFixture<AmexioFloatingButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [FormsModule],
      declarations: [ AmexioFloatingButtonComponent, AmexioFormIconComponent, AmexioButtonComponent],
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
  

});