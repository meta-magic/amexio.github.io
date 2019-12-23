import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import { IconLoaderService, ScriptLoadService } from '../../../../../../public-api';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LinkedInAuthComponent } from '../linkedinauth/linkedin.auth.component';
import { SocialBaseComponent } from '../social.base.component';

describe('Amexio Linkedin Component' , () => {
  let comp: LinkedInAuthComponent;
  let fixture: ComponentFixture<LinkedInAuthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [FormsModule],
      declarations: [ LinkedInAuthComponent],
      providers: [IconLoaderService, ScriptLoadService],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
    fixture = TestBed.createComponent(LinkedInAuthComponent);
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
    expect(comp.loginProviderObj.name).toContain('linkedin');
    expect(comp.loginProviderObj.url).toContain('https://platform.linkedin.com/in.js');
    expect(comp.initialize).toHaveBeenCalled();
  });

  it('ngOnInit : ', () => {
    comp.styleType = 'square';
    comp.clientId = '81wzvqnx8wtvmg';
    spyOn(comp, 'initialize');
    comp.initialize();
    fixture.detectChanges();

    expect(comp.label).toContain('Linkedin');
    expect(comp.loginProviderObj.id).toBe('81wzvqnx8wtvmg');
    expect(comp.loginProviderObj.name).toContain('linkedin');
    expect(comp.loginProviderObj.url).toContain('https://platform.linkedin.com/in.js');
    expect(comp.initialize).toHaveBeenCalled();
  });

});