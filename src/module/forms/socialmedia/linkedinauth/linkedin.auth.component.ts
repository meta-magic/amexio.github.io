
/*
 * Copyright [2019] [Metamagic]
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Created by sagar on 23/1/19.
 * INFO: LINKEDIN AUTH COMPONENT IS USED FOR THIRD PARTY LOGIN USING LINKEDIN OAUTH API
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ScriptLoadService } from '../../../services/script/script.load.service';
import { LinkedInResponse } from '../models/linkedin.response.model';
import { LoginProvider } from './../login.provider';
import { SocialBaseComponent } from './../social.base.component';
import { SOCIAL_CONSTANT } from './../social.constant';
import { SocialUserInfo } from './../social.user.info.model';
declare let IN: any;
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'amexio-linkedin-auth-provider',
  templateUrl: './linkedin.auth.component.html',
})
export class LinkedInAuthComponent extends SocialBaseComponent implements OnInit {

  public loginProviderObj: LoginProvider = new LoginProvider();
  private auth2: any;

  isCircle: boolean;

  @Output() onLogin = new EventEmitter<any>();

  constructor(private scriptLoadService: ScriptLoadService) {
    super();
  }

  ngOnInit() {
    if (this.styleType && this.styleType.toLowerCase() === 'circle') {
      this.isCircle = true;
    }
    if (!this.label && this.styleType && this.styleType.toLowerCase() !== 'circle') {
      this.label = 'Linkedin';
    }
    this.loginProviderObj.id = this.clientId;
    this.loginProviderObj.name = SOCIAL_CONSTANT.LINKEDIN;
    this.loginProviderObj.url = SOCIAL_CONSTANT.LINKEDIN_API_URL;
    this.initialize();
  }

  // ON CLICK EVENT CALL SIGNIN FUNCTION
  onButtonClick() {
    if (IN && IN.User.authorize()) {
      console.log('User already loggedin...');
      return;
    }else {
      this.signIn();
    }
  }
  // THIS FUNCTION IS USED FOR INITALIZE THE AUTH2 OBJECT AND RETURN USER INFO
  initialize(): Promise<SocialUserInfo> {
    return new Promise((resolve, reject) => {
      this.scriptLoadService.loadScript(this.loginProviderObj, () => {
          IN.init({
            api_key: this.clientId,
            authorize: true,
          });
          IN.Event.on(IN, 'auth', () => {
            if (IN.User.isAuthorized()) {
              IN.API.Raw(
                '/people/~:(id,first-name,last-name,email-address,picture-url)',
              ).result( (res: LinkedInResponse) => {
                resolve(this.getLoginInUserInfo(res));
              });
            }
          });

        });
    });
  }

  // THIS FUNCTION IS USED FOR LINKEDIN
  onLinkedInLoad(): void {
    IN.Event.on(IN, 'systemReady', () => {
      IN.User.refresh();
    });
  }

// THIS FUNCTION IS GET INFO OF LOGIINED USER
 private getLoginInUserInfo(response: LinkedInResponse): SocialUserInfo {
    const user: SocialUserInfo = new SocialUserInfo();
    user.id = response.emailAddress;
    user.name = response.firstName + ' ' + response.lastName;
    user.email = response.emailAddress;
    user.image = response.pictureUrl;
    user.token = IN.ENV.auth.oauth_token;
    this.onLogin.emit(user);
    return user;
  }

  private signIn(): Promise<SocialUserInfo> {
    return new Promise((resolve, reject) => {
      // tslint:disable-next-line:no-identical-functions
      IN.Event.on(IN, 'auth', () => {
        if (IN.User.isAuthorized()) {
          IN.API.Raw(
            '/people/~:(id,first-name,last-name,email-address,picture-url)',
          ).result( (res: LinkedInResponse) => {
            resolve(this.getLoginInUserInfo(res));
          });
        }
      });
    });
  }
}
