import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from '../../../index';
import { AmexioButtonComponent } from './../buttons/button.component';
import { AmexioFormIconComponent } from './../icon/icon.component';
import { AmexioSpiltButtonDropdownComponent } from './split.button.dropdown';
import { AmexioFloatingButtonComponent } from '../floatingbutton/floatingbutton.component'
describe('amexio-floating-group-button', () => {
  let comp: AmexioSpiltButtonDropdownComponent;
  let fixture: ComponentFixture<AmexioSpiltButtonDropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AmexioSpiltButtonDropdownComponent, AmexioFloatingButtonComponent, AmexioFormIconComponent, AmexioButtonComponent],
      providers: [IconLoaderService],
    });
    fixture = TestBed.createComponent(AmexioSpiltButtonDropdownComponent);
    comp = fixture.componentInstance;
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

  // it('check method 9  itemClick', () => {
  //   let ev: any;
  //   let itemData: any;

  //   comp.itemClick(ev, itemData);
  //   //   let data = itemData.onItemClick;
  //   // data.subscribe((g: any) => {
  //   // expect(ev).toEqual(g);
  //   // });

  // });


  it('check method  getBackgroundColor', () => {

    comp.getBackgroundColor();

    comp.type = 'primary';
    expect(comp.type).toEqual('primary');
    let colorCode = '#0275d8';
    expect(colorCode).toBe('#0275d8');
  });



});



