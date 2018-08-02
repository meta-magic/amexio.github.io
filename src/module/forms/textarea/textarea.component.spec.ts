
import { AmexioButtonComponent } from './../buttons/button.component';
import { AmexioFormIconComponent } from './../icon/icon.component';
import { AmexioTextAreaComponent } from './textarea.component';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import { IconLoaderService } from '../../../index';

describe('TextArea ', () => {
  let comp: AmexioTextAreaComponent;
  let fixture: ComponentFixture<AmexioTextAreaComponent>;

  beforeEach(()=>{
    TestBed.configureTestingModule({
      imports:[FormsModule],
      declarations:[AmexioTextAreaComponent,AmexioFormIconComponent],
      providers:[IconLoaderService]
    });
    fixture = TestBed.createComponent(AmexioTextAreaComponent);
    comp = fixture.componentInstance;
  });
  it('true is true', () => expect(true).toBe(true));
  it('Condition Check',()=>{
    comp.value;
    fixture.detectChanges();
    expect('').toBe(comp.value);
  } 
);
  
});
