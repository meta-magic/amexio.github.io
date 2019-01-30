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
 * Created by sagar on 29/1/19.
 * INFO: BASE COMPONENT
 */
import { Input } from '@angular/core';
export class SocialBaseComponent {
  /*
    Properties
    name : client-id
    datatype : string
    version : 5.5.3 onwards
    default : null
    description : client id like api-key
   */
  @Input('client-id') clientId: string;
 /*
    Properties
    name : label
    datatype : string
    version : 5.5.3 onwards
    default : null
    description : label of component
   */
  @Input('label') label: string;
/*
    Properties
    name : style-type
    datatype : string
    version : 5.5.3 onwards
    default : null
    description : style of component
   */
  @Input('style-type') styleType = 'square';

  constructor() {
  }
}
