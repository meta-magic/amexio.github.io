import { style } from '@angular/animations';
import { Component, DebugElement, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { notDeepEqual } from 'assert';
import { AmexioFormsModule } from '../standard/forms/amexio.forms.module';
import { RoundEdgesDirective } from './round-edge.directive';

// Simple test component that will not in the actual app
@Component({
    selector: 'round-edge-directive',
    template: `

  <amexio-button amexioThemeStyle [theme-style]="'round-edge'" 
    [label]="'Previous'"
    [type]="'theme-color'"
    (onClick)="previous()">
  </amexio-button>
  `
})
class TestRoundEdgesComponent {
}

@Component({
  selector: 'classic-directive',
  template: `

<amexio-button amexioThemeStyle [theme-style]="'classic'"
  [label]="'Previous'"
  [type]="'theme-color'"
  (onClick)="previous()">
</amexio-button>
`
})
class TestClassicComponent {
}

describe('Directive: round-edge', () => {
    let comp: TestRoundEdgesComponent;
    let fixture: ComponentFixture<TestRoundEdgesComponent>;
    let inputEl: any;
    let dirIn: any;
    let directiveEl: any;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [RoundEdgesDirective, 
              TestRoundEdgesComponent,
              TestClassicComponent],
            providers: [ ViewContainerRef],
            imports: [AmexioFormsModule],
        });
    });

    it('defined: directive created',()=>{

      expect(TestBed.createComponent(TestRoundEdgesComponent)).toBeTruthy();
    });

    it('apply theme-style classic' ,()=>{

      fixture = TestBed.createComponent(TestClassicComponent);
      comp = fixture.componentInstance;
      directiveEl = fixture.debugElement.query(By.directive(RoundEdgesDirective));
      inputEl = fixture.debugElement.query(By.css('button'));
      dirIn = directiveEl.injector.get(RoundEdgesDirective);
      dirIn.themeStyle = 'classic';

      fixture.detectChanges();

      expect(dirIn.themeStyle).toContain('classic');
     // expect(inputEl.classes.roundEdgeCommonCss).toBeTruthy();
    });

    it('apply theme-style round-edge',()=>{
      fixture = TestBed.createComponent(TestRoundEdgesComponent);
      comp = fixture.componentInstance;
      directiveEl = fixture.debugElement.query(By.directive(RoundEdgesDirective));
      inputEl = fixture.debugElement.query(By.css('button'));
      dirIn = directiveEl.injector.get(RoundEdgesDirective);
      dirIn.themeStyle = 'round-edge';

      fixture.detectChanges();

      expect(dirIn.themeStyle).toContain('round-edge');
      expect(inputEl.classes.roundEdgeCommonCss).toBeTruthy();
    });

});
