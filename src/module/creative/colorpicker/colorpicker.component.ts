import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import {  NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessorBase } from '../../base/value-accessor';

@Component({
  selector: 'amexio-color-picker',
  templateUrl: './colorpicker.component.html',
  animations: [
    trigger('changeState', [
      state('true', style({
        transform: 'scale(1.1)',
      })),
      state('false', style({
        transform: 'scale(0)',
      })),
      transition('*=>*', animate('200ms')),
    ]),
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ColorPickerComponent), multi: true,
  }],
})
export class ColorPickerComponent extends ValueAccessorBase<string> implements OnInit {
  @Output() selectedColor: any = new EventEmitter<any>();
  @Input('inline-color-picker') inlineColorPicker = false;
  @Input('field-label') fieldlabel: string;
  public hue = 'rgba(255,3,0,1)';
  public color: string;
  showColorPicker: boolean;
  offsetY: any;
  position: any;
  constructor() {
    super();
  }

  ngOnInit() {

  }
  selectedPaletteColor(data: any) {
   this.position = data.position;
   this.color = data.color;
   this.value = '';
   this.value = this.rgbToHexConvert(data.color);
   this.selectedColor.emit(this.value);
  }

  rgbToHexConvert(rgbColor: any) {
    rgbColor = rgbColor.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return (rgbColor && rgbColor.length === 4) ? '#' +
     ('0' + parseInt(rgbColor[1], 10).toString(16)).slice(-2) +
     ('0' + parseInt(rgbColor[2], 10).toString(16)).slice(-2) +
     ('0' + parseInt(rgbColor[3], 10).toString(16)).slice(-2) : '';
  }
  selectedHue(data: any) {
    if (data) {
      this.offsetY = data.offsetY;
      this.hue = data.color;
    }
  }
  openColorPicker() {
    this.showColorPicker = !this.showColorPicker;
  }
  closeColorPicker() {
   this.showColorPicker  = false;
  }
}
