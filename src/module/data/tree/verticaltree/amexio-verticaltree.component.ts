import { AfterViewInit, Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { AmexioInnerVerticalNodeComponent } from '../verticaltree/amexio-innerverticalnode.component';

@Component({
    selector: 'amexio-verticaltree',
    templateUrl: './amexio-verticaltree.component.html',
})
export class AmexioVerticalTreeComponent implements AfterViewInit, OnInit {

    @Input() data: any;

    @Output() onNodeClick: any = new EventEmitter<any>();
    @Output() onDropClick: any = new EventEmitter<any>();

    treetemplates: any;

    @ContentChild('amexioTreeTemplate') parentTmp: TemplateRef<any>;
    @ViewChild(AmexioInnerVerticalNodeComponent) innernodeRef: AmexioInnerVerticalNodeComponent;
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

    dragOver(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
    }

    dropTable(event: any) {
        this.onDropClick.emit({ event: event.event, questData: event.questData, node: event.node });
    }
}
