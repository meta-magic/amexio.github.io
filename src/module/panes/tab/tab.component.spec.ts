import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index';
import { AmexiodialoguePaneComponent } from './../dialogue/dialogue.pane.component';
import { AmexioTabComponent } from './tab.component';
import { AmexioTabPillComponent } from './tab.pill.component';
import { AmexioButtonComponent } from './../../forms/buttons/button.component';
import { CommonIconComponent } from './../../base/components/common.icon.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { Component, ComponentFactoryResolver, NO_ERRORS_SCHEMA } from '@angular/core';

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
    let tabNode: any;

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
            providers: [ComponentFactoryResolver, IconLoaderService],
        }).overrideModule(BrowserDynamicTestingModule, { set: { entryComponents: [AmexioTabPillComponent] } }).compileComponents();
    });
    beforeEach(() => {
        // service = TestBed.get(DeviceQueryService);
        fixture = TestBed.createComponent(TestTabComponent);
        comp = fixture.debugElement.children[0].componentInstance;
        event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);
        fixture.detectChanges();
        tabNode = AmexioTabPillComponent;
    });


    it('onCloseClick  method check', () => {
        comp.openDialogue = true;
        comp.onCancelClick();
        comp.openDialogue = false;
    });

    it('onCancelClick method', () => {
        comp.onCancelClick();
        comp.openDialogue = false;
    })


    it('closeTab method if condition', () => {
        fixture.detectChanges();
        comp.enableConfirmBox = true;
        comp.tabPillClose(tabNode);
        expect(comp.enableConfirmBox).toEqual(true);
        comp.openDialogue = true;
        comp.tempTab = tabNode;
        comp.onCloseClick.subscribe((g: any) => {
            expect(tabNode).toEqual(g);
        });

    });
    it('closeTab method second if condition', () => {
        fixture.detectChanges();
        comp.enableConfirmBox = false;
        comp.tabPillClose(tabNode);
        expect(comp.enableConfirmBox).toEqual(false);
        comp.tabPillClose(tabNode);
        comp.onCloseClick.subscribe((g: any) => {
            expect(tabNode).toEqual(g);
        });
    });
    it('Close Tab method Call', () => {
        comp.openDialogue = true;
        comp.enableConfirmBox = true;
        tabNode = AmexioTabPillComponent;
        comp.closeTab(tabNode)
        expect(comp.enableConfirmBox).toBe(true);
        expect(comp.openDialogue).toBeTruthy();
        comp.tempTab = tabNode;
        comp.onCloseClick.subscribe((g: any) => {
            expect(tabNode).toEqual(g);
        });
    });

    it('Close Tab Else method Call', () => {
        comp.closeTab(tabNode)
        comp.enableConfirmBox = false;
        comp.tabPillClose(tabNode);
        comp.onCloseClick.emit(tabNode);
    });
    it('tabPillClose method', () => {
        comp.tabPillClose(tabNode);
        const newTab: AmexioTabPillComponent[] = [];
        let index = 0;
        let tabHighlightIndex = 0;
        comp.tabCollection.forEach((tab: any, i: number) => {
            tab.active = false;
            tabNode.tabId = tab.tabId;
            expect(tab.tabId).toEqual(tabNode.tabId);
            tabHighlightIndex = index;

        });
    })
    it('Ok method Call', () => {
        comp.tabCollection.forEach((tab: any, i: number) => {
            comp.tempTab = tab;
        })
        comp.onOkClick();
        comp.tabPillClose(comp.tempTab);
        comp.openDialogue = false;
    });

    it('calls in constructor', () => {
        TestBed.createComponent(AmexioTabComponent);
    })

    it('onAdjust Height method If Block', () => {
        comp.bodyheight = undefined;
        comp.onAdjustHeight();
        expect(comp.bodyheight).toBeUndefined();
    })

    it('onAdjust Height method If Block', () => {
        comp.bodyheight = 20;
        comp.onAdjustHeight();
        expect(comp.bodyheight).toBeDefined();
        let h = (window.innerHeight / 100) * comp.bodyheight;
        expect(comp.tabs).toBeDefined();
        expect(comp.tabs.nativeElement).toBeDefined();
        expect(comp.tabs.nativeElement.offsetHeight).toBeDefined();
        expect(h).toBe(h - comp.tabs.nativeElement.offsetHeight);
        comp.minHeight = h;
        comp.height = h;

    })

    it('onAdjust Height method tab data undefined', () => {
        comp.bodyheight = 20;
        // comp.tabs.nativeElement.offsetHeight = undefined;
        // comp.tabs.nativeElement = undefined;
        comp.tabs = undefined;
        comp.onAdjustHeight();
        expect(comp.bodyheight).toBeDefined();
        let h = (window.innerHeight / 100) * comp.bodyheight;
        expect(comp.tabs).toBeUndefined();
        // expect(comp.tabs.nativeElement).toBeUndefined();
        // expect(comp.tabs.nativeElement.offsetHeight).toBeUndefined();
        comp.minHeight = h;
        comp.height = h;

    })

    it('onAdjust Height method bodyheight If Block', () => {
        comp.onAdjustHeight();
        comp.bodyheight = 100;
        let h = (window.innerHeight / 100) * comp.bodyheight;

        comp.minHeight = h;
        comp.height = h;
        expect(h).toBe(h);
    })
    it('onAdjust Height method bodyheight Else Block', () => {
        comp.onAdjustHeight();

        comp.bodyheight = 50;
        let h = (window.innerHeight / 100) * comp.bodyheight;
        expect(comp.bodyheight).not.toEqual(100);

        comp.minHeight = h;
        comp.height = h;
    })

    it('On Adjust Width If Method', () => {
        comp.adjustWidth();
        const tWidth = comp.tabs.nativeElement.clientWidth;
        const tlistWidth = comp.tabslist.nativeElement.scrollWidth;
        const hWidth = 1;
        const totalElWidth = tlistWidth + hWidth;
        expect(totalElWidth).toBeGreaterThan(tWidth);
        expect(comp.shownext).toBeFalsy();
        spyOn(comp, 'onAdjustHeight').and.callThrough();
    })

    it('On Adjust Width Else Method', () => {
        comp.adjustWidth();
        const tWidth = comp.tabs.nativeElement.clientWidth;
        const tlistWidth = comp.tabslist.nativeElement.scrollWidth;
        const hWidth = 0;
        const totalElWidth = tlistWidth + hWidth;
        expect(totalElWidth).toBeLessThanOrEqual(tWidth);
        expect(comp.shownext).toBeFalsy();
        spyOn(comp, 'onAdjustHeight').and.callThrough();

    })

    it('On Adjust Width fullpage Else Method', () => {
        comp.fullPageTabs = false;
        comp.adjustWidth();
        expect(comp.fullPageTabs).toBeFalsy();
    })

    it('On Adjust Width fullpage If Method', () => {
        comp.fullPageTabs = true;
        comp.adjustWidth();
        const tWidth = comp.tabs.nativeElement.clientWidth;
        const tlistWidth = comp.tabslist.nativeElement.scrollWidth;
        const hWidth = 1;
        const totalElWidth = tlistWidth + hWidth;
        expect(totalElWidth).toBeGreaterThan(tWidth);
        expect(comp.shownext).toBeFalsy();
    })


    it('On Adjust Width fullpage If 2nd condition Method', () => {
        comp.totalTabs = 2;
        comp.fullPageTabs = true;
        comp.adjustWidth();
        const tWidth = comp.tabs.nativeElement.clientWidth;
        const tlistWidth = comp.tabslist.nativeElement.scrollWidth;
        const hWidth = 0;
        const totalElWidth = tlistWidth + hWidth;
        expect(totalElWidth).toBeLessThanOrEqual(tWidth);
        expect(comp.singleTabWidth).toEqual(totalElWidth / comp.totalTabs);
    })
});



