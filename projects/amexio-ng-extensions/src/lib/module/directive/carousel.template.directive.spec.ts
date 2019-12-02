
import { Component, DebugElement, Renderer2,
  ViewContainerRef, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AmexioTemplateDirective } from './carousel.template.directive';

/**
* Created by Manisha on 15/10/19.
*/
// Simple test component that will not in the actual app
@Component({
  selector: 'amexio-dynamic-text',
  template: `
  <ng-template let-img amexioTemplate="item">
  </ng-template>
  `
})

class TestTemplateComponent {

}

describe('Directive: amexioTemplate', () => {
  let comp: TestTemplateComponent;

  let fixture: ComponentFixture<TestTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AmexioTemplateDirective,
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
