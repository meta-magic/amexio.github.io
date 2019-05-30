import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
@Component({
    selector: 'amexio-tree-tab',
    templateUrl: './tree-tab.component.html',
    styleUrls: ['./tree-tab.component.css'],
})

export class TreeTabComponent implements OnInit, AfterViewInit {

    @Input('data') data: any;
    @Input('data-reader') dataReader: string;
    @ViewChild('tab') tab: ElementRef;
    @Output('nodeClick') nodeClick: any = new EventEmitter<any>();
    @Output('onLoad') onLoad: any = new EventEmitter<any>();
    @Input('width') width = '200px';
    @Input('http-url') httpUrl: string;
    @Input('http-method') httpMethod: string;

    emitData: any = {};
    constructor() { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        setTimeout(() => {
          this.onLoad.emit(this.tab);
        }, 500);
      }

    addtab(event: any) {
        this.emitData['data'] = event;
        this.emitData['tabData'] = this.tab;
        this.nodeClick.emit(this.emitData);
    }
}
