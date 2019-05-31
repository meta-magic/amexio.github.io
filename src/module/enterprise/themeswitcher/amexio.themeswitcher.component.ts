import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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

    @Input('horizontal-position') horizontalPosition = 'right';

    @Input('vertical-position') verticalPosition = 'bottom';

    @Output('onClose') onclose = new EventEmitter<any>();

    @Input('show') show: boolean;

    @Input('closeable') closeable: boolean;

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
        if (this.relative) {
            this.show = true;
        }
        this.loadMDAThemes();
    }

    loadMDAThemes() {
        if (this.isMDA) {
            let responseData: any;
            this.service.loadThemes('https://raw.githubusercontent.com/meta-magic/amexio-api-website/master/api/json/amexio-mda.json')
                .subscribe((data) => {
                    responseData = data;
                }, (error) => {
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
        const style = {};
        style['position'] = (this.relative) ? 'relative' : 'fixed';
        style['display'] = 'block';
        style['z-index'] = '0';
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
            style['width'] = (15 * this.colsize) + '%';
        } else {
            style['width'] = '100%';
        }
        return style;
    }

}
