
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonIconComponent } from '../../../base/components/common.icon.component';
import { LifeCycleBaseComponent } from '../../../base/lifecycle.base.component';
import { CommonDataService } from '../../../services/data/common.data.service';
import { AmexioBreadcrumbComponent } from './breadcrumb.component';
describe('AmexioBreadcrumbComponent', () => {
  let comp1: AmexioBreadcrumbComponent;
  let fixture1: ComponentFixture<AmexioBreadcrumbComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      declarations: [AmexioBreadcrumbComponent, CommonIconComponent],
      providers: [HttpClient, CommonDataService],

    });
    fixture1 = TestBed.createComponent(AmexioBreadcrumbComponent);
    comp1 = fixture1.componentInstance;
  });

  it('constructor  super call ()', () => {
    expect(comp1.setRoundEdge).toBeTruthy();
  });

  it('', () => {
    let nodeArray = [{ text: "Media", icon: "fa fa-keyboard-o fa-fw", children: [{ text: "Image", icon: "fa fa-picture-o fa-fw", link: "image-demo", id: "1673816541_id", tabindex: 1 }], id: "378237256_id", tabindex: -1 }]
    comp1.iconAddedMethod(nodeArray);
    comp1.childarraykey = 'children';
    expect(nodeArray.length).toBeGreaterThan(0);
    nodeArray.forEach((node: any) => {
      expect(node[comp1.childarraykey]).toBeDefined();
      node[comp1.childarraykey].forEach((element: any, index: any) => {
        element['id'] = Math.floor(window.crypto.getRandomValues(new Uint32Array(1))[0]) + '_id';
        expect(node[comp1.childarraykey]).toBeDefined();
        comp1.iconAddedMethod(node[comp1.childarraykey]);
      })
    })
  })

});