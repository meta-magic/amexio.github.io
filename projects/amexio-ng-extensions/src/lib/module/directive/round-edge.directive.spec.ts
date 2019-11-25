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

  <amexio-button amexioThemeStyle [theme-style]="'round-edge'" [label]="'Previous'" [type]="'theme-color'" (onClick)="previous()">
  </amexio-button>
  `
})
class RoundEdgesComponent {
}

describe('Directive: round-edge', () => {
    let comp: RoundEdgesComponent;
    let fixture: ComponentFixture<RoundEdgesComponent>;
    let inputEl: DebugElement;
    let dirIn: any;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [RoundEdgesDirective, RoundEdgesComponent],
            providers: [ ViewContainerRef],
            imports: [AmexioFormsModule],

        });
        fixture = TestBed.createComponent(RoundEdgesComponent);
        comp = fixture.componentInstance;
        const directiveEl = fixture.debugElement.query(By.directive(RoundEdgesDirective));
        expect(directiveEl).not.toBeNull();

        dirIn = directiveEl.injector.get(RoundEdgesDirective);
        inputEl = fixture.debugElement.query(By.css('input'));
        dirIn.themeStyle = 'round-edge';

    });
    xit('should create component', () => {
        const debugEl: HTMLElement = fixture.debugElement.nativeElement;
        const p: HTMLElement = debugEl.querySelector('p');
    });

    xit('onInit()', () => {
        dirIn.themeStyle = 'round-edge';
        dirIn.ngOnInit();
        expect(dirIn.themeStyle).toEqual('round-edge');
        // dirIn.hostComponent = dirIn._viewContainerRef['_data'].componentView.component;
        // dirIn.hostComponent.setRoundEdge();
      });

    xit('onInit()', () => {
        dirIn.themeStyle = 'round';
        dirIn.ngOnInit();
        expect(dirIn.themeStyle).not.toEqual('round-edge');
      });
});
