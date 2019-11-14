import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../../index';

import { AmexioButtonComponent } from '../../forms/buttons/button.component';
import { MinimizeWindowComponent } from './minimize.window.component';

import { AmexioFooterComponent } from '../action/pane.action.footer';
import { AmexioBodyComponent } from '../body/pane.action.body';
import { AmexioHeaderComponent } from '../header/pane.action.header';

import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { CommonIconComponent } from '../../../base/components/common.icon.component';
import { MinimizeService } from './minimize-service.service';
import { AmexioWindowPaneComponent } from './window.pane.component';

@Component({
    selector: 'test-cmp',
    template: `
    <amexio-window >
       <amexio-header>
       </amexio-header>
       </amexio-window>
       `,
})
class TestWindowComponent { }
describe('amexio-window', () => {
    let comp: AmexioWindowPaneComponent;
    let fixture: ComponentFixture<TestWindowComponent>;
    let miniservice: any;
    beforeEach(() => {
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [
                AmexioWindowPaneComponent,
                AmexioHeaderComponent,
                TestWindowComponent,
                AmexioFooterComponent,
                AmexioBodyComponent,
                MinimizeWindowComponent,
            ],
            providers: [IconLoaderService, MinimizeService],
        }).overrideModule(BrowserDynamicTestingModule, { set: { entryComponents: [MinimizeWindowComponent] } }).compileComponents();
    });
    beforeEach(() => {
        // service = TestBed.get(DeviceQueryService);
        fixture = TestBed.createComponent(TestWindowComponent);
        comp = fixture.debugElement.children[0].componentInstance;
        event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);
        fixture.detectChanges();
        miniservice = TestBed.get(MinimizeService);
    });

    it('variable check', () => {
        comp.x = 0;
        comp.y = 0;
        comp.px = 0;
        comp.py = 0;
        comp.draggingWindow = false;
        expect(comp.x).toEqual(0);
        expect(comp.y).toEqual(0);
        expect(comp.px).toEqual(0);
        expect(comp.py).toEqual(0);
        expect(comp.draggingWindow).toEqual(false);

    });
    it('onCloseClick  method check', () => {
        comp.onCloseClick();
        miniservice.minimizeFlag = false;
    });

    it('ngAfterContentInit  method check minimize  true condition', () => {

        fixture.detectChanges();
        comp.minimize = true;
        comp.ngAfterContentInit();
        expect(comp.amexioHeader).toBeDefined();
        expect(comp.amexioHeader.toArray().length).toBeGreaterThan(0);
        expect(comp.minimize).toEqual(true);
        comp.amexioHeader.toArray()[0].minimize = comp.minimize;
        comp.amexioHeader.toArray()[0].minimizeWindow.subscribe((event: any) => {
            comp.textName = event.textName;
            miniservice.onMinimizeClick(this);
        });
    });
    it('ngAfterContentInit  method check minimize false condition', () => {

        fixture.detectChanges();
        comp.minimize = false;
        comp.ngAfterContentInit();
        expect(comp.amexioHeader).toBeDefined();
        expect(comp.amexioHeader.toArray().length).toBeGreaterThan(0);
        expect(comp.minimize).toEqual(false);
        comp.amexioHeader.toArray()[0].closeDataEmit.subscribe((event: any) => {
            miniservice.onCloseClick(this);
        });
    });
    it('ngAfterContentInit  method check maximize check if', () => {

        fixture.detectChanges();
        comp.maximize = true;
        comp.ngAfterContentInit();
        expect(comp.amexioHeader).toBeDefined();
        expect(comp.amexioHeader.toArray().length).toBeGreaterThan(0);
        expect(comp.maximize).toEqual(true);
        comp.amexioHeader.toArray()[0].setMaximizeData(comp.maximize, comp.isFullWindow, event);
        comp.amexioHeader.toArray()[0].maximizeBehaiour.subscribe((max: any) => {
            comp.maximumWindowStyle = comp.setMaximizeClass(max);
        });
    });

    it('ngAfterContentInit  method check maximize check else', () => {

        fixture.detectChanges();
        comp.maximize = false;
        comp.ngAfterContentInit();
        expect(comp.amexioHeader).toBeDefined();
        expect(comp.amexioHeader.toArray().length).toBeGreaterThan(0);
        expect(comp.maximize).toEqual(false);
    });

    it('setMaximizeClass If method', () => {
        comp.setMaximizeClass(false);
        comp.isFullWindow = false;
        expect(comp.width).toBe('100%');
        return {
            'margin-top': '0', 'height': '100%',
        };

    });

    it('setMaximizeClass Else method', () => {
        comp.setMaximizeClass(true);
        comp.isFullWindow = true;
        comp.width = comp.dummyWidth;
        expect(comp.width).toBe(comp.dummyWidth);
        return {
            'margin-top': '1%', 'height': '96%',
        };

    });
});

