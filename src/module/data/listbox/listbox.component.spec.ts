import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AmexioListBoxComponent } from './listbox.component';
import { CommonDataService } from '../../services/data/common.data.service';
import { LifeCycleBaseComponent } from '../../base/lifecycle.base.component';
import {AmexioContextMenuComponent} from '../../base/base.contextmenu.component';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http';
describe('AmexioListBoxComponent', () => {
  let comp1: AmexioListBoxComponent;
  let fixture1: ComponentFixture<AmexioListBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientModule
      ],
      declarations: [AmexioListBoxComponent,AmexioContextMenuComponent,LifeCycleBaseComponent],
      providers: [CommonDataService,HttpClient],

    });
    fixture1 = TestBed.createComponent(AmexioListBoxComponent);
    comp1 = fixture1.componentInstance;    
  });

  it('constructor  super call ()', () => {
    expect(comp1.setRoundEdge).toBeTruthy();
  });
  it('setSelectedFlag()', () => {
    let viewRows = [
      {
        "name": "Buck Kulkarni",
        "name_official": "Buck Kulkarni",
        "profile": "buck.jpg",
        "email" : "XYZ@metamagic.in",
        "isSelected" : false
      },
      {
        "name": "Araf Karsh Hamid",
        "name_official": "Araf Karsh Hamid",
        "profile": "karsh.jpg",
        "email" : "XYZ@metamagic.in",
        "isSelected" : false
      },
      {
        "name": "ketan Gote",
        "name_official": "Ketan Gote",
        "profile": "ketan.jpg",
        "email" : "XYZ@metamagic.in",
        "isSelected" : false
      }]
    comp1.setSelectedFlag(viewRows);
    viewRows.forEach((row: any, index: number) => {
      row['index'] = 'listbox' + window.crypto.getRandomValues(new Uint32Array(1))[0] + index;
    });
  });
});