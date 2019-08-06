import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule, FormBuilder } from '@angular/forms';
import { IconLoaderService } from '../../../index';

import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { AmexioWindowCEComponent } from './amexio.window.component';
import { AmexioCardCEHeaderComponent } from '../common/amexio.header.component';

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

    // let queryitem: AmexioCardCEHeaderComponent;
    // let fixture2: ComponentFixture<AmexioCardCEHeaderComponent>
    // let de: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [
                AmexioWindowCEComponent,
                AmexioCardCEHeaderComponent,
                TestWindowComponent
            ],
            providers: [IconLoaderService, FormBuilder],
        }).compileComponents();
    }));
    beforeEach(() => {
        // service = TestBed.get(DeviceQueryService);
        fixture = TestBed.createComponent(TestWindowComponent);
        comp = fixture.debugElement.children[0].componentInstance;
        event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);
        fixture.detectChanges();

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
        comp.minimizeFlag = false;
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
            expect(comp.onMinimizeClick(event)).toHaveBeenCalled();
        });
    });
    it('ngAfterContentInit  method check minimize false condition', () => {

        fixture.detectChanges();
        comp.minimize = false;
        comp.ngAfterContentInit();
        expect(comp.amexioHeader).toBeDefined();
        expect(comp.amexioHeader.toArray().length).toBeGreaterThan(0);
        expect(comp.minimize).toEqual(false);
    });
    it('onMinimizeClick  method check', () => {
        let name = comp.textName;
        comp.show = false;
        comp.minimizeFlag = true;
        comp.onMinimizeClick(name);
        comp.show = !comp.show;
        jasmine.createSpyObj('comp', ['minimizeBtnClick'])
        comp.minimizeBtnClick();

    });
    it('minimizeBtnClick  method check', () => {
        comp.minimizeBtnClick();
        comp.show = !comp.show;
    });
});
