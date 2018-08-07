import { ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from '../../../index';
import { AmexioButtonComponent } from './../buttons/button.component';
import { AmexioFormIconComponent } from './../icon/icon.component';
import { AmexioFloatingGroupButtonComponent } from './floatinggroupbutton.component';

describe('amexio-floating-group-button' , () => {
  let comp: AmexioFloatingGroupButtonComponent;
  let fixture: ComponentFixture<AmexioFloatingGroupButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [FormsModule],
      declarations: [ AmexioFloatingGroupButtonComponent, AmexioFormIconComponent, AmexioButtonComponent],
      providers: [IconLoaderService],
    });
    fixture = TestBed.createComponent(AmexioFloatingGroupButtonComponent);
    comp = fixture.componentInstance;
  });



});