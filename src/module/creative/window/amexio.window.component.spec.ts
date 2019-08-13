import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { IconLoaderService } from '../../../index';
import { MinimizeService } from '../../panes/window/minimize-service.service';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { AmexioWindowCEComponent } from './amexio.window.component';
import { AmexioCardCEHeaderComponent } from '../common/amexio.header.component';
import { CeMinimizeWindowComponent } from './ceMinimize.window.component';
import { LifeCycleBaseComponent } from '../../base/lifecycle.base.component';
import { AmexioCardCEActionComponent } from '../common/amexio.action.component';
import { AmexioCardCEBodyComponent } from '../common/amexio.body.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
@Component({
    selector: 'test-cmp',
    template: `
    <amexio-window-ce >
       <amexio-header-ce>
       </amexio-header-ce>
       </amexio-window-ce>
       
       `,
})
class TestWindowComponent { }
describe('amexio-window-ce', () => {
    let comp: AmexioWindowCEComponent;
    let fixture: ComponentFixture<TestWindowComponent>;
    let miniservice:any;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [
                AmexioWindowCEComponent,
                AmexioCardCEHeaderComponent,
                TestWindowComponent,
                CeMinimizeWindowComponent,
                LifeCycleBaseComponent,
                AmexioCardCEActionComponent,
                AmexioCardCEBodyComponent
            ],
            providers: [IconLoaderService, FormBuilder,MinimizeService],
        }).overrideModule(BrowserDynamicTestingModule, { set: { entryComponents: [CeMinimizeWindowComponent] } }).compileComponents();
    }));
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
        comp.minArea = 20000;
        comp.draggingWindow = false;
        expect(comp.x).toEqual(0);
        expect(comp.y).toEqual(0);
        expect(comp.px).toEqual(0);
        expect(comp.py).toEqual(0);
        expect(comp.minArea).toEqual(20000);
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
            expect(miniservice.onMinimizeClick(event)).toHaveBeenCalled();
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
  
});
