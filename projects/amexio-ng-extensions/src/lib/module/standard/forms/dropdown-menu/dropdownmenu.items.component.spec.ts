import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceQueryService } from '../../../services/device/device.query.service';
import { AmexioDropDownMenuComponent } from './dropdownmenu.component';
import { AmexioDropDownItemsComponent } from './dropdownmenu.items.component';
describe('Amexio DropDown Menu Item Component', () => {
  let comp: AmexioDropDownItemsComponent;
  let fixture: ComponentFixture<AmexioDropDownItemsComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AmexioDropDownMenuComponent, AmexioDropDownItemsComponent],
      providers: [DeviceQueryService,
    ],

    });
    fixture = TestBed.createComponent(AmexioDropDownItemsComponent);
    comp = fixture.componentInstance;
  });

  it('Component created', () => {
    expect(fixture.componentInstance).toBeDefined();
  });

  it('ngOnInit(): if iconalign  is right ', () => {

    comp.iconalign = 'right';
    comp.labelalign = 'right';

    fixture.detectChanges();

    expect(comp.iconalign).toBeDefined();
    expect(comp.labelalign).toBeDefined();
    expect(comp.labelalign).toBeNull();
    expect(comp.iconalign).toBeNull();
  });

  it('ngOnInit(): if iconalign  is left ', () => {

    comp.iconalign = 'left';

    fixture.detectChanges();

    expect(comp.labelalign).toEqual('right');
    expect(comp.iconalign).toBeNull();
  });


  it('ngOnInit(): if iconalign  is right ', () => {

    comp.iconalign = 'right';

    fixture.detectChanges();

    expect(comp.labelalign).toBeNull();
  });

  it('onItemClick(): ', () => {

    comp.toggle = false;
    spyOn(comp.onClick, 'emit');

    comp.onClick.emit();
    fixture.detectChanges();

    expect(comp.onClick.emit).toHaveBeenCalled();
  });


  it('onItemClick(): ', () => {

    comp.toggle = false;
    spyOn(comp.onClick, 'emit');

    fixture.detectChanges();

    expect(comp.onClick.emit).not.toHaveBeenCalled();
  });
});
