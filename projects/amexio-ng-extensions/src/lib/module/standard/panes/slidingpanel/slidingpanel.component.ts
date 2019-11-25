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
    panelItemIcon: string;
    panelItemImage: string;
    panelItemImgProp: any;
    showbackarrow = false;

    ngOnInit() {
    }

    ngAfterContentInit() {
        this.ChildPanelSlidersCollection = this.queryTabs.toArray();
        this.ChildPanelSlidersCollection.forEach((node) =>
            node.childPanelClicked.subscribe((titleobj: any) => this.onPaneClick(titleobj)));
    }

    restorePanelState() {
        this.ChildPanelSlidersCollection.forEach((node: any) => {
            node.showrow = true;
            node.showngcontent = false;
        });
        this.showbackarrow = false;
        this.panelItemName = undefined;
        this.panelItemIcon = undefined;
        this.panelItemImage = undefined;
        this.panelItemImgProp = undefined;
        this.panelItemImgProp = undefined;
    }

    onPaneClick(titleobj: any) {
        this.panelItemName = titleobj.title;
        if (titleobj.icon) {
            this.panelItemIcon = titleobj.icon;
        }
        if (titleobj.image) {
            this.panelItemImage = titleobj.image;
        }
        if (titleobj.imgprop) {
            this.panelItemImgProp = titleobj.imgprop;
        }
        this.panelItemImgProp = titleobj.imgprop;
        this.onPanelItemClick.emit(titleobj.title);
        this.showbackarrow = true;
        this.ChildPanelSlidersCollection.forEach((node: any) => {
            if (node.title === titleobj.title) {
                node.showrow = false;
                node.showngcontent = true;
            } else {
                node.showrow = false;
                node.showngcontent = false;
            }
        });
    }
}
