import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { ViewportBackgroundComponent } from './viewport.background.component';

describe('Viewport Background Component', () => {
  let component: ViewportBackgroundComponent;
  let fixture: ComponentFixture<ViewportBackgroundComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewportBackgroundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewportBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

});
