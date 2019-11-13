
/**
 * Created by pratik on 1/12/17.
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../../index'
import {BaseInputEventComponent} from '../../../base/base.inputevent.component';
import { AmexioInputHelperComponent } from '../../../base/input.helper.component';
import { AmexioPasswordComponent } from './passwordinput.component';
describe('Password INPUT', () => {

  let comp: AmexioPasswordComponent;
  let fixture: ComponentFixture<AmexioPasswordComponent>;
  event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AmexioPasswordComponent, AmexioInputHelperComponent],
      providers: [IconLoaderService],
    }).compileComponents();
    fixture = TestBed.createComponent(AmexioPasswordComponent);
    comp = fixture.componentInstance;
  });

  it('initialize innervalue', () => {
    comp.value = 'test Value';
    expect(comp['innerValue']).toEqual(comp.value);
  });

  // get pattern
  it('get pattern', () => {
    expect(comp.pattern).toEqual(comp._pattern);
  });

  it('register on change', () => {
    let fn: any;
    comp.registerOnChange(fn);
    expect(comp['onChangeCallback']).toEqual(fn);
  });

  it('ngOninit Method', () => {
    comp.ngOnInit();
    comp.name = comp.generateName(comp.name, comp.fieldlabel, 'pwdinput');
    comp.componentId = comp.createCompId('pwdinput', comp.name);
  });

  it('register on touched', () => {
    let fn: any;
    comp.registerOnTouched(fn);
    expect(comp['onTouchedCallback']).toEqual(fn);
  });

  it('onInputPasswordEvent call ', () => {
    comp.onInputPasswordEvent(event);
    comp.onInputEvent(event);
  });

  it('onToggle If call ', () => {
    comp.show = true;
    comp.toggleShow();
    comp.show = !comp.show;
    expect(comp.show).toEqual(true);
    comp.type = 'text';
  });

  it('onToggle else call ', () => {
    comp.show = false;
    comp.toggleShow();
    comp.show = !comp.show;
    expect(comp.show).toEqual(false);
    comp.type = 'password';
  });
});

