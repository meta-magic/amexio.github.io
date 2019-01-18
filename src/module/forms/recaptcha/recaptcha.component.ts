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
* Created by dattaram on 12/9/18.
*/

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoadRecaptchaService } from './load.recaptcha.service';
declare var grecaptcha: any;
@Component({
  selector: 'amexio-google-recaptcha',
  templateUrl: './recaptcha.component.html',
})

export class RecaptchaComponent implements OnInit {
  @Input('site-key') sitekey: string;

  @Output() onSuccess = new EventEmitter<any>();

  @Output() onFailure = new EventEmitter<any>();

  responseStructure: any;
  componentId: any;
  constructor(private _loadRecaptchaService: LoadRecaptchaService) {
    this.responseStructure = {};
  }
  ngOnInit() {
    this.componentId =
      +Math.floor(Math.random() * 90000) + 10000 + 'google';

    const script = this._loadRecaptchaService.loadScript();
    const body = document.body as HTMLDivElement;
    script.onload = () => {
      grecaptcha.ready(() => {
        this.rendercaptcha();
      });
    };
    body.appendChild(script);
  }
  rendercaptcha() {
    grecaptcha.render(this.componentId, {
      sitekey: this.sitekey, callback: (response: any) => {
        if (response && response.length > 0) {
          this.responseStructure['success'] = true;
          this.responseStructure['response'] = response;
          this.onSuccess.emit(this.responseStructure);
        } else {
          this.responseStructure['success'] = false;
          this.responseStructure['response'] = '';
          this.onFailure.emit(this.responseStructure);
        }
      },
    });
  }
}
