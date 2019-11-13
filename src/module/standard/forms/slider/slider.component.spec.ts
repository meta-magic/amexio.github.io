import { forwardRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IconLoaderService } from '../../../../index';
import { AmexioInputHelperComponent } from '../../../base/input.helper.component';
import { AmexioSliderComponent } from './slider.component';
import { DomHandler } from './slider.handler';

/**
 * Created by anaghak on 16/10/2019.
 */
describe('Amexio Slider Component', () => {

  let component: AmexioSliderComponent;
  let fixture: ComponentFixture<AmexioSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AmexioSliderComponent, AmexioInputHelperComponent],
      providers: [
        {
          provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AmexioSliderComponent), multi: true,
        }
      ]
    });
    fixture = TestBed.createComponent(AmexioSliderComponent);
    component = fixture.componentInstance;
    component.componentId = 'slider' + '_' + Math.floor(window.crypto.getRandomValues(new Uint32Array(1))[0]);
    expect(component.componentId).toBeDefined();
  });
 
//   it('constructor()', () => {
// //    let constructorSpy = jasmine./createSpy('constructor');
//     component.componentId = 'slider' + '_' + Math.floor(window.crypto.getRandomValues(new Uint32Array(1))[0]);
//     expect(component.componentId).toBeDefined();
//     // expect(constructorSpy).toHaveBeenCalled;
//   });


});