import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
    selector: 'amexio-layout-item',
    template: `
        <ng-content></ng-content>
    `,
})
export class AmexioLayoutItemComponent implements OnInit {

    @Input('fit') fit: boolean;

    @Input('padding') padding: string;

    @HostBinding('style.flex-grow') public flexgrow: number;

    @HostBinding('style.padding') public lipadding: string;

    ngOnInit() {
        if (this.fit) {
            this.flexgrow = 1;
        }
        if (this.padding) {
            this.lipadding = this.padding;
        }
    }
}
