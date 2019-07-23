import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Renderer2 } from '@angular/core';
import { OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { AmexioButtonComponent } from '../../forms/buttons/button.component';
import {CommonDataService} from '../../services/data/common.data.service';
@Component({
    selector: 'amexio-floating-panel',
    templateUrl: './floatingpanel.component.html',
})
export class AmexioFloatingPanelComponent implements OnChanges, OnInit, AfterViewInit {

    @Input('relative') relative = false;

    @Input('absolute') absolute = false;

    @Input('height') height: any;

    @Input('width') width: any;

    @Input('title') title: string;

    @Input('top-position') topPosition: string;

    @Input('bottom-position') bottomPosition: string;

    @Input('right-position') rightPosition: string;

    @Input('left-position') leftPosition: string;

    @Output('onClose') onclose = new EventEmitter<any>();

    @Input('closeable') closeable = false;

    @Input('show-panel') showPanel = false;

    @Output() showPanelChange = new EventEmitter<any>();

    @Input('arrow') arrow: boolean;
    themeCss: any;
    amexioComponentId = 'amexio-floating-panel';
    counter = 0;
    @ViewChild(AmexioButtonComponent) buttonRef: AmexioButtonComponent;
    @ViewChild('floatingPanel') floatingPanelRef: ElementRef;
    positionMapData: string[];
    showfloatingButton = false;
    showSimpleButton = false;
    gradientFlag: boolean;
    btnStyle = {};
    style = {};
    horpadding: any;
    virpadding: any;
    //  resize and draggable functionality variables

    @Input() resizable: boolean;
    @Input() draggable = true;
    opacitiy = false;

    pos1 = 0;
    pos2 = 0;

    pos3 = 0;
    pos4 = 0;

    documentMouseUPListener: any;
    documentMouseMoveListener: any;
    constructor(public commanservice: CommonDataService, private renderer: Renderer2, public element: ElementRef) {
        this.positionMapData = [];
        this.positionMapData['hpos-right'] = { position: 'right', value: '10px' };
        this.positionMapData['hpos-left'] = { position: 'left', value: '10px' };
        this.positionMapData['vpos-bottom'] = { position: 'bottom', value: '25px' };
        this.positionMapData['vpos-top'] = { position: 'top', value: '55px' };
    }
    ngAfterViewInit() {

    }
    ngOnInit() {
        if (this.absolute) {
            this.relative = false;
        }
        if (this.height === '') {
            this.height = 200;
        }
        if (this.width === '') {
            this.width = 400;
        }
        if (this.showPanel) {
            this.panelStyle();
        }
        if (this.draggable && this.arrow) {
            this.draggable = false;
        }
        if (this.relative && this.draggable) {
            this.style['position'] = 'absolute';
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['showPanel']) {
            this.showPanel = changes.showPanel.currentValue;
            this.getZindex( this.showPanel);
            if (this.absolute) {
                this.setPanelAbsolutePostion();
            } else {
                this.panelStyle();
            }
        }
    }
 getZindex(showPanel: boolean) {
    if (showPanel === true) {
        this.commanservice.zindex = this.commanservice.zindex + 100;
    }
}
    onMouseDown(event: any, floatingPanel: any) {
        if (this.draggable && event.target.getAttribute('name') && event.target.getAttribute('name') === 'floatingheader') {
            event = event || window.event;
            event.preventDefault();
            this.pos3 = event.clientX;
            this.pos4 = event.clientY;

            if (!this.documentMouseUPListener) {
                this.documentMouseUPListener = this.renderer.listen('document', 'mouseup',
                    // tslint:disable-next-line:no-shadowed-variable
                    (event: any) => this.closeDragElement(floatingPanel));
            }

            if (!this.documentMouseMoveListener) {
                this.documentMouseMoveListener = this.renderer.listen('document', 'mousemove',
                    // tslint:disable-next-line:no-shadowed-variable
                    (event: any) => this.elementDrag(event, floatingPanel));
            }
        }
    }
    elementDrag(e: any, floatingPanel: any) {
        e = e || window.event;
        e.preventDefault();
        this.pos1 = this.pos3 - e.clientX;
        this.pos2 = this.pos4 - e.clientY;
        this.pos3 = e.clientX;
        this.pos4 = e.clientY;
        if (this.bottomPosition) {
            delete this.style['bottom'];
        }
        floatingPanel.style.top = (floatingPanel.offsetTop - this.pos2) + 'px';
        floatingPanel.style.left = (floatingPanel.offsetLeft - this.pos1) + 'px';
        floatingPanel.style.opacity = '0.7';
        this.opacitiy = true;
    }

    closeDragElement(floatingPanel: any) {
        this.documentMouseMoveListener();
        this.documentMouseUPListener();
        this.documentMouseMoveListener = null;
        this.documentMouseUPListener = null;
        this.opacitiy = false;
        floatingPanel.style.opacity = 'unset';
    }
    togglePanel() {
        this.showPanel = !this.showPanel;
        this.onclose.emit(this);
        this.showPanelChange.emit(this.showPanel);
    }
    panelStyle(): any {
        this.style = {};
        this.style['position'] = (this.relative) ? 'absolute' : 'fixed';
        this.style['display'] = 'block';
        this.style['z-index'] = this.commanservice.zindex;
        this.style['opacity'] = '1';
        this.style['box-shadow'] = '0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)';
        if (this.width !== '') {
            this.style['width'] = this.width + 'px';
        } else {
            this.style['width'] = '400px';
        }
        if (!this.relative) {
            this.setPanelStylePostion();
        }
        this.arrowPadding();
    }

    arrowPadding() {
        if (this.arrow) {
            this.style['margin-top'] = '16px';
        }
    }
    setPanelAbsolutePostion() {
        this.style = {};
        this.style['position'] = 'absolute';
        this.style['display'] = 'block';
        this.style['z-index'] = this.commanservice.zindex;
        this.style['opacity'] = '1';
        this.style['box-shadow'] = '0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)';
        if (this.width !== '') {
            this.style['width'] = this.width + 'px';
        } else {
            this.style['width'] = '400px';
        }
        this.setPanelStylePostion();
        this.arrowPadding();
    }

    setPanelStylePostion() {
        if (this.topPosition) {
            this.style['top'] = this.topPosition;
        }
        if (this.bottomPosition) {
            this.style['bottom'] = this.bottomPosition;
        }

        if (this.rightPosition) {
            this.style['right'] = this.rightPosition;
        }
        if (this.leftPosition) {
            this.style['left'] = this.leftPosition;
        }
    }

    changeHeaderColor() {
        this.gradientFlag = true;
    }

    // Theme Apply
    setColorPalette(themeClass: any) {
        this.themeCss = themeClass;
    }
}
