import { Component, HostBinding, Input,  OnInit } from '@angular/core';
import { LayoutConstant } from './layout.constant';
@Component({
    selector: 'amexio-layout-columns',
    templateUrl: './layout.component.html',
    styles: [`
    :host {
        display: flex;
    }
  `],
})
export class AmexioLayoutComponent implements OnInit {

    private _orientation: string;
    private _alignment: string;
    private _padding: number;

    @Input('orientation') orientation = 'horizontal';

    @Input('alignment') alignment: string;

    @Input('border') border = true;

    @Input('fit') fit = true;

    @HostBinding('style.flex-direction') public orientationDirection: string;

    @HostBinding('style.justify-content') public justifyContent: string;

    @HostBinding('style.border') public borderstyle: string;

    @HostBinding('style.box-shadow') public borderboxstyle: string;

    @HostBinding('style.height') public height: string;

    ngOnInit() {
        this.setLayoutDefination();
    }

    public setLayoutDefination() {
        this.setorientation();
        this.setAlignment();
        this.setBorder();
        this.setFit();
    }

    private setorientation() {
        if (this.orientation && this.orientation.toLowerCase() === 'vertical') {
            this.orientationDirection = 'column';
        } else {
            this.orientationDirection = 'row';
        }
    }

    private setAlignment() {
        if (this.alignment && LayoutConstant[this.alignment.toLowerCase()]) {
            this.justifyContent = LayoutConstant[this.alignment.toLowerCase()];
        } else {
            this.justifyContent = 'start';
        }
    }

    private setBorder() {
        if (this.border) {
            this.borderstyle = '1px solid #ced4da';
            this.borderboxstyle = '0 2px 2px 0 rgba(0,0,0,.14)';
        }
    }

    private setFit() {
        if (this.fit) {
            this.height = '100%';
        }
    }
}
