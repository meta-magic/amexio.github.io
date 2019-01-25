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
*  Created by pratik on 15/12/17.
*/

import {
  AfterContentInit, Component, ContentChildren, EventEmitter, Input,
  Output, QueryList,
} from '@angular/core';
import {StepBlockComponent} from './step-block';

@Component({
  selector: 'amexio-steps', templateUrl: 'steps.html',
})

export class AmexioStepsComponent implements AfterContentInit {
  private componentLoaded: boolean;
   /*
Properties
name : index
datatype : boolean
version : 4.0 onwards
default : false
description : Show the indexes of steps.
*/
  @Input() index: boolean;

    /*
Properties
name : icon
datatype : boolean
version : 4.0 onwards
default : false
description : icon for stepbox.
*/
  @Input() icon: boolean;

     /*
Properties
name :  block
datatype : boolean
version : 4.0 onwards
default : false
description : Show block based on boolean.
*/
  @Input() block: boolean;

  /*
Events
name : onClick
datatype : none
version : none
default : none
description :Event emitted on block click.
*/
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();

  /*
Events
name : getStepBlockData
datatype : none
version : none
default : none
description :Gives stepblock information .
*/
  @Output() getStepBlockData: EventEmitter<any> = new EventEmitter<any>();

  @ContentChildren(StepBlockComponent) stepBlocks: QueryList<StepBlockComponent>;

  stepBlockArray: StepBlockComponent[];

       /*
Properties
name :  data
datatype : any
version : 4.0 onwards
default :
description : Provides data for stepblock.
*/
  _data: any;
  @Input('data')
   set data(value: any[]) {
     this._data = value;
     if (this.componentLoaded) {
       this.updateComponent();
     }
   }
   get data(): any[] {
     return this._data;
   }

  stepPreviewData: any;

  constructor() {
  }

  onStepClick(clickData: any, ev: any) {
    this.getStepBlockData.emit({event: ev, data: clickData});
    this.onClick.emit(clickData);
  }

  ngAfterContentInit() {
    if (this.data && this.data.length > 0) {
      this.stepPreviewData = JSON.parse(JSON.stringify(this.data));
      this.stepBlockArray = this.data;
    } else {
      this.stepBlockArray = this.stepBlocks.toArray();
    }
    this.componentLoaded = true;
  }

  updateComponent() {
    if (JSON.stringify(this.stepPreviewData) !== JSON.stringify(this.data)) {
      this.stepPreviewData = JSON.parse(JSON.stringify(this.data));
      this.stepBlockArray = this.data;
    }
  }
}
