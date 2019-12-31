
/**
 * Created by pratik on 1/12/17.
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../../../public-api';
import { AmexioInputHelperComponent } from '../../../base/input.helper.component';
import { AmexioTextInputComponent } from './textinput.component';

describe('Amexio Text Input Component: ', () => {

  let comp: AmexioTextInputComponent;
  let fixture: ComponentFixture<AmexioTextInputComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AmexioTextInputComponent, AmexioInputHelperComponent],
      providers: [IconLoaderService],
    });
   
    fixture = TestBed.createComponent(AmexioTextInputComponent);
    comp = fixture.componentInstance;

    comp.name = "age";
    comp.fieldlabel = 'Age';

    fixture.detectChanges();
  });

  it('initialize innervalue', () => {
    comp.value = 'sagfaf';
    expect(comp['innerValue']).toEqual(comp.value);
  });

  it('get pattern', () => {
    expect(comp.pattern).toEqual(comp._pattern);
  });

  it('register on change', () => {
    let fn: any;
    comp.registerOnChange(fn);
    expect(comp['onChangeCallback']).toEqual(fn);
  });

  it('register on touched', () => {
    let fn: any;
    comp.registerOnTouched(fn);
    expect(comp['onTouchedCallback']).toEqual(fn);
  });

  it('writeValue()', () => {
    const value = 'abc';
    comp.innerValue = 'xyz';
    expect(value).not.toEqual(comp.innerValue);
  });


  it('check for isValid', () => {
    comp.isValid = true;
    expect(comp.isValid).toEqual(true);
  });

  it('onInputTextEvent call ', () => {
    let event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);
    spyOn(comp, 'onInputTextEvent').withArgs(event);
    comp.onInputTextEvent(event);
    fixture.detectChanges();
    expect(comp.onInputTextEvent).toHaveBeenCalledWith(event);
  });

  it('ngOninit(): ', () => {

    spyOn(comp, 'generateName').withArgs(
      comp.name,
      comp.fieldlabel,
      'textinput'
    );
    spyOn(comp, 'createCompId')
    .withArgs(
      'textinput',
      comp.name
    ).and.returnValue('textinput_age');

    fixture.detectChanges();
    //expect(comp.name).toContain('textinput');
    expect(comp.componentId).toContain('textinput');
  });

});
