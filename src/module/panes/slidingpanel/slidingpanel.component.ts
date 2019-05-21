import {
    AfterContentInit, Component, ContentChild, ContentChildren, EventEmitter, Input, OnInit, Output,
    QueryList,
} from '@angular/core';
import { PanelItemComponent } from './panelitem.component';

@Component({
    selector: 'amexio-sliding-panel',
    templateUrl: './slidingpanel.component.html',
})
export class SlidingPanelComponent implements OnInit, AfterContentInit {
    @Input() header: string;
    @ContentChildren(PanelItemComponent) queryTabs: QueryList<PanelItemComponent>;
    @Output() onPanelItemClick: any = new EventEmitter<any>();
    ChildPanelSlidersCollection: PanelItemComponent[];
    title: string;
    panelItemName: string;
    showbackarrow = false;

    ngOnInit() {
    }

    ngAfterContentInit() {
        this.ChildPanelSlidersCollection = this.queryTabs.toArray();
        this.ChildPanelSlidersCollection.forEach((node) =>
            node.childPanelClicked.subscribe((title: any) => this.onPaneClick(title)));
    }

    restorePanelState() {
        this.ChildPanelSlidersCollection.forEach((node: any) => {
            node.showrow = true;
            node.showngcontent = false;
        });
        this.showbackarrow = false;
    }

    onPaneClick(title: any) {
        this.panelItemName = title;
        this.onPanelItemClick.emit(title);
        this.showbackarrow = true;
        this.ChildPanelSlidersCollection.forEach((node: any) => {
            if (node.title === title) {
                node.showrow = false;
                node.showngcontent = true;
            } else {
                node.showrow = false;
                node.showngcontent = false;
            }
        });
    }
}
