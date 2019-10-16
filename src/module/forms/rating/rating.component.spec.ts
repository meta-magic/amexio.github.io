import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AmexioRatingComponent } from './rating.component';

/**
 * Created by pratik on 7/12/17.
 */
describe('Button tests', () => {

  let component: AmexioRatingComponent;
  let fixture: ComponentFixture<AmexioRatingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AmexioRatingComponent],
      providers: [
      ],

    });
    fixture = TestBed.createComponent(AmexioRatingComponent);
    component = fixture.componentInstance;
    component.ratingRange = [1, 2, 3, 4, 5];
  });

  it('true is true', () => expect(true).toBe(true));

  it('verify that the component AmexioRatingComponent is created', () => {
    expect(fixture.componentInstance instanceof AmexioRatingComponent)
      .toBe(true, 'should create AmexioRatingComponent');
  });

  it('ngOnInit: check onInit call', () => {
    component.componentId = component.createCompId('rating', component.fieldlabel);
    const starId = 'star' + Math.floor(window.crypto.getRandomValues(new Uint32Array(1))[0]);

    expect(component.ratingRange).toBeDefined();
    expect(starId).toBeDefined();

    for (let i = 0; i < component.ratingRange.length; i++) {
      const obj = {};
      obj['number'] = i + 1;
      obj['selected'] = false;
      obj['tabindex'] = '-1';
      component.ratingRangeData.push(obj);

      expect(obj['number']).toEqual(i + 1);
      expect(obj['selected']).toEqual(false);
      expect(obj['tabindex']).toEqual('-1');
    }
    let temp: any;
    temp = new AmexioRatingComponent();
    temp.buildRanges();
    const spy = spyOn<any>(temp, 'buildRanges');
    temp.buildRanges();
    expect(spy.calls.any()).toBeTruthy();
  });
});
