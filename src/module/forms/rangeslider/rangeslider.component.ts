import {
  ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef,
  Input, NgModule, NgZone, OnDestroy, OnInit, Output, Renderer2,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'amexio-value-range',
  templateUrl: './rangeslider.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AmexioRangeSliderComponent), multi: true },
  ],
})
export class AmexioRangeSliderComponent implements OnDestroy, OnInit, ControlValueAccessor {
  value: number;

  values: number[];

  handleValue: number;

  handleValues: number[] = [];

  dragData = false;

  dragListener: any;

  mouseupListener: any;

  initX: number;

  initY: number;

  barWidth: number;

  barHeight: number;

  sliderHandleClick = false;

  handleIndex = 0;

  startHandleValue: any;

  startx: number;

  starty: number;

  @Input() animate = false;

  @Input() disabled = false;

  @Input('min') min = 0;

  @Input('max') max: number;

  @Input('orientation') orientation = 'horizontal';

  @Input('step-value') step: number;

  @Input() range = false;

  @Input('max-range') maxRange: number;

  @Input() style: any;

  @Input('type') type: string;

  fullRange = false;

  @Input() styleClass: string;

  @Output() onChange: EventEmitter<any> = new EventEmitter();

  @Output() onSlideEnd: EventEmitter<any> = new EventEmitter();

  onModelChange: any = () => { };
  onModelTouched: any = () => { };
  constructor(public el: ElementRef, public renderer: Renderer2, private ngZone: NgZone, public cd: ChangeDetectorRef) {
  }
  ngOnInit() {
    this.writeValue([0, this.maxRange]);
  }
  onMouseMove(event: Event, index?: number) {
    if (this.disabled) {
      return;
    }
    this.dragData = true;
    this.updateDomData();
    this.sliderHandleClick = true;
    this.handleIndex = index;
    this.bindDragListeners();
    event.preventDefault();
  }

  onSlideBarClick(event: any) {
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
    const handleValue = this.calculateHandleValue(event);
    this.setValueFromHandle(event, handleValue);
  }

  bindDragListeners() {
    this.ngZone.runOutsideAngular(() => {
      if (!this.dragListener) {
        this.dragListener = this.renderer.listen('document', 'mousemove', (event) => {
          if (this.dragData) {
            this.ngZone.run(() => {
              this.handleChange(event);
            });
          }
        });
      }
      if (!this.mouseupListener) {
        this.checkMouseUpListener();
      }
    });
  }

  checkMouseUpListener() {
    this.mouseupListener = this.renderer.listen('document', 'mouseup', (event) => {
      if (this.dragData) {
        this.dragData = false;
        this.ngZone.run(() => {
          if (this.range) {
            this.onSlideEnd.emit({ originalEvent: event, values: this.values });
          } else {
            this.onSlideEnd.emit({ originalEvent: event, value: this.value });
          }
        });
      }
    });
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
      val = oldValue + Math.ceil(newValue / this.step - oldValue / this.step) * this.step;
    } else if (diff > 0) {
      val = oldValue + Math.floor(newValue / this.step - oldValue / this.step) * this.step;
    }
    this.updateValue(val);
    this.updateHandleValue();
  }

  writeValue(value: any): void {
    this.handleValues = [0, this.maxRange];
    if (this.range) {
      this.values = value || [0, this.maxRange];
    } else {
      this.value = value || 0;
    }
    this.updateHandleValue();
    this.cd.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onModelTouched = fn;
  }

  setDisabledState(val: boolean): void {
    this.disabled = val;
  }

  get rangeStartLeft() {

    return (this.isVertical() ? 'auto' : this.handleValues[0] + '%');

  }

  get rangeStartBottom() {
    return this.isVertical() ? this.handleValues[0] + '%' : 'auto';
  }

  get rangeEndLeft() {

    return (this.isVertical() ? 'auto' : this.handleValues[1] + '%');

  }

  get rangeEndBottom() {
    return this.isVertical() ? this.handleValues[1] + '%' : 'auto';
  }

  isVertical(): boolean {
    return this.orientation === 'vertical';
  }

  updateDomData(): void {
    const rect = this.el.nativeElement.children[0].getBoundingClientRect();
    this.initX = rect.left + this.getWindowScrollLeft();
    this.initY = rect.top + this.getWindowScrollTop();
    this.barWidth = this.el.nativeElement.children[0].offsetWidth;
    this.barHeight = this.el.nativeElement.children[0].offsetHeight;
  }
  getWindowScrollTop(): number {
    const doc = document.documentElement;
    return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
  }

  getWindowScrollLeft(): number {
    const doc = document.documentElement;
    return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
  }

  calculateHandleValue(event: any): number {
    if (this.orientation === 'horizontal') {
      return ((event.pageX - this.initX) * 100) / (this.barWidth);
    } else {
      return (((this.initY + this.barHeight) - event.pageY) * 100) / (this.barHeight);
    }
  }

  updateHandleValue(): void {
    this.max = this.maxRange;
    if (this.range) {
      this.handleValues[0] = (this.values[0] < this.min ? 0 : this.values[0] - this.min) * 100 / (this.max - this.min);
      this.handleValues[1] = (this.values[1] > this.max ? this.maxRange : this.values[1] - this.min) * 100 / (this.max - this.min);
    } else {
      if (this.value < this.min) {
        this.handleValue = 0;
      } else if (this.value > this.max) {
        this.handleValue = this.maxRange;
      } else {
        this.handleValue = (this.value - this.min) * this.maxRange / (this.max - this.min);
      }
    }
  }

  updateValue(val: number, event?: Event): void {
    if (this.range) {
      this.updateValueMethodDivided(val, event);
    } else {

      if (val < this.min) {
        val = this.min;
        this.handleValue = 0;
      } else if (val > this.max) {
        val = this.max;
        this.handleValue = 100;
      }
      this.value = this.getNormalizedValue(val);
      this.onChange.emit({ event1: event, value2: this.value });
    }
    this.onModelChange(this.values);

  }

  updateValueMethodDivided(val: number, event?: Event) {
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
    this.values[this.handleIndex] = this.getNormalizedValue(value);
    this.onChange.emit({ event1: event, values2: this.values });
  }

  getValueFromHandle(handleValue: number): number {
    return (this.max - this.min) * (handleValue / 100) + this.min;
  }

  getDecimalsCount(value: number): number {
    if (value && Math.floor(value) !== value) {
      return value.toString().split('.')[1].length || 0;
    }
  }

  getNormalizedValue(val: number): number {
    const decimalsCount = this.getDecimalsCount(this.step);
    if (decimalsCount > 0) {
      return +val.toFixed(decimalsCount);
    } else {
      return Math.floor(val);
    }
  }

  ngOnDestroy() {
    this.unbindDragListeners();
  }
}
