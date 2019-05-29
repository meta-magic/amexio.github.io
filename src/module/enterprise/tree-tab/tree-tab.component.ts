import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
@Component({
    selector: 'amexio-tree-tab',
    templateUrl: './tree-tab.component.html',
})

export class TreeTabComponent implements OnInit {

    @Input('data') data: any;
    @Input('data-reader') dataReader: string;
    @ViewChild('tab') tab: ElementRef;
    @Output('nodeClick') nodeClick: any = new EventEmitter<any>();
    emitData: any = {};
    constructor() { }

    ngOnInit() {
    }

    addtab(event: any) {
        this.emitData['data'] = event;
        this.emitData['tabData'] = this.tab;
        this.nodeClick.emit(this.emitData);
    }
}
