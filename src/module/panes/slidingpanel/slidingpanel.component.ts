import {
    AfterContentInit, Component, ContentChild, ContentChildren, Input, OnInit,
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
    ChildPanelSlidersCollection: PanelItemComponent[];
    title: string;
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
