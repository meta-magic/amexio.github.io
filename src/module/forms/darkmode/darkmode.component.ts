import { Component, Inject, Injectable, Input, OnInit } from '@angular/core';
import { AmexioToggleComponent } from './../toggle/toggle.component';
@Component({
    selector: 'amexio-darkmode',
    templateUrl: './darkmode.component.html',
})
export class DarkmodeComponent implements OnInit {
    @Input('field-label') fieldLabel: string;

    @Input('shape') shape: string;
    @Input('type') type = 2;
    @Input('size') size = 'medium';
    @Input('mode') mode = 'day-night';
    @Input('data') colorData: any;
    stepVal = 0;
    maxValue = 2;
    sepiaColorCode = '#f4ecd8';
    sepiaFontColor = '#020202';

    themesdata: any = [];
    themeStyles: any[] = [];

    appBackground = '--appBackground';
    appForeground = '--appForegroundColor';
    componentBackground = '--componentBGColor';
    componentForeground = '--componentFontColor';

    constructor() {
        this.themesdata = [
            {
                varName: this.appBackground,
                darkValue: '#2d2d2d',
                themeValue: '#f5f5f5',
            },
            {
                varName: this.appForeground,
                darkValue: '#f5f5f5',
                themeValue: '#121212',
            },
            {
                varName: this.componentBackground,
                darkValue: '#121212',
                themeValue: '#ffffff',
            },
            {
                varName: this.componentForeground,
                darkValue: '#ffffff',
                themeValue: '#121212',
            },
        ];
    }

    ngOnInit() {
        if (this.shape === '' || this.shape == null) {
            this.shape = 'round';
        }
        if (this.mode === 'custom') {
            this.maxValue = this.colorData.length - 1;
            this.otherMode();
        } else {
            this.addDynamicCss('white', 'black');
        }
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

    onChange(eventV: any) {
        this.stepVal = eventV;
        if (this.mode === 'sepia') {
            this.sepiaMode();
        } else if (this.mode === 'custom') {
            this.otherMode();
        }
    }

    sepiaMode() {
        if (this.stepVal === 0) {
            this.onToggleClick(false);
            this.addDynamicCss('white', 'black');
        }

        if (this.stepVal === 1) {
            this.addDynamicCss(this.sepiaColorCode, 'black');
            document.documentElement.style.setProperty(this.appBackground, this.sepiaColorCode);
            document.documentElement.style.setProperty(this.appForeground, this.sepiaFontColor);
            document.documentElement.style.setProperty(this.componentBackground, this.sepiaColorCode);
            document.documentElement.style.setProperty(this.componentForeground, this.sepiaFontColor);
        }
        if (this.stepVal === 2) {
            this.onToggleClick(true);
            this.addDynamicCss('black', 'white');
        }
    }

    otherMode() {
        if (this.colorData && this.colorData.length > 0) {
            this.colorData.forEach((element: any, index: any) => {
                if (this.stepVal === index) {
                    this.addDynamicCss(element.bgColor, element.fgColor);
                    document.documentElement.style.setProperty(this.appBackground, element.bgColor);
                    document.documentElement.style.setProperty(this.appForeground, element.fgColor);
                    document.documentElement.style.setProperty(this.componentBackground, element.bgColor);
                    document.documentElement.style.setProperty(this.componentForeground, element.fgColor);

                }
            });
        }
    }

    insertStyleSheetRule(ruleText: any) {
        const sheets: any = document.styleSheets;
        if (sheets.length === 0) {
            const style = document.createElement('style');
            style.appendChild(document.createTextNode(''));
            document.head.appendChild(style);
        }
        let isCssAdded = false;
        for (const sh of sheets) {
            const sheet: any = sh;
            if (!isCssAdded && (sheet && sheet.href === null && sheet.rules)) {
                try {
                    sheet.insertRule(ruleText, sheet.rules ? sheet.rules.length : sheet.cssRules.length);
                    isCssAdded = true;
                } catch (e) {
                }
            }
        }
    }

    addDynamicCss(circleColor: any, borderColor: any) {
        this.insertStyleSheetRule('.slider-' + this.shape + '::-webkit-slider-thumb' +
            '{ background:' + circleColor + '!important; border: 1px solid ' + borderColor + ' !important; }');
    }
}
