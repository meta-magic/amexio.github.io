import { RoundEdgesDirective } from './round-edge.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewContainerRef, Component, DebugElement } from '@angular/core';
import { AmexioFormsModule } from '../../module/forms/amexio.forms.module';
import { By } from '@angular/platform-browser';

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
    it('should create component', () => {
        const debugEl: HTMLElement = fixture.debugElement.nativeElement;
        const p: HTMLElement = debugEl.querySelector('p');
    });

    it('setRoundEdge()', () => {
        expect(dirIn.themeStyle).toEqual('round-edge');
        console.log('_viewContainerRef *****************', dirIn._viewContainerRef['_data']);

        dirIn.hostComponent = dirIn._viewContainerRef['_data'].componentView.component;
        dirIn.hostComponent.setRoundEdge();
      });
   
});
