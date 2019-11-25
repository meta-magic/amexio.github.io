import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { IconLoaderService } from '../../../../public-api';
import { LifeCycleBaseComponent } from '../../base/lifecycle.base.component';
import { MinimizeService } from '../../services/minimize/minimize-service.service';
import { AmexioCardCEActionComponent } from '../common/amexio.action.component';
import { AmexioCardCEBodyComponent } from '../common/amexio.body.component';
import { AmexioCardCEHeaderComponent } from '../common/amexio.header.component';
import { AmexioCardCEComponent } from './amexio.cards.component';
@Component({
    selector: 'test-cmp',
    template: `
    <amexio-card-ce>
       <amexio-header-ce>
       </amexio-header-ce>
       </amexio-card-ce>
       `,
})
class TestCeWindowComponent { }
describe('amexio-card-ce', () => {
    let comp: AmexioCardCEComponent;
    let fixture: ComponentFixture<TestCeWindowComponent>;
    let obj: any;
    let miniservice: any;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [
                AmexioCardCEComponent,
                AmexioCardCEHeaderComponent,
                TestCeWindowComponent,
                AmexioCardCEComponent,
                AmexioCardCEActionComponent,
                AmexioCardCEBodyComponent,
            ],
            providers: [IconLoaderService, FormBuilder, MinimizeService],
        }).overrideModule(BrowserDynamicTestingModule, { set: { entryComponents: [] } }).compileComponents();
    }));
    beforeEach(() => {
        // service = TestBed.get(DeviceQueryService);
        fixture = TestBed.createComponent(TestCeWindowComponent);
        comp = fixture.debugElement.children[0].componentInstance;
        event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);
        fixture.detectChanges();
        comp.yesFullScreen = true;
        miniservice = TestBed.get(MinimizeService);
        obj = {
            tempEvent: { isTrusted: true, screenX: 1301, screenY: 224, clientX: 1371, clientY: 138 },
            tempThis: { document, jstyfy: 'space-between', background: '', color: '', fullscreenMaxCard: true },
        };

        comp.amexioCardHeaderList[0].maximizeWindow1.next(obj);
    });

    // it('variable check', () => {
    //     comp.maximizeflagchanged = false;
    //     comp.amexioComponentId = 'amexio-card-ce';

    //     comp.slidereffecton = false;
    //     comp.ishover = false;

    // });

    // it('ngAfterContentInit  method check', () => {
    //     fixture.detectChanges();
    //     comp.ngAfterContentInit();

    //     expect(comp.AmexioCardCEHeaderQueryList).toBeDefined();
    //     comp.amexioCardHeaderList = comp.AmexioCardCEHeaderQueryList.toArray();
    //     expect(comp.amexioCardHeaderList).toBeDefined()
    //     expect(comp.amexioCardHeaderList.length).toBeGreaterThan(0)
    //     comp.amexioCardHeaderList.forEach((element: any) => {
    //         element.ribbonType = false;
    //         element.amexioComponentId = comp.amexioComponentId;
    //         element.fullScreenFlag = comp.yesFullScreen;
    //         element.desktopFlag = comp.desktopFlag;
    //         element.fullscreenMax = true;
    //     });

    //     expect(comp.yesFullScreen).toEqual(true);
    //     fixture.detectChanges();
    //     comp.amexioCardHeaderList[0].maximizeWindow1.subscribe((obj: any) => {
    //         fixture.detectChanges();
    //         comp.maximizeflagchanged = comp.maxScreenChange(obj.tempEvent);
    //         obj.tempThis.fullscreenMaxCard = !comp.maximizeflagchanged;
    //     });
    //     comp.AmexioCardCEHeaderQueryList.toArray()[0].minimizeWindow1.subscribe((obj: any) => {
    //         comp.headerinst = obj.tempThis;
    //         comp.maximizeflagchanged = comp.minScreenChange(obj.tempEvent);
    //         obj.tempThis.fullscreenMaxCard = !comp.maximizeflagchanged;
    //     });
    // });

    // it('variable check', () => {
    //   comp.ngOnInit();
    //   comp.instance = this;

    // });

    // it('exitHandler', () => {
    //     comp.exitHandler();
    //     comp.fullscreenMax = false;
    //     expect(document['webkitIsFullScreen']).toBeDefined();
    //     expect(comp.fullscreenMax).toBeFalsy();
    // })
});
