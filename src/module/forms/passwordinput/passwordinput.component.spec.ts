
/**
 * Created by pratik on 1/12/17.
 */
import { AmexioPasswordComponent } from './passwordinput.component';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index'
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AmexioInputHelperComponent } from '../../base/input.helper.component';
describe('Password INPUT', () => {

  let comp: AmexioPasswordComponent;
  let fixture: ComponentFixture<AmexioPasswordComponent>;
  event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AmexioPasswordComponent, AmexioInputHelperComponent],
      providers: [IconLoaderService]
    });
    fixture = TestBed.createComponent(AmexioPasswordComponent);
    comp = fixture.componentInstance;

    it('true is true', () => expect(true).toBe(true));
  });


  it('initialize innervalue', () => {
    comp.value = 'test Value';
    expect(comp['innerValue']).toEqual(comp.value);
  });

  //get pattern
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
});

