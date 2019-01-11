/*
* Copyright [2019] [Metamagic]
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

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
