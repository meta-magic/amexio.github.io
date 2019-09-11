import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index';
import { AmexiodialoguePaneComponent } from './../dialogue/dialogue.pane.component';
import { AmexioTabComponent } from './tab.component';
import { AmexioTabPillComponent } from './tab.pill.component';
import {AmexioButtonComponent} from './../../forms/buttons/button.component';
import { CommonIconComponent } from './../../base/components/common.icon.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';

@Component({
    selector: 'test-cmp',
    template: `
    <amexio-tab-view>
    <amexio-tab>
    </amexio-tab>
    </amexio-tab-view>
       `,
})
class TestTabComponent { }
describe('amexio-tab', () => {
    let comp: AmexioTabComponent;
    let fixture: ComponentFixture<TestTabComponent>;
    let miniservice:any;
    beforeEach(() => {
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [
                AmexiodialoguePaneComponent,
                AmexioTabComponent,
                TestTabComponent,
                AmexioTabPillComponent,
                AmexioButtonComponent,
            ],
            providers: [IconLoaderService],
        }).overrideModule(BrowserDynamicTestingModule, { set: { entryComponents: [] } }).compileComponents();
    });
    beforeEach(() => {
        // service = TestBed.get(DeviceQueryService);
        fixture = TestBed.createComponent(TestTabComponent);
        comp = fixture.debugElement.children[0].componentInstance;
        event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);
        fixture.detectChanges();
    });


    it('onCloseClick  method check', () => {
        comp.openDialogue = true;
        comp.onCancelClick();
        comp.openDialogue = false;    });

        // it('onOkclick method', () => {
        //     comp.openDialogue = true;
        //     comp.tabPillClose(comp.tempTab);
        //     comp.openDialogue = false;
        // })

        it('tabPillClose method', () => {
            const newTab: AmexioTabPillComponent[] = [];
            let index = 0;
            let tabHighlightIndex = 0;
        })

});

