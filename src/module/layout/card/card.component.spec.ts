import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { IconLoaderService } from '../../../index';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { AmexioCardComponent } from './card.component';
import { AmexioHeaderComponent } from '../../panes/header/pane.action.header';
import { LifeCycleBaseComponent } from '../../base/lifecycle.base.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

@Component({
    selector: 'test-cmp',
    template: `
    <amexio-card>
       <amexio-header>
       </amexio-header>
       </amexio-card>
       
       `,
})
class TestCardComponent { }
describe('amexio-card-ce', () => {
    let comp: AmexioCardComponent;
    let fixture: ComponentFixture<TestCardComponent>;
    let miniservice: any;
    beforeEach(() => {
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [
                AmexioCardComponent,
                AmexioHeaderComponent,
                TestCardComponent,
                LifeCycleBaseComponent,
            ],
            providers: [IconLoaderService, FormBuilder],
        }).overrideModule(BrowserDynamicTestingModule, { set: { entryComponents: [] } }).compileComponents();
    });
    beforeEach(() => {
        // service = TestBed.get(DeviceQueryService);
        fixture = TestBed.createComponent(TestCardComponent);
        comp = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
        comp.yesFullScreen = true;
    });


    it('variable check', () => {
        comp.maximizeflagchanged = true;

    });


    it('ngAfterContentInit  method check', () => {
        fixture.detectChanges();
        comp.ngAfterContentInit();

        comp.headerComponentList = comp.amexioHeader.toArray();
        comp.headerComponentList.forEach((item: AmexioHeaderComponent, currentIndex) => {
            item.fullScreenFlag = comp.yesFullScreen;
            item.desktopFlag = comp.desktopFlag;
            item.fullscreenMax = true;
            item.aComponent = 'card';  
        })
    });

});
