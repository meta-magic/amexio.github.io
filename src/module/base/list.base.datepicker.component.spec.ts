import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { ListBaseDatepickerComponent } from "./list.base.datepicker.component";


describe('amexio-datetimebase', () => {
  let comp: ListBaseDatepickerComponent<any> ;
  let fixture: ComponentFixture<ListBaseDatepickerComponent<any>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ListBaseDatepickerComponent], // declare the test component
    });

    fixture = TestBed.createComponent(ListBaseDatepickerComponent);  // => Fixture Creates the environment surrounding the component & the has access to the instance itself.
    comp = fixture.componentInstance;
  });

  it('setRoundEdge If round-edge()', () => {
    let type = 'round-edge';
    comp.setRoundEdge('round-edge');
    expect(type).toEqual('round-edge')
    comp.roundedgeclass = 'roundEdgeCommonCss';
  });

  it('setRoundEdge If classic', () => {
    let type = 'classic';
    comp.setRoundEdge('classic');
    expect(type).toEqual('classic')
    comp.roundedgeclass = 'classicCommonCss';
  });

 
});
