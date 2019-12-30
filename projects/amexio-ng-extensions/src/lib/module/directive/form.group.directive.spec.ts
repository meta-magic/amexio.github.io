
import { Component, DebugElement, Renderer2,
  ViewContainerRef, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmexioFormGroupDirective } from './form.group.directive';

@Component({
  selector: 'form-group',
  template: `
  <div form-group></div>
  `
})

class TestFormGroupComponent {

}

describe('Directive: form-group', () => {
  let comp: TestFormGroupComponent;

  let fixture: ComponentFixture<TestFormGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AmexioFormGroupDirective,
        TestFormGroupComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [Renderer2, ViewContainerRef],
      imports: [],
    });
    fixture = TestBed.createComponent(TestFormGroupComponent);
    comp = fixture.componentInstance;
  });

  it('defined: directive created', () => {
    expect(comp).toBeTruthy();
  });

});
