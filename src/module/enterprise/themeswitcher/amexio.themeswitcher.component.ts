import { Component, Input, OnInit } from '@angular/core';
import { AmexioThemeSwitcherService } from '../../services/data/amexio.theme.service';

@Component({
    selector: 'amexio-theme-switcher',
    templateUrl: './amexio.themeswitcher.component.html',
})
export class AmexioThemeSwitcherComponent implements OnInit {

    @Input('data') data: any[];

    @Input('more-details') isMoreDetails: boolean;

    @Input('test-mode') testmode = true;

    @Input('mda') isMDA = true;

    constructor(private service: AmexioThemeSwitcherService) {

    }

    ngOnInit() {
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

    themeChange(theme: any) {
        this.service.switchTheme(theme);
    }

    onChange(value: boolean) {
        this.isMoreDetails = value;
    }

}
