import { AfterContentInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit } from '@angular/core';
import { Output, SimpleChanges, ViewChild } from '@angular/core';
import { AmexioThemeSwitcherService } from '../../services/data/amexio.theme.service';

@Component({
    selector: 'amexio-theme-switcher',
    templateUrl: './amexio.themeswitcher.component.html',
})
export class AmexioThemeSwitcherComponent implements OnInit, OnChanges {
    @Input('data') data: any[];

    @Input('more-details') isMoreDetails: boolean;

    @Input('test-mode') testmode = true;

    @Input('mda') isMDA = true;

    @Input('col-size') colsize = 3;

    @Input('relative') relative = false;

    @Input('button-type') buttonType: string;

    @Input('horizontal-position') horizontalPosition = 'right';

    @Input('vertical-position') verticalPosition = 'bottom';

    @Output('onClose') onclose = new EventEmitter<any>();

    @Input('show') show: boolean;

    @Input('closeable') closeable: boolean;

    @Output('onThemeClick') onThemeClick = new EventEmitter<any>();

    respo: any = [];
    positionMapData: string[];

    constructor(private service: AmexioThemeSwitcherService) {
        this.positionMapData = [];
        this.positionMapData['hpos-right'] = { position: 'right', value: '10px' };
        this.positionMapData['hpos-left'] = { position: 'left', value: '10px' };
        this.positionMapData['vpos-bottom'] = { position: 'bottom', value: '25px' };
        this.positionMapData['vpos-top'] = { position: 'top', value: '55px' };
        this.closeable = true;
    }

    ngOnInit() {
        if (this.relative && !this.closeable) {
            this.show = true;
        }
        this.loadMDAThemes();
        this.service.themeData.subscribe((theme: any) => {
            if (theme != null) {
                this.onThemeClick.emit(theme);
            }
        });
    }
    loadMDAThemes() {
        if (this.isMDA) {
            let responseData: any;
            this.service.loadThemes('assets/amexiomdathemes/json/amexio-mda.json')
                .subscribe((data: any) => {
                    responseData = data;
                }, (error: any) => {
                    console.log('Unable to make http call');
                }, () => {
                    this.data = responseData;
                });
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['show']) {
            this.show = changes.show.currentValue;
        }

    }

    themeChange(theme: any) {
        this.service.switchTheme(theme);
    }

    onChange(value: boolean) {
        this.isMoreDetails = value;
    }

    togglePanel() {
        this.show = !this.show;
        this.onclose.emit(this);
    }

    themeStyle(): any {
        const windowWidth = window.innerWidth;
        const perBlockWidth = ((windowWidth / 100) * 35) / 3;
        const style1 = {};
        const style = this.getPostion(style1);
        style['display'] = 'block';
        if (this.closeable === true) {
            style['z-index'] = '600';
        } else {
            style['z-index'] = '0';
        }
        if (this.colsize <= 3) {
            style['min-width'] = '250px';
        } else {
            style['min-width'] = '200px';
        }

        if (!this.relative) {
            const hpos = this.positionMapData['hpos-' + this.horizontalPosition];
            const vpos = this.positionMapData['vpos-' + this.verticalPosition];
            if (hpos) {
                style[hpos.position] = hpos.value;
            }
            if (vpos) {
                style[vpos.position] = vpos.value;
            }

        } else {
            style['margin-top'] = '10px';
        }

        if (this.closeable) {
            style['width'] = (perBlockWidth * this.colsize) + 'px';
        } else {
            style['width'] = '100%';
        }
        return style;
    }
    getPostion(style: any) {
        if (!this.closeable) {
            style['position'] = 'relative';
        } else if (this.closeable && this.relative) {
            style['position'] = 'absolute';
            style['right'] = '0';
        } else {
            style['position'] = 'fixed';
        }
        return style;
    }
}
