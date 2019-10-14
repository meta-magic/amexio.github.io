
/**
 * Created by pratik on 1/12/17.
 */
import { AmexioTextInputComponent } from './textinput.component';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index'
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AmexioInputHelperComponent } from '../../base/input.helper.component';
import { validateConfig } from '@angular/router/src/config';

describe('Text INPUT', () => {

  let comp: AmexioTextInputComponent;
  let fixture: ComponentFixture<AmexioTextInputComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AmexioTextInputComponent, AmexioInputHelperComponent],
      providers: [IconLoaderService]
    });
    fixture = TestBed.createComponent(AmexioTextInputComponent);
    comp = fixture.componentInstance;
  });


  it('initialize innervalue', () => {
    comp.value = 'sagfaf';
    expect(comp['innerValue']).toEqual(comp.value);
  })

  it('get pattern', () => {
    expect(comp.pattern).toEqual(comp._pattern);
  })

  it('register on change', () => {
    let fn: any;
    comp.registerOnChange(fn);
    expect(comp['onChangeCallback']).toEqual(fn);
  })


  it('register on touched', () => {
    let fn: any;
    comp.registerOnTouched(fn);
    expect(comp['onTouchedCallback']).toEqual(fn);
  })
  it('writeValue()', () => {
    let value = 'abc';
    comp.innerValue = 'xyz';
    expect(value).not.toEqual(comp.innerValue);
    comp.innerValue = value;
  })

  it('ngOninit Method', () => {
    comp.ngOnInit();
    comp.name = comp.generateName(comp.name, comp.fieldlabel, 'textinput');
    comp.componentId = comp.createCompId('textinput', comp.name);
  })

  it('check for isValid', () => {
    comp.isValid = true;
    expect(comp.isValid).toEqual(true);
  })

  it('onInputTextEvent call ', () => {
    comp.onInputTextEvent(event);
    comp.onInputEvent(event);
  })
});
