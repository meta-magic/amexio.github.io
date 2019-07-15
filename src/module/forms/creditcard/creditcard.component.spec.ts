
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from '../../../index';
import { CommonIconComponent } from './../../base/components/common.icon.component';
import { AmexioButtonComponent } from './../buttons/button.component';
import { AmexioCreditcardComponent } from './creditcard.component';

describe('amexio-creditcard' , () => {
  let comp: AmexioCreditcardComponent;
  let fixture: ComponentFixture<AmexioCreditcardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [FormsModule],
      declarations: [ AmexioCreditcardComponent, AmexioButtonComponent, CommonIconComponent],
      providers: [IconLoaderService],
    });
    fixture = TestBed.createComponent(AmexioCreditcardComponent);
    comp = fixture.componentInstance;
  });

  it('creditCardNumberSpaceRemove()', () => {
      let value = '123'

    comp.creditCardNumberSpaceRemove(value);
    const match = '13245';
    let i;
    const parts = [];
    let len;
    len = match.length;
    for (i = 0; i < len; i += 4) {
    //   parts.push(match.substring(i, i + 4));
    }
 
});
 

});
