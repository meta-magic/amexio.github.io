import { AfterViewInit, Component, ElementRef, EventEmitter, Input } from '@angular/core';
import { OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { AmexioButtonComponent } from '../../forms/buttons/button.component';

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

    @Input('arrow') arrow: boolean;
    themeCss: any;
    amexioComponentId = 'amexio-floating-panel';

    @ViewChild(AmexioButtonComponent) buttonRef: AmexioButtonComponent;
    positionMapData: string[];
    showfloatingButton = false;
    showSimpleButton = false;
    gradientFlag: boolean;
    btnStyle = {};
    style = {};
    horpadding: any;
    virpadding: any;
    constructor() {
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
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['showPanel']) {
            this.showPanel = changes.showPanel.currentValue;
            if (this.absolute) {
                this.setPanelAbsolutePostion();
            } else {
                this.panelStyle();
            }
        }

    }

    togglePanel() {
        this.showPanel = !this.showPanel;
        this.onclose.emit(this);
    }
    panelStyle(): any {
        this.style = {};
        this.style['position'] = (this.relative) ? 'absolute' : 'fixed';
        this.style['display'] = 'block';
        this.style['z-index'] = '600';
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
        } else {
            this.style['margin-top'] = '3px';
        }
    }
    setPanelAbsolutePostion() {
        this.style = {};
        this.style['position'] = 'absolute';
        this.style['display'] = 'block';
        this.style['z-index'] = '400';
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
