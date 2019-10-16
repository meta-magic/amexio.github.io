
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AmexioBreadcrumbComponent } from './breadcrumb.component';
import { LifeCycleBaseComponent } from '../../base/lifecycle.base.component';
import {CommonIconComponent} from '../../base/components/common.icon.component';
import { CommonDataService } from '../../services/data/common.data.service';
import { HttpClient } from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http';
describe('AmexioBreadcrumbComponent', () => {
  let comp1: AmexioBreadcrumbComponent;
  let fixture1: ComponentFixture<AmexioBreadcrumbComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      declarations: [AmexioBreadcrumbComponent,CommonIconComponent],
      providers: [HttpClient,CommonDataService],

    });
    fixture1 = TestBed.createComponent(AmexioBreadcrumbComponent);
    comp1 = fixture1.componentInstance;    
  });

  it('constructor  super call ()', () => {
    expect(comp1.setRoundEdge).toBeTruthy();
  });

  it('', () => {
    let nodeArray = [{text: "Media", icon: "fa fa-keyboard-o fa-fw", children: [{text: "Image", icon: "fa fa-picture-o fa-fw", link: "image-demo", id: "1673816541_id", tabindex: 1}], id: "378237256_id", tabindex: -1}]
    comp1.iconAddedMethod(nodeArray);
    expect(nodeArray.length)
  })

});