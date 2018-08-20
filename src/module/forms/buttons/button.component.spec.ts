import { ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from '../../../index';
import { AmexioFormIconComponent } from './../icon/icon.component';
import { AmexioButtonComponent } from './button.component';

describe('amexio-button' , () => {
  let comp: AmexioButtonComponent;
  let fixture: ComponentFixture<AmexioButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [FormsModule],
      declarations: [ AmexioButtonComponent, AmexioFormIconComponent, AmexioButtonComponent],
      providers: [IconLoaderService],
    });
    fixture = TestBed.createComponent(AmexioButtonComponent);
    comp = fixture.componentInstance;
  });


  // it('check disable property ',() => {

  //   expect(comp.disabled).toEqual(jasmine.any(false));
  //   //comp.setDisabled();
  // });
});