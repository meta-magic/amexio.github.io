import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CeMinimizeService } from './ceMinimize-service.service';

@Component({
    selector: 'ce-minimize-window',
    templateUrl: './ceMinimize.window.component.html',
})

export class CeMinimizeWindowComponent implements OnInit {

    arrayData: any[] = [];
    ceMiniButton = false;
    constructor(private _ceService1: CeMinimizeService) {
    }

    ngOnInit() {
        this._ceService1.observableMessage.subscribe((shareData: any[]) => {
            this.arrayData = shareData;
            this.ceMiniButton = true;
        });
    }
    ceMiniBtnClick(data: any) {
        data.show = true;
        this.ceMiniButton = false;
    }
}
