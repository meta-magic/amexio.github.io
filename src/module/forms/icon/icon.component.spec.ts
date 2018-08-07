import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from '../../../index';
import { AmexioFormIconComponent } from './icon.component';

describe('amexio-form-icon' , () => {
  let comp: AmexioFormIconComponent;
  let fixture: ComponentFixture<AmexioFormIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [FormsModule],
      declarations: [ AmexioFormIconComponent, AmexioFormIconComponent],
      providers: [IconLoaderService],
    });
    fixture = TestBed.createComponent(AmexioFormIconComponent);
    comp = fixture.componentInstance;
  });


  it('check loadService is not null', () => {
    expect(comp.iconLoaderService.iconMappings).not.toEqual('null');
  });

  // inject(
  //   [iconLoaderService],
    
  // )
});