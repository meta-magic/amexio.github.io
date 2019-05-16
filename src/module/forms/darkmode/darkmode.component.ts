import { Component, Inject, Injectable, Input, OnInit } from '@angular/core';
import { AmexioToggleComponent } from './../toggle/toggle.component';
@Component({
    selector: 'amexio-darkmode',
    templateUrl: './darkmode.component.html',
})
export class DarkmodeComponent implements OnInit {
    @Input('field-label') fieldLabel: string;

    @Input('shape') shape: 'round';
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
        if (this.mode === 'custom') {
            this.maxValue = this.colorData.length - 1;
            this.otherMode();
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

    onChange() {
        if (this.mode === 'sepia') {
            this.sepiaMode();
        } else if (this.mode === 'custom') {
            this.otherMode();
        }
    }

    sepiaMode() {
        if (this.stepVal === 0) {
            this.onToggleClick(false);
        }

        if (this.stepVal === 1) {
            document.documentElement.style.setProperty(this.appBackground, this.sepiaColorCode);
            document.documentElement.style.setProperty(this.appForeground, this.sepiaFontColor);
            document.documentElement.style.setProperty(this.componentBackground, this.sepiaColorCode);
            document.documentElement.style.setProperty(this.componentForeground, this.sepiaFontColor);
        }
        if (this.stepVal === 2) {
            this.onToggleClick(true);
        }
    }

    otherMode() {
        if (this.colorData && this.colorData.length > 0) {
            this.colorData.forEach((element: any, index: any) => {
                if (this.stepVal === index) {
                    document.documentElement.style.setProperty(this.appBackground, element.bgColor);
                    document.documentElement.style.setProperty(this.appForeground, element.fgColor);
                    document.documentElement.style.setProperty(this.componentBackground, element.bgColor);
                    document.documentElement.style.setProperty(this.componentForeground, element.fgColor);

                }
            });
        }
    }

}
