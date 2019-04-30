import { Component, Inject, Injectable, Input, OnInit } from '@angular/core';
import { AmexioToggleComponent } from './../toggle/toggle.component';
@Component({
    selector: 'amexio-darkmode',
    templateUrl: './darkmode.component.html',
})
export class DarkmodeComponent implements OnInit {

    @Input('field-label') fieldLabel: string;

    @Input('shape') shape: 'round';

    themesdata: any = [];
    themeStyles: any[] = [];

    constructor() {
        this.themesdata = [
            {
                varName: '--appBackground',
                darkValue: '#121212',
                themeValue: '#f5f5f5',
            },
            {
                varName: '--appForegroundColor',
                darkValue: '#f5f5f5',
                themeValue: '#121212',
            },
            {
                varName: '--componentBGColor',
                darkValue: '#121212',
                themeValue: '#ffffff',
            },
            {
                varName: '--componentFontColor',
                darkValue: '#ffffff',
                themeValue: '#121212',
            },
            // ],
            // },
        ];
    }

    ngOnInit() {
    }
    onToggleClick(event: any) {
        this.themeStyles = [];
        this.themesdata.forEach((obj: any) => {
            const varObj: any = {
                name: '',
                value: '',
            };
            if (event) {
                varObj.name = obj.varName;
                varObj.value = obj.darkValue;
            } else {
                varObj.name = obj.varName;
                varObj.value = obj.themeValue;
            }
            this.themeStyles.push(varObj);

        });

        this.themeStyles.forEach((style: any) => {
            document.documentElement.style.setProperty(style.name, style.value);
        });

    }

}
