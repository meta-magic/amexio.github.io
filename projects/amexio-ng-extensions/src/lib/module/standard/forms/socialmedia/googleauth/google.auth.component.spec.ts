import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import { IconLoaderService, ScriptLoadService } from '../../../../../../public-api';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { GoogleAuthComponent } from './google.auth.component';

describe('Amexio Google Auth Component' , () => {
  let comp: GoogleAuthComponent;
  let fixture: ComponentFixture<GoogleAuthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [FormsModule],
      declarations: [ GoogleAuthComponent],
      providers: [IconLoaderService, ScriptLoadService],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
    fixture = TestBed.createComponent(GoogleAuthComponent);
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
    expect(comp.loginProviderObj.name).toContain('google');
    expect(comp.loginProviderObj.url).toContain('https://apis.google.com/js/platform.js');
 
  });

  it('ngOnInit : ', () => {
    comp.styleType = 'square';
    comp.clientId = '81wzvqnx8wtvmg';
    spyOn(comp, 'initialize');
    comp.initialize();
    fixture.detectChanges();

    expect(comp.label).toBe('GOOGLE');
    expect(comp.loginProviderObj.id).toBe('81wzvqnx8wtvmg');
    expect(comp.loginProviderObj.name).toContain('google');
    expect(comp.loginProviderObj.url).toContain('https://apis.google.com/js/platform.js');
    expect(comp.initialize).toHaveBeenCalled();
   
  });

});