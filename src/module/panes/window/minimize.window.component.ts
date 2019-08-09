import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MinimizeService } from './minimize-service.service';

@Component({
    selector: 'minimize-window',
    templateUrl: 'minimize.window.component.html',
})

export class MinimizeWindowComponent implements OnInit {

    localData: any[] = [];
    minimizeButton: boolean;
    @ViewChild('btnWidth') input: ElementRef;

    constructor(private _minimizeService1: MinimizeService) {
    }

    ngOnInit() {
        this._minimizeService1.currentMessage.subscribe((shareData: any[]) => {
            if (shareData) {
                this.localData = shareData;
                this.minimizeButton = true;
            }
        });
    }
    minimizeBtnClick(data: any) {
        data.show = true;
        this.minimizeButton = false;
    }
}
