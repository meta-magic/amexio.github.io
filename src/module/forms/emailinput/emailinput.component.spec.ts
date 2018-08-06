import { ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from '../../../index';
import { AmexioButtonComponent } from './../buttons/button.component';
import { AmexioFormIconComponent } from './../icon/icon.component';
import { AmexioEmailInputComponent } from './emailinput.component';

describe('amexio-email-input' , () => {
  let comp: AmexioEmailInputComponent;
  let fixture: ComponentFixture<AmexioEmailInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [FormsModule],
      declarations: [ AmexioEmailInputComponent, AmexioFormIconComponent, AmexioButtonComponent],
      providers: [IconLoaderService],
    });
    fixture = TestBed.createComponent(AmexioEmailInputComponent);
    comp = fixture.componentInstance;
  });



  // it('check enableclick true', () => {
  //   comp.multi = true;
  //   comp.ngOnInit();
  //   expect(comp.multi).toEqual(true);
  // });
  it('check private variable innerValue empty', () => {
    expect((<any>comp).innerValue).toBe('');
  });

  it('check private variable showToolTip boolean', () => {
    expect(comp.showToolTip).toEqual(jasmine.any(Boolean));
  });

});