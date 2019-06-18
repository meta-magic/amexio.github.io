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
* Created by pratik on 29/1/18.
*/

import { Component, ElementRef, EventEmitter, forwardRef, Input, NgZone, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomHandler } from './slider.handler';

import { ValueAccessorBase } from '../../base/value-accessor';

@Component({
  selector: 'amexio-slider',
  templateUrl: 'slider.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AmexioSliderComponent), multi: true,
  }],
})
export class AmexioSliderComponent extends ValueAccessorBase<number> implements OnInit, OnDestroy, ControlValueAccessor {

  /*
Properties
name : animate
datatype : boolean
version : 4.0 onwards
default : false
description : Sets if animate flag is set
*/
  @Input() animate: boolean;
  /*
Properties
name : disabled
datatype : boolean
version : 4.0 onwards
default : false
description : Sets if slider is disabled
*/
  @Input() disabled: boolean;
  /*
Properties
name : min-value
datatype : number
version : 4.0 onwards
default :
description : Min slider value
*/
  @Input('min-value') min = 0;
  /*
Properties
name : max-value
datatype : number
version : 4.0 onwards
default :
description : Max slider value
*/
  @Input('max-value') max = 100;
  /*
Properties
name : orientation
datatype : string
version : 4.0 onwards
default : horizontal
description : Vertical or Horizontal Orientation of slider
*/
  @Input() orientation = 'horizontal';
  /*
Properties
name : step-value
datatype : number
version : 4.0 onwards
default :
description : Step value in slider
*/
  @Input('step-value') step: number;
  /*
Properties
name : range
datatype : boolean
version : 4.0 onwards
default : false
description : Range set to the slider
*/
  @Input() range: boolean;

  @Input() style: any;
  /*
Properties
name : style-class
datatype : string
version : 4.0 onwards
default :
description : Styling class applied slider
*/
  @Input('style-class') styleClass: string;
  /*
Properties
name : input
datatype : number
version : 5.11.2 onwards
default :
description : Type applied to slider
*/
  @Input('type') type = 1;

  /*
Properties
name :shape
datatype : string
version : 4.0 onwards
default : round
description : Round or Square Shape for toggle switch ,example shape=round,square .
*/
  @Input() shape: string;
  /*
    /*
  Events
  name : onChange
  datatype : any
  version : 4.0 onwards
  default :
  description : Triggers when slider is moved
  */

  @Output() onChange: EventEmitter<any> = new EventEmitter();
  /*
Events
name : onSlideEnd
datatype : any
version : 4.0 onwards
default :
description : Triggers when slider reaches the end
*/
  @Output() onSlideEnd: EventEmitter<any> = new EventEmitter();

  // For input use only
  @Input('darkmode-slider') darkmodeSlider = false;

  public dragging: boolean;

  public dragListener: any;

  public mouseupListener: any;

  public initX: number;

  public initY: number;

  public barWidth: number;

  public barHeight: number;

  public sliderHandleClick: boolean;

  public handleIndex = 0;

  public startHandleValue: any;

  public startx: number;

  public starty: number;

  public value: number;

  public values: number;

  public handleValue: number;

  public handleValues: number[] = [];

  public slidevar: any;

  componentId: string;

  sliderFocus = false;

  public onModelChange: any = () => { };

  public onModelTouched: any = () => { };

  constructor(public el: ElementRef, public domHandler: DomHandler, public renderer: Renderer2, private ngZone: NgZone) {
    super();
    this.componentId = 'slider' + '_' + Math.floor(Math.random() * 1000 + 999);
  }

  ngOnInit() {
    if (this.shape === '' || this.shape == null) {
      this.shape = 'round';
    }
  }
  onMouseDown(event: Event, index?: number) {
    if (this.disabled) {
      return;
    }

    this.dragging = true;
    this.updateDomData();
    this.sliderHandleClick = true;
    this.handleIndex = index;
    this.bindDragListeners();
    event.preventDefault();
  }

  onTouchStart(event: any, index?: number) {
    const touchobj = event.changedTouches[0];
    this.startHandleValue = (this.range) ? this.handleValues[index] : this.handleValue;
    this.dragging = true;
    this.handleIndex = index;

    if (this.orientation === 'horizontal') {
      this.startx = parseInt(touchobj.clientX, 10);
      this.barWidth = this.el.nativeElement.children[0].offsetWidth;
    } else {
      this.starty = parseInt(touchobj.clientY, 10);
      this.barHeight = this.el.nativeElement.children[0].offsetHeight;
    }

    event.preventDefault();
  }

  onTouchMove(event: any, index?: number) {
    const touchobj = event.changedTouches[0];
    let handleValue = 0;

    if (this.orientation === 'horizontal') {
      handleValue = Math.floor(((parseInt(touchobj.clientX, 10) - this.startx) * 100) / (this.barWidth)) + this.startHandleValue;
    } else {
      handleValue = Math.floor(((this.starty - parseInt(touchobj.clientY, 10)) * 100) / (this.barHeight)) + this.startHandleValue;
    }

    this.setValueFromHandle(event, handleValue);

    event.preventDefault();
  }

  onBarClick(event: any) {
    if (this.disabled) {
      return;
    }

    if (!this.sliderHandleClick) {
      this.updateDomData();
      this.handleChange(event);
    }

    this.sliderHandleClick = false;
  }

  handleChange(event: Event) {
    let handleValue = this.calculateHandleValue(event);
    const stepvalue = parseInt(this.step + '', 10);
    if ((handleValue + stepvalue) > 99) {
      handleValue = 100;
    } else if ((handleValue - stepvalue) < 1) {
      handleValue = 0;
    }
    this.setValueFromHandle(event, handleValue);
  }

  bindDragListeners() {
    this.ngZone.runOutsideAngular(() => {
      if (!this.dragListener) {
        this.dragListener = this.renderer.listen('document', 'mousemove', (event: any) => {
          if (this.dragging) {
            this.ngZone.run(() => {
              this.handleChange(event);
            });
          }
        });
      }

      if (!this.mouseupListener) {
        this.mouseupListener = this.renderer.listen('document', 'mouseup', (event: any) => {
          this.mouseUpListMethod();
        });
      }
    });
  }

  mouseUpListMethod() {
    if (this.dragging) {
      this.dragging = false;
      this.ngZone.run(() => {
        if (this.range) {
          this.onSlideEnd.emit({ originalEvent: event, values: this.values });
        } else {
          this.onSlideEnd.emit({ originalEvent: event, value: this.value });
        }
      });
    }
  }

  unbindDragListeners() {
    if (this.dragListener) {
      this.dragListener();
    }

    if (this.mouseupListener) {
      this.mouseupListener();
    }
  }

  setValueFromHandle(event: Event, handleValue: any) {
    const newValue = this.getValueFromHandle(handleValue);

    if (this.range) {
      if (this.step) {
        this.handleStepChange(newValue, this.values[this.handleIndex]);
      } else {
        this.handleValues[this.handleIndex] = handleValue;
        this.updateValue(newValue, event);
      }
    } else {
      if (this.step) {
        this.handleStepChange(newValue, this.value);
      } else {
        this.handleValue = handleValue;
        this.updateValue(newValue, event);
      }
    }
  }

  handleStepChange(newValue: number, oldValue: number) {
    const diff = (newValue - oldValue);
    let val = oldValue;

    if (diff < 0) {
      val = oldValue + Math.ceil((newValue - oldValue) / this.step) * this.step;
    } else if (diff > 0) {
      val = oldValue + Math.floor((newValue - oldValue) / this.step) * this.step;
    }

    this.updateValue(val);
    this.updateHandleValue();
  }

  setDisabledState(val: boolean): void {
    this.disabled = val;
  }

  get rangeStartLeft() {
    return this.isVertical() ? 'auto' : this.handleValues[0] + '%';
  }

  get rangeStartBottom() {
    return this.isVertical() ? this.handleValues[0] + '%' : 'auto';
  }

  get rangeEndLeft() {
    return this.isVertical() ? 'auto' : this.handleValues[1] + '%';
  }

  get rangeEndBottom() {
    return this.isVertical() ? this.handleValues[1] + '%' : 'auto';
  }

  isVertical(): boolean {
    return this.orientation === 'vertical';
  }

  updateDomData(): void {
    const rect = this.el.nativeElement.children[0].getBoundingClientRect();
    this.initX = rect.left + this.domHandler.getWindowScrollLeft();
    this.initY = rect.top + this.domHandler.getWindowScrollTop();
    this.barWidth = this.el.nativeElement.children[0].offsetWidth;
    this.barHeight = this.el.nativeElement.children[0].offsetHeight;
  }

  calculateHandleValue(event: any): number {
    if (this.orientation === 'horizontal') {
      return ((event.pageX - this.initX) * 100) / (this.barWidth);
    } else {
      return (((this.initY + this.barHeight) - event.pageY) * 100) / (this.barHeight);
    }
  }

  updateHandleValue(): void {
    if (this.range) {
      this.handleValues[0] = (this.values[0] < this.min ? 0 : this.values[0] - this.min) * 100 / (this.max - this.min);
      this.handleValues[1] = (this.values[1] > this.max ? 100 : this.values[1] - this.min) * 100 / (this.max - this.min);
    } else {
      if (this.value < this.min) {
        this.handleValue = 0;
      } else if (this.value > this.max) {
        this.handleValue = 100;
      } else {
        this.handleValue = (this.value - this.min) * 100 / (this.max - this.min);
      }
    }
  }

  updateValue(val: number, valueEvent?: Event): void {
    if (this.range) {
      let value = val;
      if (this.handleIndex === 0) {
        if (value < this.min) {
          value = this.min;
          this.handleValues[0] = 0;
        } else if (value > this.values[1]) {
          value = this.values[1];
          this.handleValues[0] = this.handleValues[1];
        }
      } else {
        if (value > this.max) {
          value = this.max;
          this.handleValues[1] = 100;
        } else if (value < this.values[0]) {
          value = this.values[0];
          this.handleValues[1] = this.handleValues[0];
        }
      }

      this.values[this.handleIndex] = Math.floor(value);
      this.onModelChange(this.values);
      this.onChange.emit({ event: valueEvent, values: this.values });
    } else {
      this.updateValueNoRange(val, valueEvent);
    }
  }

  updateValueNoRange(val: number, valueEvent?: Event) {
    if (val < this.min) {
      val = this.min;
      this.handleValue = 0;
    } else if (val > this.max) {
      val = this.max;
      this.handleValue = 100;
    }

    this.value = Math.floor(val);
    this.onModelChange(this.value);
    this.onChange.emit({ event: valueEvent, value: this.value });
  }

  getValueFromHandle(handleValue: number): number {
    return (this.max - this.min) * (handleValue / 100) + this.min;
  }

  ngOnDestroy() {
    this.unbindDragListeners();
  }
  onKeyLeftDown(event: Event) {
    if (!this.step) {
      this.step = 10;
      this.step = this.max / this.step;
    } else if (!this.max && !this.step && !this.min) {
      this.step = this.max / this.step;
    }
    this.handleValue = this.handleValue - this.step;
    this.setValueFromHandle(event, this.handleValue);
  }
  onKeyRightUp(event: Event) {
    if (!this.step) {
      this.step = 10;
      this.step = this.max / this.step;
    } else if (!this.max && !this.step && !this.min) {
      this.step = this.max / this.step;
    }
    this.handleValue = this.handleValue + this.step;
    this.setValueFromHandle(event, this.handleValue);
  }
  onKeyHome(event: Event) {
    if (!this.step) {
      this.step = 10;
      this.step = this.max / this.step;
    } else if (!this.max && !this.step && !this.min) {
      this.step = this.max / this.step;
    }
    this.handleValue = this.min;
    this.setValueFromHandle(event, this.handleValue);
  }
  onKeyEnd(event: Event) {
    if (!this.step) {
      this.step = 10;
      this.step = this.max / this.step;
    } else if (!this.max && !this.step && !this.min) {
      this.step = this.max / this.step;
    }
    this.handleValue = this.max;
    this.setValueFromHandle(event, this.handleValue);
  }
  onKeyPageUp(event: Event) {
    this.handleValue = this.handleValue + 10;
    this.setValueFromHandle(event, this.handleValue);
  }
  onKeyPageDown(event: Event) {
    this.handleValue = this.handleValue - 10;
    this.setValueFromHandle(event, this.handleValue);
  }
  onFocus(event: Event) {
    this.sliderFocus = true;
  }
  onBlur(event: Event) {
    this.sliderFocus = false;
  }
}
