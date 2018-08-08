import { ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from '../../../index';

import { AmexioButtonComponent } from '../../forms/buttons/button.component';
import { AmexioFormIconComponent } from '../../forms/icon/icon.component';
import { AmexioBoxComponent } from './box.component';

describe('amexio-label' , () => {
  let comp: AmexioBoxComponent;
  let fixture: ComponentFixture<AmexioBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [FormsModule],
      declarations: [ AmexioBoxComponent, AmexioFormIconComponent, AmexioButtonComponent],
      providers: [IconLoaderService],
    });
    fixture = TestBed.createComponent(AmexioBoxComponent);
    comp = fixture.componentInstance;
  });
});
