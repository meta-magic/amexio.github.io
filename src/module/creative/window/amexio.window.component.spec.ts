import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { IconLoaderService } from '../../../index';
import { MinimizeService } from '../../standard/panes/window/minimize-service.service';
// import { LifeCycleBaseComponent } from '../../base/lifecycle.base.component';
import { AmexioCardCEActionComponent } from '../common/amexio.action.component';
import { AmexioCardCEBodyComponent } from '../common/amexio.body.component';
import { AmexioCardCEHeaderComponent } from '../common/amexio.header.component';
import { AmexioWindowCEComponent } from './amexio.window.component';
import { CeMinimizeWindowComponent } from './ceMinimize.window.component';
@Component({
    selector: 'test-cmp',
    template: `
    <amexio-window-ce >
       <amexio-header-ce>
       </amexio-header-ce>
       </amexio-window-ce>

       `,
})
class TestCeWindowComponent { }
describe('amexio-window-ce', () => {
    let comp: AmexioWindowCEComponent;
    let fixture: ComponentFixture<TestCeWindowComponent>;
    let miniservice: any;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [
                AmexioWindowCEComponent,
                AmexioCardCEHeaderComponent,
                TestCeWindowComponent,
                CeMinimizeWindowComponent,
                AmexioCardCEActionComponent,
                AmexioCardCEBodyComponent,
            ],
            providers: [IconLoaderService, FormBuilder, MinimizeService],
        }).overrideModule(BrowserDynamicTestingModule, { set: { entryComponents: [CeMinimizeWindowComponent] } }).compileComponents();
    }));
    beforeEach(() => {
        // service = TestBed.get(DeviceQueryService);
        fixture = TestBed.createComponent(TestCeWindowComponent);
        comp = fixture.debugElement.children[0].componentInstance;
        event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);
        fixture.detectChanges();
        miniservice = TestBed.get(MinimizeService);
    });

    // it('variable check', () => {
    //     comp.x = 0;
    //     comp.y = 0;
    //     comp.px = 0;
    //     comp.py = 0;
    //     comp.minArea = 20000;
    //     comp.draggingWindow = false;
    //     expect(comp.x).toEqual(0);
    //     expect(comp.y).toEqual(0);
    //     expect(comp.px).toEqual(0);
    //     expect(comp.py).toEqual(0);
    //     expect(comp.minArea).toEqual(20000);
    //     expect(comp.draggingWindow).toEqual(false);

    // });
    // it('onCloseClick  method check', () => {
    //     comp.onCloseClick();
    //     miniservice.minimizeFlag = false;
    // });

    // it('ngAfterContentInit  method check minimize  true condition', () => {

    //     fixture.detectChanges();
    //     comp.minimize = true;
    //     comp.ngAfterContentInit();
    //     expect(comp.amexioHeader).toBeDefined();
    //     expect(comp.amexioHeader.toArray().length).toBeGreaterThan(0);
    //     expect(comp.minimize).toEqual(true);
    //     comp.amexioHeader.toArray()[0].minimize = comp.minimize;
    //     comp.amexioHeader.toArray()[0].minimizeWindow.subscribe((event: any) => {
    //         comp.textName = event.textName;
    //         miniservice.onMinimizeClick(this);
    //     });
    // });
    // it('ngAfterContentInit  method check minimize false condition', () => {

    //     fixture.detectChanges();
    //     comp.minimize = false;
    //     comp.ngAfterContentInit();
    //     expect(comp.amexioHeader).toBeDefined();
    //     expect(comp.amexioHeader.toArray().length).toBeGreaterThan(0);
    //     expect(comp.minimize).toEqual(false);
    //     comp.amexioHeader.toArray()[0].closeDataEmit.subscribe((event: any) => {
    //         miniservice.onCloseClick(this);
    //     });
    // });
    // it('ngAfterContentInit  method check maximize check if', () => {

    //     fixture.detectChanges();
    //     comp.maximize = true;
    //     comp.ngAfterContentInit();
    //     expect(comp.amexioHeader).toBeDefined();
    //     expect(comp.amexioHeader.toArray().length).toBeGreaterThan(0);
    //     expect(comp.maximize).toEqual(true);
    //     comp.amexioHeader.toArray()[0].setMaximizeDataCE(comp.maximize, comp.isFullWindow);
    //     comp.amexioHeader.toArray()[0].maximizeBehaiourCe.subscribe((max: any) => {
    //         comp.maximumWindowStyle = comp.setMaximizeClass(max);
    //     });
    // });

    // it('ngAfterContentInit  method check maximize check else', () => {
    //     fixture.detectChanges();
    //     comp.maximize = false;
    //     comp.ngAfterContentInit();
    //     expect(comp.amexioHeader).toBeDefined();
    //     expect(comp.amexioHeader.toArray().length).toBeGreaterThan(0);
    //     expect(comp.maximize).toEqual(false);
    // });
});
