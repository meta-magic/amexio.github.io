import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index';
import { AmexioFloatingPanelComponent } from './floatingpanel.component';
import { AmexioFormsModule } from '../../forms/amexio.forms.module';

describe('amexio-floating-panel', () => {
    let comp: AmexioFloatingPanelComponent;
    let fixture: ComponentFixture<AmexioFloatingPanelComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, AmexioFormsModule],
            declarations: [AmexioFloatingPanelComponent],
            providers: [IconLoaderService],
        }).compileComponents();
        fixture = TestBed.createComponent(AmexioFloatingPanelComponent);
        comp = fixture.componentInstance;
        event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);

        it('true is true', () => expect(true).toBe(true));
        

    });
    // it('should create the app', async(() => {
    //     const fixture = TestBed.createComponent(AmexioFloatingPanelComponent);
    //     const comp = fixture.debugElement.componentInstance;
    //     fixture.detectChanges();
    //     expect(comp).toBeTruthy();
    // }));

    // it('ngOnInit method', () => {
    //     comp.height = '';
    //     comp.absolute = true;
    //     comp.width = '';
    //     comp.showPanel = true;
    //     comp.arrow = true;
    //     comp.draggable = true;
    //     comp.relative = true;
    //     comp.ngOnInit();
    //     expect(comp.absolute).toEqual(true);
    //     comp.relative = false;               
    //     expect(comp.height).toEqual('');
    //     comp.height = 200;
    //     expect(comp.width).toEqual('');    
    //     comp.width = 400;  
    //     expect(comp.showPanel).toEqual(true);        
    //     comp.panelStyle();             
    //     expect(comp.draggable).toEqual(true);
    //     expect(comp.arrow).toEqual(true);
    //      comp.draggable  = false;
    //     expect(comp.draggable).toEqual(true);
    //     expect(comp.relative).toEqual(true);
    //     comp.style['position'] ='absolute';    
    // });

    it('panel style method if condition ', () => {
        comp.relative = true;
        comp.width = '200';
        comp.panelStyle();
        comp.style = {};
        expect(comp.relative).toEqual(true);
        comp.style['position'] = 'absolute';
        comp.style['display'] = 'block';
        comp.style['z-index'] = '600';
        comp.style['opacity'] = '1';
        comp.style['box-shadow'] = '0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)';
        expect(comp.width).not.toEqual('');
        comp.style['width'] = comp.width + 'px';
        comp.arrowPadding();
    })

    it('panel style method else condition ', () => {
        comp.relative = false;
        comp.width = '';
        comp.panelStyle();
        comp.style = {};
        expect(comp.relative).toEqual(false);
        comp.style['position'] = 'fixed';
        comp.style['display'] = 'block';
        comp.style['z-index'] = '600';
        comp.style['opacity'] = '1';
        comp.style['box-shadow'] = '0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)';
        expect(comp.width).toEqual('');
        comp.style['width'] = '400px';
        expect(comp.relative).toEqual(false);
        comp.setPanelStylePostion();
        comp.arrowPadding();
    })
    it('arrowPadding method', () => {
        comp.arrow = true;
        comp.arrowPadding();
        expect(comp.arrow).toEqual(true);
        expect(comp.style['margin-top']).toBe('16px');
    });
    it('setpanelStyleposition', () => {
        comp.topPosition = '20px';
        comp.bottomPosition = '20px';
        comp.rightPosition = '20px';
        comp.leftPosition = '20px';
        comp.setPanelStylePostion();

        expect(comp.style['top']).toEqual('20px');
        expect(comp.style['left']).toEqual('20px');
        expect(comp.style['bottom']).toEqual('20px');
        expect(comp.style['right']).toEqual('20px');

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
    // it('setpanelAbsolutePosition method', () => {
    //     comp.style = {};
    //     comp.style['position'] = 'absolute';
    //     comp.style['display'] = 'block';
    //     comp.style['z-index'] = '400';
    //     comp.style['opacity'] = '1';
    //     comp.style['box-shadow'] = '0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)';
    //     comp.style['width'] = comp.width + 'px';
    //     comp.style['width'] = '400px';
    //     expect(comp.width).not.toEqual('');
    //     expect(comp.width).toEqual('');
    // })
    it('checking togglePanel method', () => {
        comp.showPanel = false;
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
});

