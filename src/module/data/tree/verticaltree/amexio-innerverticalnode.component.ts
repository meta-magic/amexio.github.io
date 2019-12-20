import { Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';

@Component({
    selector: 'amexio-innerveticalnode-demo',
    templateUrl: './amexio-innerverticalnode.component.html',
})
export class AmexioInnerVerticalNodeComponent implements OnInit {

    @Input() data: any;

    @Input() firstChild: boolean;

    @Input() lastChild: boolean;

    @Input() root: boolean;

    @Output() onNodeClick: any = new EventEmitter<any>();

    @Input() templates: any;

    @ContentChild('amexioTreeTemplate') parentTmp: TemplateRef<any>;

    constructor() {

    }

    ngOnInit() {

    }

    onClick(event: any) {
        this.onNodeClick.emit(event);
    }

}
