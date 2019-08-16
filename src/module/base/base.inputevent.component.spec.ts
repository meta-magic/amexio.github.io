import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaseInputEventComponent } from '../base/base.inputevent.component';
describe('base-input', () => {
  let comp1: BaseInputEventComponent;
  let fixture1: ComponentFixture<BaseInputEventComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BaseInputEventComponent]
    });
    fixture1 = TestBed.createComponent(BaseInputEventComponent);
    comp1 = fixture1.componentInstance;    
    event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);
  });

//on focus()
  it('on focus()', () => {
    comp1.onFocusEvent(event);
    comp1.eventPropagationText(event);
    comp1.showToolTip = true;
    comp1.focus.emit(comp1.value);
   
  })

  // On Change()
  it('on change()', () => {
    comp1.onChangeEvent(event);
    comp1.eventPropagationText(event);
    comp1.change.emit(comp1.value);
  })

  // On Input()
  it('on input()', () => {
    comp1.onInputEvent(event);
    comp1.eventPropagationText(event);
    this.isValid = comp1.isFieldValid();
   
    comp1.input.emit(comp1.value);
  })
it('on eventPropagationText()', () => {
    comp1.eventPropagationText(event);
    event.stopPropagation();
  })
  it('on onBlurEvent()', () => {
    comp1.onBlurEvent();
    comp1.showToolTip = false;
    comp1.onBlur.emit(comp1.value);
  })

  it('on onNumberInputEvent()', () => {
    comp1.onNumberInputEvent(event);
    comp1.eventPropagationText(event);
    comp1.isValid = comp1.isFieldValidate();
    comp1.input.emit(comp1.value);
  })
});
