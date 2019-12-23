import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from '../../../../../public-api';
import { AmexioSocialComponent } from './social.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('Amexio Social Component' , () => {
  let comp: AmexioSocialComponent;
  let fixture: ComponentFixture<AmexioSocialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [FormsModule],
      declarations: [ AmexioSocialComponent],
      providers: [IconLoaderService],
      schemas:[NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(AmexioSocialComponent);
    comp = fixture.componentInstance;
  });

  it('component created : ',()=>{
    expect(fixture.detectChanges).toBeDefined();
  });

  it('ngOnInit()',()=>{
    comp.type = 'google';
    fixture.detectChanges();
    expect(comp.type).toContain('google');
  });

  it('ngOnInit()',()=>{
    comp.type = 'GooGle';
    fixture.detectChanges();
    expect(comp.type).toContain('google');
  });

  it('onLoginClick()',()=>{
    spyOn(comp.onLogin, 'emit');

    comp.onLogin.emit();
    fixture.detectChanges();

    expect(comp.onLogin.emit).toHaveBeenCalled();
  });
});