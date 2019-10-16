import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from '../../../index';
import { AmexioButtonDropDownItemComponent } from './button.dropdown.item';
import { CommonIconComponent } from './../../base/components/common.icon.component';
import { AmexioButtonDropdownComponent } from './button.dropdown';

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

});



