import { HttpClient } from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {CommonIconComponent} from '../../../base/components/common.icon.component';
import { LifeCycleBaseComponent } from '../../../base/lifecycle.base.component';
import { CommonDataService } from '../../../services/data/common.data.service';
import { DeviceQueryService } from '../../../services/device/device.query.service';
import { AmexioMenuBarComponent } from './menubar.component';
describe('AmexioMenuBarComponent', () => {
  let comp1: AmexioMenuBarComponent;
  let fixture1: ComponentFixture<AmexioMenuBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ],
      declarations: [AmexioMenuBarComponent, CommonIconComponent],
      providers: [DeviceQueryService, CommonDataService, HttpClient],

    });
    fixture1 = TestBed.createComponent(AmexioMenuBarComponent);
    comp1 = fixture1.componentInstance;
  });

  it('constructor  super call ()', () => {
    expect(comp1.setRoundEdge).toBeTruthy();
  });

});
