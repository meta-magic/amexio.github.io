import { ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from '../../services/icon/icon.service';

import { AmexioButtonComponent } from '../../forms/buttons/button.component';
import { CommonIconComponent } from './../../base/components/common.icon.component';
import { AmexioBoxComponent } from './box.component';

describe('amexio-box' , () => {
  let comp: AmexioBoxComponent;
  let fixture: ComponentFixture<AmexioBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [FormsModule],
      declarations: [ AmexioBoxComponent, AmexioButtonComponent, CommonIconComponent],
      providers: [IconLoaderService],
    });
    fixture = TestBed.createComponent(AmexioBoxComponent);
    comp = fixture.componentInstance;
  });

  it('close check true',() => {

    comp.close = true;
    expect(comp.close).toEqual(true);
  });

  it('closable check closebox method check',() => {
    let dt: any;
    comp.closeBox(dt);
    comp.close = false;
    expect(comp.close).toEqual(false);
    comp.closable = false;
    expect(comp.closable).toEqual(false);
  });
  it('check ngOnInit method', () => {
    comp.ngOnInit();
    comp.borderColor = 'box-default';
    comp.bgColor = null;
    expect(comp.bgColor).toBe(null);
    expect(comp.borderColor).toEqual('box-default');
    comp.bgColor = comp.borderColor;
    expect(comp.bgColor).toEqual(comp.borderColor);

  });
});
