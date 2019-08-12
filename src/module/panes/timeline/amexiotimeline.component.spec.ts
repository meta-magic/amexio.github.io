import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AmexiotimelineComponent } from './amexiotimeline.component';
import { DeviceQueryService } from '../../services/device/device.query.service';
import { AmexiotimelineeventComponent } from './amexiotimelineevent.component';
import { LifeCycleBaseComponent } from '../../base/lifecycle.base.component';
describe('AmexiotimelineComponent', () => {
  let comp1: AmexiotimelineComponent;
  let fixture1: ComponentFixture<AmexiotimelineComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AmexiotimelineComponent],
      providers: [DeviceQueryService
    ],

    });
    fixture1 = TestBed.createComponent(AmexiotimelineComponent);
    comp1 = fixture1.componentInstance;    
  });

  it('constructor  super call ()', () => {
    expect(comp1.setRoundEdge).toBeTruthy();
  });

});