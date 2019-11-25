import { HttpClient,HttpClientModule } from '@angular/common/http';
import {ViewChildren} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LifeCycleBaseComponent } from '../../../base/lifecycle.base.component';
import { DeviceQueryService } from '../../../services/device/device.query.service';
import { AmexioDropDownMenuComponent } from './dropdownmenu.component';
import { AmexioDropDownitemsComponent } from './dropdownmenu.component.items';
describe('DropDownMenu', () => {
  let comp1: AmexioDropDownMenuComponent;
  let fixture1: ComponentFixture<AmexioDropDownMenuComponent>;
  // beforeEach(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [AmexioDropDownMenuComponent, AmexioDropDownitemsComponent],
  //     providers: [DeviceQueryService,
  //   ],

  //   });
  //   fixture1 = TestBed.createComponent(AmexioDropDownMenuComponent);
  //   comp1 = fixture1.componentInstance;
  // });

  // it('constructor call ()', () => {
  //   expect(comp1.setRoundEdge).toBeTruthy();
  // });

});
