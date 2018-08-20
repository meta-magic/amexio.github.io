import { ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from '../../services/icon/icon.service';

import { AmexioButtonComponent } from '../../forms/buttons/button.component';
import {AmexioIconLayoutComponent} from '../../layout/icon/icon.component';
import { AmexioBoxComponent } from './box.component';

describe('amexio-box' , () => {
  let comp: AmexioBoxComponent;
  let fixture: ComponentFixture<AmexioBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [FormsModule],
      declarations: [ AmexioBoxComponent, AmexioIconLayoutComponent, AmexioButtonComponent],
      providers: [IconLoaderService],
    });
    fixture = TestBed.createComponent(AmexioBoxComponent);
    comp = fixture.componentInstance;
  });

  // it('closable check true',() => {

  //   expect(comp.closable).toEqual(true);
  // });
  // it('check enableclick true', () => {
  //   // comp.enableclick=true;
  //   // comp.ngOnInit();
  //   // expect(comp.enableclick).toEqual(true);
  // });
});
