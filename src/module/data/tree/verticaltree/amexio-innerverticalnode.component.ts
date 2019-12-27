import {AfterViewInit, Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';

@Component({
    selector: 'amexio-innerveticalnode',
    templateUrl: './amexio-innerverticalnode.component.html',
})
export class AmexioInnerVerticalNodeComponent implements OnInit, AfterViewInit {

    @Output() onDropClick: any = new EventEmitter<any>();

    treetemplates: any;

    @Input() data: any;

    @Input() firstChild: boolean;

    @Input() lastChild: boolean;

    @Input() root: boolean;

    @Output() onNodeClick: any = new EventEmitter<any>();
    @Output() onDragOver: any = new EventEmitter<any>();

    @Input() templates: any;

    @ContentChild('amexioTreeTemplate') parentTmp: TemplateRef<any>;

    constructor() {

    }

    ngOnInit() {

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

    onClick(event: any) {
        this.onNodeClick.emit(event);
    }

    dragOver(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        this.onDragOver.emit(event);
    }

    dropTable(event: any) {
        if (event.event.dataTransfer.getData('text')) {
            const dropData = JSON.parse(event.event.dataTransfer.getData('text'));
            this.onDropClick.emit({ event: event.event, questData: dropData, node: event.data });
        }
    }

    dropInnerTable(event: any) {
        this.onDropClick.emit(event);
    }

}
