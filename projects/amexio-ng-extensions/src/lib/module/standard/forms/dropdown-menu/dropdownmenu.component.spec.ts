import { HttpClient,HttpClientModule } from '@angular/common/http';
import {ViewChildren} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LifeCycleBaseComponent } from '../../../base/lifecycle.base.component';
import { DeviceQueryService } from '../../../services/device/device.query.service';
import { AmexioDropDownMenuComponent } from './dropdownmenu.component';
import { AmexioDropDownItemsComponent } from './dropdownmenu.items.component';
describe('Amexio DropDownMenu Component', () => {
  let comp: AmexioDropDownMenuComponent;
  let fixture: ComponentFixture<AmexioDropDownMenuComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AmexioDropDownMenuComponent, AmexioDropDownItemsComponent],
      providers: [DeviceQueryService,
    ],

    });
    fixture = TestBed.createComponent(AmexioDropDownMenuComponent);
    comp = fixture.componentInstance;
  });

  it('Component created', () => {
    expect(fixture.componentInstance).toBeDefined();
  });

  it('constructor call ()', () => {
    expect(comp.setRoundEdge).toBeTruthy();
  });



});
