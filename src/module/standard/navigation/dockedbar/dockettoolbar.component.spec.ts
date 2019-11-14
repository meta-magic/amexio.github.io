import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DockedBarToolComponent } from './dockettoolbar.component';
import { LifeCycleBaseComponent } from '../../../base/lifecycle.base.component';
import { AmexioImageComponent } from '../../../media/image/image.component';
import {CommonIconComponent} from '../../../base/components/common.icon.component';
import { DockbarComponent } from './dockbaritem';
import { HttpClient } from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http';
describe('DockedBarToolComponent', () => {
  let comp1: DockedBarToolComponent;
  let fixture1: ComponentFixture<DockedBarToolComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      declarations: [CommonIconComponent,AmexioImageComponent,DockedBarToolComponent,DockbarComponent],
      providers: [HttpClient],

    });
    fixture1 = TestBed.createComponent(DockedBarToolComponent);
    comp1 = fixture1.componentInstance;    
  });

  it('constructor  super call ()', () => {
    expect(comp1.setRoundEdge).toBeTruthy();
  });

});