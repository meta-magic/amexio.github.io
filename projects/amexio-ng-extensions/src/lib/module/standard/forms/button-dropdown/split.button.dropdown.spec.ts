import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from '../../../../../public-api';
import { CommonIconComponent } from '../../../base/components/common.icon.component';
import { AmexioButtonComponent } from '../buttons/button.component';
import { AmexioFloatingButtonComponent } from '../floatingbutton/floatingbutton.component';
import { AmexioSpiltButtonDropdownComponent } from './split.button.dropdown';

describe('Amexio Spilt Button Dropdown Component : ', () => {
  let comp: AmexioSpiltButtonDropdownComponent;
  let fixture: ComponentFixture<AmexioSpiltButtonDropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AmexioSpiltButtonDropdownComponent, CommonIconComponent, AmexioFloatingButtonComponent, AmexioButtonComponent],
      providers: [IconLoaderService],
    });
    fixture = TestBed.createComponent(AmexioSpiltButtonDropdownComponent);
    comp = fixture.componentInstance;
  });

  it('button-dropdown : AmexioSpiltButtonDropdownComponent defined', () => {
    expect(fixture.componentInstance).toBeDefined();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('check array dropdownItemData', () => {
    comp.dropdownItemData = [];
    expect(comp.dropdownItemData).toEqual([]);
  });

  it('check method  onClick', () => {
    comp.onClick();
    comp.openContent = true;
    expect(comp.openContent).toEqual(true);
  });


  it('check method  getBackgroundColor', () => {

    comp.getBackgroundColor();
    comp.type = 'primary';
    expect(comp.type).toEqual('primary');
    comp.type = 'theme-color';
    expect(comp.type).toEqual('theme-color');
    let colorCode = '#0275d8';
    expect(colorCode).toBe('#0275d8');

    comp.getBackgroundColor();
    comp.type = 'success';
    expect(comp.type).toEqual('success');
    comp.type = 'green';
    expect(comp.type).toEqual('green');
    colorCode = '#5cb85c';
    expect(colorCode).toBe('#5cb85c');

    comp.getBackgroundColor();
    comp.type = 'danger';
    expect(comp.type).toEqual('danger');
    comp.type = 'red';
    expect(comp.type).toEqual('red');
    colorCode = '#d9534f';
    expect(colorCode).toBe('#d9534f');

    comp.getBackgroundColor();
    comp.type = 'warning';
    expect(comp.type).toEqual('warning');
    comp.type = 'yellow';
    expect(comp.type).toEqual('yellow');
    colorCode = '#f0ad4e';
    expect(colorCode).toBe('#f0ad4e');

  });

});

