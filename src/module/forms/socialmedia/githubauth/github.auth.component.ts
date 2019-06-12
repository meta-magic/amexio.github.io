import { Component, EventEmitter, Input, OnInit, Output  } from '@angular/core';
import { SocialUserInfo } from '../social.user.info.model';
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
 * Created by medha on 23/1/19.
 * INFO: FACEBOOK AUTH COMPONENT IS USED FOR THIRD PARTY LOGIN USING FACEBOOK OAUTH API
 */
function _window(): any {
  // return the global native browser window object
  return window;
}
@Component({
  selector: 'amexio-github-auth-provider',
  templateUrl: './github.auth.component.html',
})
export class GithubAuthComponent extends SocialBaseComponent implements OnInit {
  isCircle: boolean;
  @Output() onLogin = new EventEmitter<any>();
  constructor() {
    super();
  }

  ngOnInit() {
    if (this.styleType && this.styleType.toLowerCase() === 'circle') {
      this.isCircle = true;
    }
    if (this.styleType && this.styleType.toLowerCase() === 'square') {
      this.isCircle = false;
    }
    const oauthScript = document.createElement('script');
    oauthScript.src = 'https://cdn.rawgit.com/oauth-io/oauth-js/c5af4519/dist/oauth.js';

    document.body.appendChild(oauthScript);
  }
  // navigate to github login api
  loginToGithub(e: any) {
    const user: SocialUserInfo = new SocialUserInfo();
    _window().OAuth.initialize(this.clientId);
    _window().OAuth.popup('github').then((provider: any) => {
      user.token = provider.access_token;
      provider.me().then((response: any) => {
        user.id = response.id;
        user.name = response.name ? response.name : null;
        user.email = response.email ? response.email : null;
        user.image = response.avatar_url ? response.avatar_url : null;
        if (user && user.name) {
          this.onLogin.emit(user);
        }
      });
    });
  }
}
