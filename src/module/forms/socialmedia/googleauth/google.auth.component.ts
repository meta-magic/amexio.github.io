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
 * INFO: GOOGLE AUTH COMPONENT IS USED FOR THIRD PARTY LOGIN USING GOOGLE OAUTH API
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ScriptLoadService } from '../../../services/script/script.load.service';
import { LoginProvider } from './../login.provider';
import { SOCIAL_CONSTANT } from './../social.constant';
import { SocialUserInfo } from './../social.user.info.model';
declare let gapi: any;
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'amexio-google-auth-provider',
  templateUrl: './google.auth.component.html',
})
export class GoogleAuthComponent  extends SocialBaseComponent implements OnInit {

  public loginProviderObj: LoginProvider = new LoginProvider();
  private auth2: any;

  @Output() onLogin = new EventEmitter<any>();

  isCircle: boolean;

  constructor(
    private meta: Meta,
    private scriptLoadService: ScriptLoadService,
  ) {
    super();
  }

  ngOnInit() {
    this.loginProviderObj.id = this.clientId;
    this.loginProviderObj.name = SOCIAL_CONSTANT.GOOGLE;
    this.loginProviderObj.url = SOCIAL_CONSTANT.GOOGLE_GMAIL_API_URL;
    this.meta.addTag({
      name: 'google-signin-client_id',
      content: this.clientId,
    });
    if (this.styleType && this.styleType.toLowerCase() === 'circle') {
      this.isCircle = true;
    }
    if (!this.label && this.styleType && this.styleType.toLowerCase() !== 'circle') {
      this.label = 'GOOGLE';
    }
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
          gapi.load('auth2', () => {
            this.auth2 = gapi.auth2.init({
              client_id: this.clientId,
              scope: 'email',
            });

            this.auth2.then(() => {
              if (this.auth2.isSignedIn.get()) {
                resolve(this.getLoginInUserInfo());
              }
            });
          });
      });
    });
  }

  // THIS FUNCTION IS USED FOR GETTING USER INFO
  getLoginInUserInfo(): SocialUserInfo {
    const user: SocialUserInfo = new SocialUserInfo();
    const profile = this.auth2.currentUser.get().getBasicProfile();
    const authResponseObj = this.auth2.currentUser.get().getAuthResponse(true);
    if (profile && authResponseObj) {
      user.id = profile.getId();
      user.name = profile.getName();
      user.email = profile.getEmail();
      user.image = profile.getImageUrl();
      user.token = authResponseObj.access_token;
      user.idToken = authResponseObj.id_token;
      this.onLogin.emit(user);
    }
    return user;
  }

 // THIS FUNCTION IS USED FOR SIGN IN AND GET USER INFO
  signIn(): Promise<SocialUserInfo> {
    return new Promise((resolve, reject) => {
      const promise = this.auth2.signIn();
      promise.then(() => {
        resolve(this.getLoginInUserInfo());
      });
    });
  }
}
