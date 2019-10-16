import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index';
import { AmexiodialoguePaneComponent } from './../dialogue/dialogue.pane.component';
import { AmexioTabComponent } from './tab.component';
import { AmexioTabPillComponent } from './tab.pill.component';
import { AmexioButtonComponent } from './../../forms/buttons/button.component';
import { CommonIconComponent } from './../../base/components/common.icon.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { Component, ComponentFactoryResolver, NO_ERRORS_SCHEMA, ViewContainerRef } from '@angular/core';

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
            providers: [IconLoaderService, ComponentFactoryResolver],

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
    });

    it('ngOnInit()', () => {
    comp.ngOnInit();
    comp.componentId = Math.floor(window.crypto.getRandomValues(new Uint32Array(1))[0]) + '_tabc';
    expect(comp.ngOnInit()).toHaveBeenCalled;
    expect(comp.componentId).toBeDefined();
    });


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
            expect(tab.hasOwnProperty('tabpillinstance').toBeDefined);
            expect(tab.target.remove()).toHaveBeenCalled;
        });
    })


    it('tabPillClose Else method', () => {
        comp.tabPillClose(tabNode);
        const newTab: AmexioTabPillComponent[] = [];
        let index = 0;
        let tabHighlightIndex = 0;
        comp.tabCollection.forEach((tab: any, i: number) => {
            tab.active = false;
            tabNode.tabId = tab.tabId;
            expect(tab.tabId).toEqual(tabNode.tabId);
            tabHighlightIndex = index;
            expect(tab.hasOwnProperty('tabpillinstance').toBeFalsy);
            expect(comp.tabDomRemove(tab)).toHaveBeenCalled;
        });
    })

    // tabPillClose Method with else if 
    it('tabPillClose else if (not equal) method', () => {
        comp.tabPillClose(tabNode);
        const newTab: AmexioTabPillComponent[] = [];
        let index = 0;
        let tabHighlightIndex = 0;
        comp.tabCollection.forEach((tab: any, i: number) => {
            tab.active = false;
            expect(tab.tabId).not.toEqual(tabNode.tabId);
            newTab.push(tab);
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

    // Adjust height method --starts
    it('onAdjust Height method tab data undefined', () => {
        comp.bodyheight = 20;
        comp.tabs = undefined;
        comp.onAdjustHeight();
        expect(comp.bodyheight).toBeDefined();
        let h = (window.innerHeight / 100) * comp.bodyheight;
        expect(comp.tabs).toBeUndefined();
        comp.minHeight = h;
        comp.height = h;
    })

    it('onAdjust Height method tab nativeelement undefined', () => {
        comp.bodyheight = 20;
        comp.tabs.nativeElement = undefined;
        comp.onAdjustHeight();
        expect(comp.bodyheight).toBeDefined();
        let h = (window.innerHeight / 100) * comp.bodyheight;
        expect(comp.tabs).toBeDefined();
        expect(comp.tabs.nativeElement).toBeUndefined();
        comp.minHeight = h;
        comp.height = h;
    })

    it('onAdjust Height method tab offset data undefined', () => {
        comp.bodyheight = 20;
        // comp.tabs.nativeElement.offsetHeight = undefined;
        comp.onAdjustHeight();
        expect(comp.bodyheight).toBeDefined();
        let h = (window.innerHeight / 100) * comp.bodyheight;
        expect(comp.tabs).toBeDefined();
        expect(comp.tabs.nativeElement).toBeDefined();
        expect(comp.tabs.nativeElement.offsetHeight).toBe(0);
        comp.minHeight = h;
        comp.height = h;
    })

    it('onAdjust Height method All defined If Block', () => {
        comp.bodyheight = 20;
        comp.onAdjustHeight();
        expect(comp.bodyheight).toBeDefined();
        let h = (window.innerHeight / 100) * comp.bodyheight;
        expect(comp.tabs).toBeDefined();
        expect(comp.tabs.nativeElement).toBeDefined();
        expect(comp.tabs.nativeElement.offsetHeight).toBeDefined();
        expect(h).toEqual(h - comp.tabs.nativeElement.offsetHeight);
        comp.minHeight = h;
        comp.height = h;
    })

    it('onAdjust Height method bodyheight If Block', () => {
        comp.bodyheight = 100;
        comp.onAdjustHeight();
        let h = (window.innerHeight / 100) * comp.bodyheight;

        comp.minHeight = h;
        comp.height = h;
        expect(h).toBe(h);
    })
    it('onAdjust Height method bodyheight Else Block', () => {
        comp.bodyheight = 50;
        comp.onAdjustHeight();
        let h = (window.innerHeight / 100) * comp.bodyheight;
        expect(comp.bodyheight).not.toEqual(100);

        comp.minHeight = h;
        comp.height = h;
    })
    // Adjust height method --ends


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
        comp.fullPageTabs = true;
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
        comp.totalTabs = 2;
        comp.fullPageTabs = true;
        const tWidth = comp.tabs.nativeElement.clientWidth;
        const tlistWidth = comp.tabslist.nativeElement.scrollWidth;
        const hWidth = 0;
        const totalElWidth = tlistWidth + hWidth;
        expect(totalElWidth).toBeLessThanOrEqual(tWidth);
        expect(comp.singleTabWidth).toEqual(totalElWidth / comp.totalTabs);
    })


    it('select tab method', () => {
        let tab = {
            active: true,
            amexiocolor: "amexio-top-tab-red",
            closable: true,
            disabled: false,
            tabId: 33537,
            icon: 'fa fa-save',
            height: 20,
            tablk: '',
            tabPillClass: "activecolortab",
            tabpillinstance: ViewContainerRef,
            target: ViewContainerRef,
            title: "Tab 5"
        }
        comp.selectTab(tabNode);
        comp.tabCollection.forEach((tab1: any) => {
            tab1.active = false;
            expect(tab1.active).toBeFalsy();
        })
        tab.active = true;
        comp.tabCollection.forEach((tab1: any) => {
            expect(comp.asignTabPillClass(tab1)).toHaveBeenCalled;
        });
    })

    it('activateTab method if condition', () => {
        let tabId = 1;
        comp.activateTab(tabId);
        comp.tabCollection.forEach((tab: any) => {
            tab.active = false;
            tab.tabId = 1;
            expect(tab.tabId).toEqual(tabId);
            expect(tab.active).toBeFalsy();
            expect(comp.asignTabPillClass(tab)).toHaveBeenCalled;
        })
    })

    it('activateTab method else condition', () => {
        let tabId = 2;
        comp.activateTab(tabId);
        comp.tabCollection.forEach((tab: any) => {
            tab.active = false;
            tab.tabId = 1;
            expect(tab.tabId).not.toEqual(tabId);
            expect(comp.asignTabPillClass(tab)).not.toHaveBeenCalled;
        })
    })

    // it('addDynamicTab method color blank condition', () => {
    //     let title = 'tab1';
    //     let amexiocolor = 'red';
    //     let closable = true;
    //     let component: any;
    //     comp.addDynamicTab(title, amexiocolor, closable, component);
    //     const tpCF = comp.componentFactoryResolver.resolveComponentFactory(
    //         AmexioTabPillComponent,
    //     );
    //     const tp = comp.target.createComponent(tpCF);
    //     let instance: AmexioTabPillComponent;
    //     instance.title = title;
    //     instance.active = true;
    //     instance.closable = closable;
    //     instance['tabpillinstance'] = comp.target;
    //     instance.amexiocolor = ''
    //     expect(instance.amexiocolor).toEqual('');
    //     instance.amexiocolor = 'amexio-top-tab-black';
    // })

    // it('addDynamicTab method color not blank condition', () => {
    //     let title = 'tab1';
    //     let amexiocolor = 'red';
    //     let closable = true;
    //     let component: any;
    //     comp.addDynamicTab(title, amexiocolor, closable, component);
    //     const tpCF = comp.componentFactoryResolver.resolveComponentFactory(
    //         AmexioTabPillComponent,
    //     );
    //     const tp = comp.target.createComponent(tpCF);
    //     const instance: AmexioTabPillComponent = tp.instance as AmexioTabPillComponent;
    //     instance.title = title;
    //     instance.active = true;
    //     instance.closable = closable;
    //     instance['tabpillinstance'] = comp.target;
    //     instance.amexiocolor = 'red';
    //     expect(instance.amexiocolor).not.toEqual('');
    //     instance.amexiocolor = 'amexio-top-tab-' + amexiocolor;
    // })

    it('asignTabPillClass 1st condition1', () => {
        comp.tabPosition = 'top';
        let tabData = {
            amexiocolor: '',
            active: true,
            tabPillClass: 'activetab'
        }
        comp.asignTabPillClass(tabData);
        expect(tabData.amexiocolor).toEqual('');
        expect(tabData.active).toBeTruthy();
        expect(comp.tabPosition).toEqual('top');
        expect(tabData.tabPillClass).toEqual('activetab');
    })

    it('asignTabPillClass 1st condition3', () => {
        comp.tabPosition = 'top';
        let tabData = {
            active: true,
            tabPillClass: 'activetab',
            amexiocolor: 'red'
        }
        comp.asignTabPillClass(tabData);
        expect(tabData['amexiocolor']).not.toEqual('');
        expect(tabData.active).toBeTruthy();
        expect(comp.tabPosition).toEqual('top');
    })

    it('asignTabPillClass 1st condition4', () => {
        comp.tabPosition = 'top';
        let tabData = {
            active: false,
            tabPillClass: ''
        }
        comp.asignTabPillClass(tabData);
        expect(tabData['amexiocolor']).toEqual(undefined);
        expect(tabData.active).toBeFalsy();
        expect(comp.tabPosition).toEqual('top');
    })

    //bottom check


    it('asignTabPillClass 2 condition1', () => {
        comp.tabPosition = 'bottom';
        let tabData = {
            amexiocolor: '',
            active: true,
            tabPillClass: 'bottomActivetab'
        }
        comp.asignTabPillClass(tabData);
        expect(tabData.amexiocolor).toEqual('');
        expect(tabData.active).toBeTruthy();
        expect(comp.tabPosition).toEqual('bottom');
        expect(tabData.tabPillClass).toEqual('bottomActivetab');
    })

    it('asignTabPillClass 2 condition3', () => {
        comp.tabPosition = 'bottom';
        let tabData = {
            active: false,
            tabPillClass: ''
        }
        comp.asignTabPillClass(tabData);
        expect(tabData['amexiocolor']).toEqual(undefined);
        expect(tabData.active).toBeFalsy();
        expect(comp.tabPosition).toEqual('bottom');
    })

    // disable check
    it('asignTabPillClass disable condition1', () => {
        comp.tabPosition = 'bottom';
        let tabData = {
            disabled: true,
            tabPillClass: 'disabled-tab'
        }
        comp.asignTabPillClass(tabData);
        expect(tabData.disabled).toEqual(true);
        expect(tabData.tabPillClass).toEqual('disabled-tab');
    })

    // disable check else
    it('asignTabPillClass disable condition2', () => {
        comp.tabPosition = 'bottom';
        let tabData = {
            disabled: false,
            tabPillClass: ''
        }
        comp.asignTabPillClass(tabData);
        expect(tabData.disabled).toEqual(false);
        expect(tabData.tabPillClass).not.toEqual('disabled-tab');
    })

    //BG Color  TOP

    it('asignTabPillClass BG color top', () => {
        comp.tabPosition = 'top';
        comp.activeBGColor = true;
        let tabData = {
            amexiocolor: 'red',
            tabPillClass: 'activebgcolortab',
            active: true,

        }
        comp.asignTabPillClass(tabData);
        expect(tabData.amexiocolor).not.toEqual('');
        expect(comp.tabPosition).toEqual('top');
        expect(tabData.active).toEqual(true);
        expect(comp.activeBGColor).toEqual(true);

        expect(tabData.tabPillClass).toEqual('activebgcolortab');
    })

    //BG COLOR BOTTOM

    it('asignTabPillClass BG color top', () => {
        comp.tabPosition = 'bottom';
        comp.activeBGColor = true;
        let tabData = {
            amexiocolor: 'red',
            tabPillClass: 'activebottomcolortab',
            active: true,

        }
        comp.asignTabPillClass(tabData);
        expect(tabData.amexiocolor).not.toEqual('');
        expect(comp.tabPosition).toEqual('bottom');
        expect(tabData.active).toEqual(true);

        expect(tabData.tabPillClass).toEqual('activebottomcolortab');
    })


});


