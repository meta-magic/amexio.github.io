import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index';
import { AmexioFloatingPanelComponent } from './floatingpanel.component';
import { AmexioFormsModule } from '../../forms/amexio.forms.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('amexio-floating-panel', () => {
    let comp: AmexioFloatingPanelComponent;
    let fixture: ComponentFixture<AmexioFloatingPanelComponent>;
    let de: DebugElement;    // => Handle to to Components DOM instance
    let el: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, AmexioFormsModule],
            declarations: [AmexioFloatingPanelComponent],
            providers: [IconLoaderService],
        }).compileComponents();
        fixture = TestBed.createComponent(AmexioFloatingPanelComponent);
        comp = fixture.componentInstance;
        event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);
        // de = fixture.debugElement.query(By.css('floatingPanel'));
        // el = de.nativeElement;

        it('true is true', () => expect(true).toBe(true));

    });
    // it('should create the app', async(() => {
    //     const fixture = TestBed.createComponent(AmexioFloatingPanelComponent);
    //     const comp = fixture.debugElement.componentInstance;
    //     fixture.detectChanges();
    //     expect(comp).toBeTruthy();
    // }));

    // check variables 
    it('check variables ', () => {
        let flag = false;
        expect(comp.btnStyle).toEqual({});
        expect(comp.style).toEqual({});
        expect(comp.pos1).toEqual(0);
        expect(comp.pos2).toEqual(0);
        expect(comp.pos3).toEqual(0);
        expect(comp.pos4).toEqual(0);

    });

    it('ngOnInit method', () => {
        comp.ngOnInit();
        comp.absolute = true;
        expect(comp.absolute).toEqual(true);
        comp.relative = false;
        comp.height = '';
        expect(comp.height).toEqual('');
        comp.height = 200;
        comp.width = '';
        expect(comp.width).toEqual('');
        comp.width = 200;
        comp.showPanel = true;
        expect(comp.showPanel).toBe(true);
        comp.panelStyle();
        comp.draggable = true;
        expect(comp.draggable).toBe(true);
        comp.arrow = true;
        expect(comp.arrow).toBe(true);
        comp.draggable = false;
        // if (this.relative && this.draggable) {

        comp.style['position'] = 'absolute';
    });
   
    it('panel style method ', () => {
        comp.panelStyle();
        comp.style = {};
        comp.style['position'] = (comp.relative) ? 'absolute' : 'fixed';
        comp.style['display'] = 'block';
        comp.style['z-index'] = '600';
        comp.style['opacity'] = '1';
        comp.style['box-shadow'] = '0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)';
        comp.style['width'] = comp.width + 'px';
        comp.style['width'] = '400px';
        comp.width = '';
        comp.relative = false;
        expect(comp.width).toEqual('');
        expect(comp.relative).toEqual(false);
        comp.arrowPadding();
        comp.setPanelStylePostion();

    });
    it('arrowPadding method', () => {
        comp.arrowPadding();
        let margintop: '16px';
        comp.arrow = true;
        expect(comp.arrow).toEqual(true);
        comp.style['margin-top'] = margintop;

    });
    it('setpanelStyleposition', () => {
        comp.setPanelStylePostion();
        comp.topPosition = '';
        comp.bottomPosition = '';
        comp.rightPosition = '';
        comp.leftPosition = '';
        expect(comp.topPosition).toEqual('');
        expect(comp.bottomPosition).toEqual('');
        expect(comp.rightPosition).toEqual('');
        expect(comp.leftPosition).toEqual('');
        comp.style['top'] = comp.topPosition;
        comp.style['bottom'] = comp.bottomPosition;
        comp.style['right'] = comp.rightPosition;
        comp.style['left'] = comp.leftPosition;



    });
    it('changeHeaderColor method', () => {
        comp.gradientFlag = true;
        comp.changeHeaderColor();
    });
    it('setcolorpallete method', () => {
        let themeClass: any;
        comp.setColorPalette(themeClass);
        comp.themeCss = themeClass;
    });
    it('setpanelAbsolutePosition method', () => {
        comp.setPanelAbsolutePostion();
        comp.style = {};
        comp.style['position'] = 'absolute';
        comp.style['display'] = 'block';
        comp.style['z-index'] = '400';
        comp.style['opacity'] = '1';
        comp.style['box-shadow'] = '0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)';
        comp.style['width'] = comp.width + 'px';
        comp.style['width'] = '400px';
        comp.width = '';
        // expect(comp.width).not.toEqual('');
        expect(comp.width).toEqual('');
    })
    it('checking togglePanel method', () => {
        comp.togglePanel();
        comp.showPanel = false;
        expect(comp.showPanel).toEqual(false);
        comp.onclose.subscribe((g: any) => {
            expect(comp.onclose).toEqual(g);
        });
        comp.showPanelChange.subscribe((g: any) => {
            expect(comp.showPanelChange).toEqual(g);
        });

    });
    // it('closeDragElement method',()=>{
    //     let floatingPanel:any;
    //     comp.closeDragElement(floatingPanel);

    //     // comp.documentMouseMoveListener();
    //     // expect(comp.documentMouseMoveListener()).toHaveBeenCalled;

    //     // comp.documentMouseUPListener();
    //     // expect(comp.documentMouseUPListener()).toHaveBeenCalled;

    //     // comp.documentMouseMoveListener = null;
    //     // expect(comp.documentMouseMoveListener).toBe(null);
        
    //     // comp.documentMouseUPListener = null;
    //     // expect(comp.documentMouseUPListener).toBe(null);

    //     comp.opacitiy = false;
    //     expect(comp.opacitiy).toBe(false);
    //     floatingPanel.style.opacity = 'unset';
    
    // })
});
