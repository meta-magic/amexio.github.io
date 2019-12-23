import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import { IconLoaderService, ScriptLoadService } from '../../../../../../public-api';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LinkedInAuthComponent as GithubAuthComponent } from '../linkedinauth/linkedin.auth.component';

describe('Amexio Linkedin Component' , () => {
  let comp: GithubAuthComponent;
  let fixture: ComponentFixture<GithubAuthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [FormsModule],
      declarations: [ GithubAuthComponent],
      providers: [IconLoaderService, ScriptLoadService],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
    fixture = TestBed.createComponent(GithubAuthComponent);
    comp = fixture.componentInstance;
  });

  it('component created : ', () => {
    expect(fixture.detectChanges).toBeDefined();
  });


  it('ngOnInit : ', () => {
    comp.styleType = 'circle';

    fixture.detectChanges();

    expect(comp.isCircle).toBeTruthy();
  });

  it('ngOnInit : ', () => {
    comp.styleType = 'square';

    fixture.detectChanges();

    expect(comp.isCircle).toBeFalsy();
  });

});