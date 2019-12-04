
import { Component, DebugElement, Renderer2,
  ViewContainerRef, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmexioTemplateWrapperDirective } from './carousel.wrapper.template.directive';

@Component({
  selector: 'amexioTemplateWrapper',
  template: `
  <ng-template tabindex="1" [amexioTemplateWrapper]="itemTemplate" 
  [item]="item"></ng-template>
  `
})

class TestTemplateComponent {

}

describe('Directive: amexioTemplateWrapper', () => {
  let comp: TestTemplateComponent;

  let fixture: ComponentFixture<TestTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AmexioTemplateWrapperDirective,
        TestTemplateComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [Renderer2, ViewContainerRef],
      imports: [],
    });
    fixture = TestBed.createComponent(TestTemplateComponent);
    comp = fixture.componentInstance;
  });

  it('defined: directive created', () => {
    expect(comp).toBeTruthy();
  });

  
});
