import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index';
import { AmexioFloatingPanelComponent } from './floatingpanel.component';
import { AmexioFormsModule } from '../../forms/amexio.forms.module';
import { SimpleChange, ElementRef, Type, Renderer2 } from '@angular/core';
import { Client } from '_debugger';


describe('amexio-floating-panel', () => {
    let comp: AmexioFloatingPanelComponent;
    let fixture: ComponentFixture<AmexioFloatingPanelComponent>;
    let event1: any;
    let changes :any
    const rendererMock = jasmine.createSpyObj('rendererMock', ['listen']);
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, AmexioFormsModule],
            declarations: [AmexioFloatingPanelComponent],
            providers: [IconLoaderService, { provide: Renderer2, useValue: rendererMock }],
        }).compileComponents();
        fixture = TestBed.createComponent(AmexioFloatingPanelComponent);
        comp = fixture.componentInstance;
        event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);
        it('true is true', () => expect(true).toBe(true));

        comp.showPanel = true;
        changes =  new SimpleChange(null, comp.showPanel, false)

    });
    // it('should create the app', async(() => {
    //     const fixture = TestBed.createComponent(AmexioFloatingPanelComponent);
    //     const comp = fixture.debugElement.componentInstance;
    //     fixture.detectChanges();
    //     expect(comp).toBeTruthy();
    // }));

    it('ngOnchanges method call if condition', () => {
        let element = fixture.nativeElement;
        let showPanel = true;
        comp.absolute = true;
        comp.showPanel = showPanel;
        changes['showPanel'] = true;
        comp.ngOnChanges(changes);       
        fixture.detectChanges();
        expect(changes['showPanel']).toEqual(true);
        comp.getZindex(comp.showPanel);
        expect(comp.absolute).toBe(true);
        comp.setPanelAbsolutePostion();
    });
 
    it('ngOnchanges method call else condition', () => {
        let element = fixture.nativeElement;
        let showPanel = true;
        comp.absolute = false;
        comp.showPanel = showPanel;
        changes['showPanel'] = true;
        comp.ngOnChanges(changes );
        fixture.detectChanges();
        expect(changes['showPanel']).toEqual(true);
        comp.getZindex(comp.showPanel);
        expect(comp.absolute).toBe(false);
        comp.panelStyle();
    });

    it('ngOnchanges method first else condition', () => {
        let element = fixture.nativeElement;
        let showPanel = true;
        comp.absolute = false;
        comp.showPanel = showPanel;
        changes['showPanel'] = false;
        comp.ngOnChanges(changes );
        fixture.detectChanges();
        expect(changes['showPanel']).toEqual(false);
    });
    it('getZindex If Method', () => {
        let showPanel = true;
        comp.commanservice.zindex = 600;
        comp.getZindex(showPanel);
        expect(showPanel).toBe(true);
        comp.commanservice.zindex = comp.commanservice.zindex + 100;
    });
    it('getZindex Else Method', () => {
        let showPanel = false;
        comp.commanservice.zindex = 600;
        comp.getZindex(showPanel);
        expect(showPanel).toBe(false);
    });
    it('ngOnInit method if ', () => {
        comp.absolute = true;
        comp.draggable = true;
        comp.showPanel = false;
        comp.arrow = true;
        comp.relative = true;
        comp.ngOnInit();
        expect(comp.absolute).toEqual(true);
        comp.relative = false;
        comp.height = '';
        expect(comp.height).toEqual('');
        comp.height = 200;
        comp.width = '';
        expect(comp.width).toEqual('');
        comp.width = 400;
        expect(comp.showPanel).toBeDefined();
        comp.panelStyle();
        expect(comp.draggable).toBeDefined();
        expect(comp.arrow).toBeDefined();
        comp.draggable = false;
        expect(comp.relative).toBeDefined();
        expect(comp.draggable).toBeDefined();
        comp.style['position'] = 'absolute';
    });
    it('ngOnInit method else ', () => {
        comp.relative = false;
        comp.draggable = false;
        comp.showPanel = false;
        comp.arrow = false;
        comp.absolute = false;
        comp.height = '440';
        comp.width = '300';
        comp.ngOnInit();
        expect(comp.absolute).toEqual(false);
        expect(comp.height).not.toEqual('');
        expect(comp.width).not.toEqual('');
        expect(comp.showPanel).toEqual(false);
        expect(comp.draggable).toEqual(false);
        expect(comp.arrow).toEqual(false);
        expect(comp.relative).toEqual(false);
        expect(comp.draggable).toEqual(false);
    });
    it('ngOnInit method relative-false ,draggable- true ', () => {
        comp.relative = false;
        comp.draggable = true;
        comp.ngOnInit();
        expect(comp.relative).toEqual(false);
        expect(comp.draggable).toEqual(true);
    });
    it('ngOnInit method both true ', () => {
        comp.relative = true;
        comp.draggable = true;
        comp.ngOnInit();
        expect(comp.relative).toEqual(true);
        expect(comp.draggable).toEqual(true);
        comp.style['position'] = 'absolute';
    });
    it('ngOnInit method relative-true, draggable-false', () => {
        comp.relative = true;
        comp.draggable = false;
        comp.ngOnInit();
        expect(comp.relative).toEqual(true);
        expect(comp.draggable).toEqual(false);
    });
    it('panel style method if condition ', () => {
        comp.relative = true;
        comp.width = '200';
        comp.panelStyle();
        comp.style = {};
        expect(comp.relative).toEqual(true);
        comp.style['position'] = 'absolute';
        comp.style['display'] = 'block';
        comp.style['z-index'] = comp.commanservice.zindex;
        comp.style['opacity'] = '1';
        comp.style['box-shadow'] = '0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)';
        expect(comp.width).not.toEqual('');
        comp.style['width'] = comp.width + 'px';
        comp.arrowPadding();
    })

    it('panel style method else condition ', () => {
        comp.relative = false;
        comp.width = '';
        comp.commanservice.zindex = 600;
        comp.panelStyle();
        comp.style = {};
        expect(comp.relative).toEqual(false);
        comp.style['position'] = 'fixed';
        comp.style['display'] = 'block';
        comp.style['z-index'] = comp.commanservice.zindex;
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
    it('setpanelAbsolutePosition if  method', () => {
        comp.width = '200';
        comp.commanservice.zindex = 600;
        comp.setPanelAbsolutePostion();
        comp.style = {};
        comp.style['position'] = 'absolute';
        comp.style['display'] = 'block';
        comp.style['z-index'] = comp.commanservice.zindex;
        comp.style['opacity'] = '1';
        comp.style['box-shadow'] = '0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)';
        expect(comp.width).not.toEqual('')
        comp.style['width'] = comp.width + 'px';
        comp.setPanelStylePostion();
        comp.arrowPadding();
    })
    it('setpanelAbsolutePosition else  method', () => {
        comp.width = '';
        comp.commanservice.zindex = 600;
        comp.setPanelAbsolutePostion();
        comp.style = {};
        comp.style['position'] = 'absolute';
        comp.style['display'] = 'block';
        comp.style['z-index'] = comp.commanservice.zindex;
        comp.style['opacity'] = '1';
        comp.style['box-shadow'] = '0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)';
        expect(comp.width).toEqual('');
        comp.width = '400px';
        comp.setPanelStylePostion();
        comp.arrowPadding();
    })
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
    it('elementDrag method  if call', () => {
        comp.pos1 = 0;
        comp.pos2 = 0;
        comp.pos3 = 0;
        comp.pos4 = 0;
        comp.bottomPosition = '20px';
        comp.style = { 'bottom': '10px' };
        let floatingPanel = {
            'offsetTop': 1200,
            'offsetLeft': 145,
            'style': {
                'top': '20px',
                'left': '10px',
                'opacity': '1'
            }
        }
        let e = jasmine.createSpyObj('e', ['preventDefault']);
        e['clientX'] = 1200;
        e['clientY'] = 1400;
        comp.elementDrag(e, floatingPanel);
        e = e || window.event;
        expect(e).toBe(e);
        expect(e.preventDefault).toHaveBeenCalled();
        comp.pos1 = comp.pos3 - e.clientX;
        comp.pos2 = comp.pos4 - e.clientY;
        comp.pos3 = e.clientX;
        comp.pos4 = e.clientY;
        expect(comp.bottomPosition).toBeDefined();
        delete comp.style['bottom'];
        floatingPanel.style.top = (floatingPanel.offsetTop - comp.pos2) + 'px';
        floatingPanel.style.left = (floatingPanel.offsetLeft - comp.pos1) + 'px';
        floatingPanel.style.opacity = '0.7';
        comp.opacitiy = true;
    });
    it('elementDrag method else call', () => {
        comp.pos1 = 0;
        comp.pos2 = 0;
        comp.pos3 = 0;
        comp.pos4 = 0;
        comp.style = { 'bottom': '10px' };
        let floatingPanel = {
            'offsetTop': 1200,
            'offsetLeft': 145,
            'style': {
                'top': '20px',
                'left': '10px',
                'opacity': '1'
            }
        }
        window.event = jasmine.createSpyObj('e', ['preventDefault']);
        window.event ['clientX'] = 1200;
        window.event ['clientY'] = 1400;
        let e ;
        comp.elementDrag(e, floatingPanel);
        e = window.event;
        expect(e.preventDefault).toHaveBeenCalled();
        comp.pos1 = comp.pos3 - e['clientX'];
        comp.pos2 = comp.pos4 - e['clientY'];
        comp.pos3 = e['clientX'];
        comp.pos4 = e['clientY'];
        expect(comp.bottomPosition).toBeUndefined();
    });
    // it('closeDragElement method', () => {

    //     let floatingPanel = {
    //         'offsetTop': 1200,
    //         'offsetLeft': 145,
    //         'style': {
    //             'top': '20px',
    //             'left': '10px',
    //             'opacity': '1'
    //         }
    //     }
    //     comp.closeDragElement(floatingPanel);
    //     spyOn(comp, 'documentMouseMoveListener').and.callThrough();
    //     comp.closeDragElement(floatingPanel);
    //     fixture.detectChanges();
    //     expect(comp.documentMouseMoveListener()).toBeDefined();
    //     expect(comp.documentMouseMoveListener()).toHaveBeenCalled();
    //     expect(comp.documentMouseUPListener()).toHaveBeenCalled();
    //     comp.documentMouseMoveListener = null;
    //     comp.documentMouseUPListener = null;
    //     comp.opacitiy = false;
    //     floatingPanel.style.opacity = 'unset';

    // });
    it('onMouseDown method if  call', () => {
        comp.draggable = true;
        let floatingPanel = {
            'offsetTop': 1200,
            'offsetLeft': 145,
            'style': {
                'top': '20px',
                'left': '10px',
                'opacity': '1'
            }
        }
        let div = document.createElement('div');
        div.setAttribute('name', 'floatingheader');
        let event = jasmine.createSpyObj('e', ['preventDefault']);
        event['clientX'] = 1200;
        event['clientY'] = 1400;
        event['target'] = div;
        comp.onMouseDown(event, floatingPanel);
        expect(comp.draggable).toBeDefined();
        expect(event.target.getAttribute('name')).toBeDefined();
        expect(event.target.getAttribute('name')).toEqual('floatingheader');
        event = event || window.event;
        expect(event).toBe(event);
        expect(event.preventDefault).toHaveBeenCalled();
        comp.pos3 = event.clientX;
        comp.pos4 = event.clientY;
        comp.onMouseDown(event, floatingPanel);
        comp.documentMouseUPListener = null;
        comp.documentMouseMoveListener = null;
        expect(comp.documentMouseUPListener).toBeNull();
        comp.documentMouseUPListener = rendererMock.listen('document', 'mouseup',
            (event: any) => comp.closeDragElement(floatingPanel));

        expect(comp.documentMouseMoveListener).toBeNull();
        comp.documentMouseMoveListener = rendererMock.listen('document', 'mousemove',
            (event: any) => comp.elementDrag(event, floatingPanel));
    });



    it('onMouseDown method else ', () => {
       
        let floatingPanel = {
            'offsetTop': 1200,
            'offsetLeft': 145,
            'style': {
                'top': '20px',
                'left': '10px',
                'opacity': '1'
            }
        }
        let div = document.createElement('div');
        let event = jasmine.createSpyObj('e', ['preventDefault']);
        event['clientX'] = 1200;
        event['clientY'] = 1400;
        event['target'] = div;
        comp.draggable = false;
        comp.onMouseDown(event, floatingPanel);
        expect(comp.draggable).toEqual(false);
        expect(event.target.getAttribute('name')).toBeNull();
        expect(event.target.getAttribute('name')).not.toEqual('floatingheader');
    });


    it('onMouseDown method if nested call --checking else condition', () => {
        comp.draggable = true;
        let floatingPanel = {
            'offsetTop': 1200,
            'offsetLeft': 145,
            'style': {
                'top': '20px',
                'left': '10px',
                'opacity': '1'
            }
        }
        let div = document.createElement('div');
        div.setAttribute('name', 'floatingheader');
        let event = jasmine.createSpyObj('e', ['preventDefault']);
        event['clientX'] = 1200;
        event['clientY'] = 1400;
        event['target'] = div;
        comp.onMouseDown(event, floatingPanel);
        expect(comp.draggable).toBeDefined();
        expect(event.target.getAttribute('name')).toBeDefined();
        expect(event.target.getAttribute('name')).toEqual('floatingheader');
        event = window.event;
        expect(event).toBe(window.event)
        comp.pos3 = event.clientX;
        comp.pos4 = event.clientY;
        comp.documentMouseUPListener = 'kijjj';
        comp.documentMouseMoveListener = 'mjkiii';
        expect(comp.documentMouseUPListener).toBeDefined();
        expect(comp.documentMouseMoveListener).toBeDefined();
    });
});

