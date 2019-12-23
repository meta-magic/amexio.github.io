import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import { IconLoaderService, ScriptLoadService } from '../../../../../../public-api';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LinkedInAuthComponent as GithubAuthComponent } from '../linkedinauth/linkedin.auth.component';
import { By } from '@angular/platform-browser';
import { SocialUserInfo } from '../../../../models/social.user.info.model';

describe('Amexio Linkedin Component' , () => {
  let comp: GithubAuthComponent;
  let fixture: ComponentFixture<GithubAuthComponent>;
  let element;
  let body;
  let bodyHTML;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [FormsModule],
      declarations: [ GithubAuthComponent],
      providers: [IconLoaderService, ScriptLoadService],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
    fixture = TestBed.createComponent(GithubAuthComponent);
    comp = fixture.componentInstance;

    element = fixture.debugElement;
  
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


  it('loginToGithub: ',()=>{
    const user: SocialUserInfo = new SocialUserInfo();
    spyOn(comp.onLogin, 'emit').withArgs(user);

    comp.onLogin.emit(user);
    fixture.detectChanges();
    expect(user).toBeDefined();
    expect(comp.onLogin.emit).toHaveBeenCalledWith(user);
  });
});