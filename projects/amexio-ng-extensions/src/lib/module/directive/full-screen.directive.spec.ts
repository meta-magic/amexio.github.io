
import { AmexioPaneModule } from './../standard/panes/amexio.pane.module';
import { AmexioFullScreenDirective } from './full-screen.directive';
import { ViewContainerRef, Component, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AmexioFormsModule } from '../standard/forms/amexio.forms.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AmexioMediaModule } from '../standard/media/amexio.media.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Simple test component that will not in the actual app
@Component({
    selector: 'full-screen-type',
    template: `

    <amexio-panel amexioFullScreen [full-screen-type]="'desktop'" [fit]="false" [border]="true" [header]="true" title="Custom Header"
        [expanded]="true">
        <amexio-panel-header>        </amexio-panel-header>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
        text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
        It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
    </amexio-panel>
  `
})
class TestFullScreenComponent {
}

describe('Directive: full-screen-type', () => {
    let comp: TestFullScreenComponent;
    let fixture: ComponentFixture<TestFullScreenComponent>;
    let inputEl: any;
    let dirIn: any;
    let directiveEl: any;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AmexioFullScreenDirective,
                TestFullScreenComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [ViewContainerRef],
            imports: [AmexioPaneModule,BrowserAnimationsModule],

        });
        fixture = TestBed.createComponent(TestFullScreenComponent);
        comp = fixture.componentInstance;
        directiveEl = fixture.debugElement.query(By.directive(AmexioFullScreenDirective));
        inputEl = fixture.debugElement.query(By.css('amexio-panel'));
        dirIn = directiveEl.injector.get(AmexioFullScreenDirective);
    });

    it('defined: directive created', () => {
        fixture.detectChanges();

        expect(directiveEl).toBeTruthy();
    });

    it('apply full-screen', () => {
        dirIn.fullScreenType = 'browser';

        fixture.detectChanges();

        expect(inputEl.nativeElement.attributes.amexiofullscreen).toBeTruthy();
    });
});
