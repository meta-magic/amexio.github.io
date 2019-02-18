import { SocialBaseComponent } from './../social.base.component';
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
 * INFO: FACEBOOK AUTH COMPONENT IS USED FOR THIRD PARTY LOGIN USING FACEBOOK OAUTH API
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ScriptLoadService } from '../../../services/script/script.load.service';
import { LinkedInResponse } from '../models/linkedin.response.model';
import { LoginProvider } from './../login.provider';
import { SOCIAL_CONSTANT } from './../social.constant';
import { SocialUserInfo } from './../social.user.info.model';
declare let FB: any;
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'amexio-facebook-auth-provider',
  templateUrl: './facebook.auth.component.html',
})
export class FacebookAuthComponent extends SocialBaseComponent implements OnInit {

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
    if (this.styleType && this.styleType.toLowerCase() === 'square') {
      this.isCircle = false;
    }
    this.loginProviderObj.id = this.clientId;
    this.loginProviderObj.name = SOCIAL_CONSTANT.FACEBOOK;
    this.loginProviderObj.url = SOCIAL_CONSTANT.FACEBOOK_API_URL;
    this.initialize();
  }
   // ON CLICK EVENT CALL SIGNIN FUNCTION
   onButtonClick() {
    this.signIn();
  }

  // THIS FUNCTION IS USED FOR INITALIZE THE AUTH2 OBJECT AND RETURN USER INFO
  initialize(): Promise<SocialUserInfo> {
    return new Promise((resolve, reject) => {
      this.scriptLoadService.loadScript(this.loginProviderObj, () => {
          FB.init({
            appId: this.clientId,
            autoLogAppEvents: true,
            cookie: true,
            xfbml: true,
            version: 'v2.10',
          });
          FB.AppEvents.logPageView();

          FB.getLoginStatus(function(response: any) {
            if (response.status === 'connected') {
              const accessToken = FB.getAuthResponse()['accessToken'];
              FB.api('/me?fields=name,email,picture', (res: any) => {
                resolve(this.getUserinfo(Object.assign({}, {token: accessToken}, res)));
              });
            }
          });
        });
    });
  }

   getUserinfo(response: any): SocialUserInfo {
    const user: SocialUserInfo = new SocialUserInfo();
    user.id = response.id;
    user.name = response.name;
    user.email = response.email;
    user.token = response.token;
    user.image = 'https://graph.facebook.com/' + response.id + '/picture?type=normal';
    if (user && user.name) {
      this.onLogin.emit(user);
    }
    return user;
  }

  signIn(): Promise<SocialUserInfo> {
    return new Promise((resolve, reject) => {
      FB.login((response: any) => {
        if (response.authResponse) {
          const accessToken = FB.getAuthResponse()['accessToken'];
          FB.api('/me?fields=name,email,picture', (res: any) => {
            resolve(this.getUserinfo(Object.assign({}, {token: accessToken}, res)));
          });
        }
      }, { scope: 'email,public_profile' });
    });
  }
}
