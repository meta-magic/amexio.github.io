import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AmexioHeaderComponent } from './pane.action.header';
import { BehaviorSubject } from 'rxjs/index';
import { HttpClient } from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http';
import {CommonIconComponent} from '../../base/components/common.icon.component'
describe('AmexioHeaderComponent', () => {  
  let comp1: AmexioHeaderComponent;
  let fixture1: ComponentFixture<AmexioHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ],
      declarations: [AmexioHeaderComponent,CommonIconComponent],
      providers: [HttpClient],

    });
    fixture1 = TestBed.createComponent(AmexioHeaderComponent);
    comp1 = fixture1.componentInstance;    
  });

  it('onCloseClick call ()', () => {
    comp1.onCloseClick();
    comp1.closeableBehaiour.next(false);
    comp1.closeDataEmit.emit(this);
  });

});