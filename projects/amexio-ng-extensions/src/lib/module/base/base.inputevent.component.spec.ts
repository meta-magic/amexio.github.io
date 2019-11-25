// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { BaseInputEventComponent } from '../base/base.inputevent.component';
// describe('base-inputevent', () => {
//   let comp1: BaseInputEventComponent;
//   let fixture1: ComponentFixture<BaseInputEventComponent>;
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [BaseInputEventComponent]
//     });
//     fixture1 = TestBed.createComponent(BaseInputEventComponent);
//     comp1 = fixture1.componentInstance;    
//     event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);
//   });

// //on focus()
//   it('on focus()', () => {
//     comp1.onFocusEvent(event);
//     comp1.eventPropagationText(event);
//     comp1.showToolTip = true;
//     comp1.focus.emit(comp1.value);
   
//   })

//   // On Change()
//   it('on change()', () => {
//     comp1.onChangeEvent(event);
//     comp1.eventPropagationText(event);
//     comp1.change.emit(comp1.value);
//   })

//   // On Input()
//   it('on input()', () => {
//     comp1.onInputEvent(event);
//     comp1.eventPropagationText(event);
//     comp1.isValid = comp1.isFieldValid();
   
//     comp1.input.emit(comp1.value);
//   })
// it('on eventPropagationText()', () => {
//     comp1.eventPropagationText(event);
//     event.stopPropagation();
//   })
//   it('on onBlurEvent()', () => {
//     comp1.onBlurEvent();
//     comp1.showToolTip = false;
//     comp1.onBlur.emit(comp1.value);
//   })

//   it('on onNumberInputEvent()', () => {
//     comp1.onNumberInputEvent(event);
//     comp1.eventPropagationText(event);
//     comp1.isValid = comp1.isFieldValidate();
//     comp1.input.emit(comp1.value);
//   })
//   it('on onEmailInputEvent()', () => {
//     comp1.onEmailInputEvent(event);
//     comp1.eventPropagationText(event);
//     comp1.isValid = comp1.isEmailFieldValid();
//     comp1.input.emit(comp1.value);
//   })
//   it('should return true from isFieldValid', () => {
//     comp1.allowblank = false;
//     comp1.value = 'kedar@xyz.in';
//     comp1.emailpattern.test(comp1.value)
//     expect(comp1.isEmailFieldValid()).toBeTruthy();
//     expect(comp1.allowblank).toEqual(false);
//     expect(comp1.emailpattern.test(comp1.value)).toBeDefined();
//     comp1.allowblank = true;
//     expect(comp1.isEmailFieldValid()).toBeTruthy();
//     expect(comp1.allowblank).toEqual(true);

//   });
//   it('isFieldValidate min and max undefined', () => {
//     comp1.minvalue = '1';
//     comp1.maxvalue = undefined;
//     comp1.innerValue = '22';
//     comp1.isFieldValidate();
//     expect( comp1.minvalue).toBeDefined();
//     expect( comp1.maxvalue).toEqual(undefined);
//     expect( comp1.innerValue).toBeDefined();
//     expect(comp1.innerValue.length).toBeGreaterThanOrEqual(comp1.minvalue);
//     return true;
//   });
//   it('isFieldValidate max and min undefined', () => {
//     comp1.minvalue = undefined;
//     comp1.maxvalue = '4';
//     comp1.innerValue = '22';
//     comp1.isFieldValidate();
//     expect( comp1.minvalue).toEqual(undefined);
//     expect( comp1.maxvalue).toBeDefined();
//     expect( comp1.innerValue).toBeDefined();
//     expect(comp1.innerValue.length).toBeLessThanOrEqual(comp1.maxvalue)
//     return true;
//   });

//   it('isFieldValidate innervalue and minvalue undefined', () => {
//     comp1.minvalue = undefined;
//     comp1.maxvalue = '4';
//     comp1.innerValue = undefined;
//     comp1.isFieldValidate();
//     expect( comp1.minvalue).toEqual(undefined);
//     expect( comp1.maxvalue).toBeDefined();
//     expect(comp1.innerValue).toBeUndefined();
//     return false;
//   });

//   it('isFieldValidate minvalue and innerValue undefined', () => {
//     comp1.minvalue = undefined;
//     comp1.maxvalue = '4';
//     comp1.innerValue = undefined;
//     comp1.isFieldValidate();
//     expect( comp1.minvalue).toEqual(undefined);
//     expect( comp1.maxvalue).toBeDefined();
//     expect( comp1.innerValue).toBeUndefined();
//     return true;
//   });
//   it('isFieldValidate min and max undefined', () => {
//     comp1.minvalue = undefined;
//     comp1.maxvalue = undefined;
//     comp1.innerValue = '44';
//     comp1.isFieldValidate();
//     expect( comp1.minvalue).toBeUndefined();
//     expect( comp1.maxvalue).toBeUndefined();
//     expect( comp1.innerValue).toBeDefined();
//     return true;
//   });

//   it('isFieldValidate min and max defined', () => {
//     comp1.minvalue = '2';
//     comp1.maxvalue = '6';
//     comp1.innerValue = '444';
//     comp1.isFieldValidate();
//     expect(comp1.minvalue).toBeDefined();
//     expect(comp1.maxvalue).toBeDefined();
//     expect(comp1.innerValue).toBeDefined();
//     expect(comp1.innerValue).toBeGreaterThanOrEqual(comp1.minvalue);
//     expect(comp1.innerValue).toBeLessThanOrEqual(comp1.maxvalue);
//     return true;
//   });

//   it('isFieldValid call', () => {
//     comp1.allowblank = false;
//     comp1.value = 'www';
//     comp1.minlength = 2;
//     comp1.isFieldValid();
//     let valid: boolean;
//     expect(comp1.allowblank).toEqual(false);
//     expect(comp1.value).toBeDefined();
//     expect(comp1.value.length).toBeGreaterThanOrEqual(comp1.minlength);
//     expect(comp1.value.length).toBeGreaterThan(0);
//     return valid;
//   });
// });
