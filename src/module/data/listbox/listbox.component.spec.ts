import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AmexioListBoxComponent } from './listbox.component';
import { CommonDataService } from '../../services/data/common.data.service';
import { LifeCycleBaseComponent } from '../../base/lifecycle.base.component';
import {AmexioContextMenuComponent} from '../../base/base.contextmenu.component';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http';
describe('AmexiodialoguePaneComponent', () => {
  let comp1: AmexioListBoxComponent;
  let fixture1: ComponentFixture<AmexioListBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientModule
      ],
      declarations: [AmexioListBoxComponent,AmexioContextMenuComponent],
      providers: [CommonDataService,HttpClient],

    });
    fixture1 = TestBed.createComponent(AmexioListBoxComponent);
    comp1 = fixture1.componentInstance;    
  });

  it('constructor  super call ()', () => {
    expect(comp1.setRoundEdge).toBeTruthy();
  });

});
