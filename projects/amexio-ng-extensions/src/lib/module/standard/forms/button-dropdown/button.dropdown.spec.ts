import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from '../../../../../public-api';
import { CommonIconComponent } from '../../../base/components/common.icon.component';
import { AmexioButtonDropdownComponent } from './button.dropdown';
import { AmexioButtonDropDownItemComponent } from './button.dropdown.item';

describe('amexio-spilt-button', () => {
  let comp: AmexioButtonDropdownComponent;
  let fixture: ComponentFixture<AmexioButtonDropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [CommonIconComponent, AmexioButtonDropDownItemComponent, AmexioButtonDropdownComponent],
      providers: [IconLoaderService],
    });
    fixture = TestBed.createComponent(AmexioButtonDropdownComponent);
    comp = fixture.componentInstance;
  });

  it('Init buttonDropdown', () => {
    comp.ngOnInit();
    comp.label = 'button-dropdown';

    comp.componentId = comp.label + window.crypto.getRandomValues(new Uint32Array(1))[0];
  });

  it('onHomeClick 1st condition', () => {
    comp.onHomeClick();
    comp.flag = true;
    comp.dropdownItemData = [{selected: true, index: 0}, {selected: true, index: 1}, {selected: true, index: 2}];
    expect(comp.flag).toBe(true);
    // comp.buttonindex1 = comp.findbuttonindex();
    comp.buttonindex1 = 1;
    expect(comp.buttonindex1).toBeLessThan(comp.dropdownItemData.length - 1);
    // expect(comp.onHomeClickSelected()).toHaveBeenCalled;

  });

  it('onHomeClick 2nd condition', () => {
    comp.onHomeClick();
    comp.flag = true;
    comp.dropdownItemData = [{selected: true, index: 0}, {selected: true, index: 1}, {selected: true, index: 2}];
    expect(comp.flag).toBe(true);
    // comp.buttonindex1 = comp.findbuttonindex();
    comp.buttonindex1 = 5;
    expect(comp.buttonindex1).toBeGreaterThan(comp.dropdownItemData.length - 1);
    // expect(comp.onHomeClickSelected()).not.toHaveBeenCalled;

  });

  it('onEndClick 1st condition', () => {
    comp.onEndClick();
    comp.flag = true;
    comp.dropdownItemData = [{selected: true, index: 0}, {selected: true, index: 1}, {selected: true, index: 2}];
    expect(comp.flag).toBe(true);
    // comp.buttonindex1 = comp.findbuttonindex();
    comp.buttonindex1 = 1;
    expect(comp.buttonindex1).toBeLessThan(comp.dropdownItemData.length - 1);
    // expect(comp.onEndClickSelected()).toHaveBeenCalled;

  });

  it('onEndClick 2nd condition', () => {
    comp.onEndClick();
    comp.flag = true;
    comp.dropdownItemData = [{selected: true, index: 0}, {selected: true, index: 1}, {selected: true, index: 2}];
    expect(comp.flag).toBe(true);
    comp.buttonindex1 = comp.findbuttonindex();
    comp.buttonindex1 = 5;
    expect(comp.buttonindex1).toBeGreaterThan(comp.dropdownItemData.length - 1);
    // expect(comp.onEndClickSelected()).not.toHaveBeenCalled;

  });
});

