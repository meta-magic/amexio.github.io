import { animate, state, style, transition, trigger } from '@angular/animations';

import {
    AfterContentInit, AfterViewInit, Component, ContentChild, ElementRef,
    EventEmitter, Input, OnChanges, OnInit, Output, ViewChild,
} from '@angular/core';

export type PaneType = 'left' | 'right';

@Component({
    selector: 'amexio-panel-item',
    templateUrl: './panelitem.component.html',
    animations: [
        trigger('slide', [
            state('left', style({ transform: 'translateX(100%)' })),
            state('right', style({ transform: 'translateX(-100%)' })),
            transition('* => *', animate(500)),
        ],
        ),
    ],
})
export class PanelItemComponent implements OnInit, AfterContentInit, AfterViewInit {

    @Input() activePane: PaneType = 'left';

    /*
    Properties
    name :  icon
    datatype : string
    version : 4.0 onwards
    default :
    description : FaIcon classname
    */
    @Input() icon: string;

    /*
   Properties
   name : label
   datatype : string
   version : 4.0 onwards
   default :
   description : Label on button
   */
    @Input() title: string;

    @ViewChild('tref', { read: ElementRef }) tref: ElementRef;

    @Output() childPanelClicked: EventEmitter<any> = new EventEmitter<any>();

    isSwipeTriggered = false;
    hasContent = false;
    showrow = true;
    showngcontent = false;
    clicked = false;
    constructor() {

    }

    ngOnInit() {
     }

    ngAfterViewInit() {

    }

    ngAfterContentInit() {
        this.hasContent = this.tref.nativeElement.childNodes.length > 0;
    }
    onPanelClick(event: any) {
        if (this.hasContent) {
            this.isSwipeTriggered = true;
            this.clicked = true;
            this.childPanelClicked.emit(this.title);
        }
    }

}
