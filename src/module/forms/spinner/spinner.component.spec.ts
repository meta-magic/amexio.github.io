import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from '../../../index';
import { AmexioSpinnerComponent } from './spinner.component';

describe('amexio-spinner' , () => {
  let comp: AmexioSpinnerComponent;
  let fixture: ComponentFixture<AmexioSpinnerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [FormsModule],
      declarations: [ AmexioSpinnerComponent],
      providers: [IconLoaderService],
    });
    fixture = TestBed.createComponent(AmexioSpinnerComponent);
    comp = fixture.componentInstance;
  });


  // it('check loadService is not null', () => {
  //   expect(comp.iconLoaderService.iconMappings).not.toEqual('null');
  // });

  // inject(
  //   [iconLoaderService],
    
  // )
});