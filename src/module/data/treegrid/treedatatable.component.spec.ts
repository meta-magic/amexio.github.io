import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { TreeDataTableComponent } from "./treedatatable.component";
import { CommonDataService } from '../../services/data/common.data.service';
import { CommonIconComponent } from '../../base/components/common.icon.component';
describe('amexio-datatable', () => {
  let comp: TreeDataTableComponent ;
  let fixture: ComponentFixture<TreeDataTableComponent>;
  let _http: any;
let service: any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [TreeDataTableComponent, CommonIconComponent], // declare the test component
    });
    service = new CommonDataService(_http);
    fixture = TestBed.createComponent(TreeDataTableComponent);  // => Fixture Creates the environment surrounding the component & the has access to the instance itself.
    comp = fixture.componentInstance;
  });
  // it('should call initializer function in constructor', () => {
//     TestBed.createComponent(TreeDataTableComponent); // this is the trigger of constructor method
//    expect(service.initialize).toHaveBeenCalled(); // sample jasmine spy based test case
  // });

  // it('constructor  super call ()', () => {
    //   comp.ngOnInit();
    // super.ngOnInit();
  // });

});
