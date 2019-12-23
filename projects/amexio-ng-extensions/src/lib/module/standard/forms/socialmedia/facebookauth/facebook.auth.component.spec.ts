import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import { IconLoaderService, ScriptLoadService } from '../../../../../../public-api';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FacebookAuthComponent } from './facebook.auth.component';

describe('Amexio Facebook Component' , () => {
  let comp: FacebookAuthComponent;
  let fixture: ComponentFixture<FacebookAuthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [FormsModule],
      declarations: [ FacebookAuthComponent],
      providers: [IconLoaderService, ScriptLoadService],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
    fixture = TestBed.createComponent(FacebookAuthComponent);
    comp = fixture.componentInstance;
  });

  it('component created : ', () => {
    expect(fixture.detectChanges).toBeDefined();
  });

  it('ngOnInit : ', () => {
    comp.styleType = 'circle';
    comp.clientId = '81wzvqnx8wtvmg';
    spyOn(comp, 'initialize');
    comp.initialize();
    fixture.detectChanges();

    expect(comp.isCircle).toBeTruthy();
    expect(comp.loginProviderObj.id).toBe('81wzvqnx8wtvmg');
    expect(comp.loginProviderObj.name).toContain('facebook');
    expect(comp.loginProviderObj.url).toContain('https://connect.facebook.net/en_US/sdk.js');
    expect(comp.initialize).toHaveBeenCalled();
  });

  it('ngOnInit : ', () => {
    comp.styleType = 'square';
    comp.clientId = '81wzvqnx8wtvmg';
    spyOn(comp, 'initialize');
    comp.initialize();
    fixture.detectChanges();

    expect(comp.isCircle).toBeFalsy();
    expect(comp.loginProviderObj.id).toBe('81wzvqnx8wtvmg');
    expect(comp.loginProviderObj.name).toContain('facebook');
    expect(comp.loginProviderObj.url).toContain('https://connect.facebook.net/en_US/sdk.js');
    expect(comp.initialize).toHaveBeenCalled();
  });

});