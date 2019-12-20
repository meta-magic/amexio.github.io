import { AfterViewInit, Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';

@Component({
    selector: 'amexio-verticaltree-demo',
    templateUrl: './amexio-verticaltree.component.html',
})
export class AmexioVerticalTreeComponent implements AfterViewInit, OnInit {

    @Input() data: any;

    @Output() onNodeClick: any = new EventEmitter<any>();
    treetemplates: any;

    @ContentChild('amexioTreeTemplate') parentTmp: TemplateRef<any>;

    constructor() {

    }

    ngOnInit() {

    }

    nodeclick(event: any) {
        this.onNodeClick.emit(event);
    }

    ngAfterViewInit() {
        setTimeout(() => {
            if (this.parentTmp != null) {
                this.treetemplates = { treeNodeTemplate: this.parentTmp };
            } else if (this.treetemplates != null) {
                this.parentTmp = this.treetemplates.treeNodeTemplate;
            }
        });
    }
}
