import { Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';

@Component({
    selector: 'dropdown-list-item',
    templateUrl: './dropdownlist.component.html',
})
export class DropDownListComponent implements OnInit {

    template: TemplateRef<any>;
    @Input('data') viewdata: any;
    @Input('highlight-row') highlightrow: any;
    @Input('value-field') valuefield: any;
    @Input('display-field') displayfield: any;
    @Input('display-value') displayValue: any;
    @Output() itemclick: any = new EventEmitter<any>();

    constructor( public elementRef: ElementRef) {
    }

    ngOnInit() {
    }

    onDropDownListClick(event: any) {
        this.itemclick.emit(event);
    }

    scroll(rowindex: number) {
        const listitems = this.elementRef.nativeElement.getElementsByClassName('list-items')[rowindex];
        if (listitems) {
            listitems.scrollIntoView({ behavior: 'smooth'});
        }
    }

    selectedItem() {
        return this.elementRef.nativeElement.getElementsByClassName('list-items list-items-selected');
    }
}
