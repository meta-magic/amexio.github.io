import { AfterContentInit, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { StackableItemComponent } from '../stackablepanel-item/stackablepanel-item.component';

@Component({
  selector: 'amexio-stackable-panel',
  templateUrl: './stackablepanel.component.html',
})
export class StackablePanelComponent implements AfterContentInit {

  totalCount = 0;
  public text = 'Show All';
  expand = true;
  anyExpand = false;
  @Input('panel-name') panelName = 'Comments';
  show = false;

  @ContentChildren(StackableItemComponent) groups: QueryList<StackableItemComponent>;

  ngAfterContentInit() {
    this.totalCount = this.groups.length;
    this.groups.toArray().forEach((items: any) => {
      if (items) {
        items.toggle.subscribe(() => {
          this.openGroup(items);
        });
      }
    });
  }

  openGroup(group: any) {
    this.groups.toArray().forEach((data: any) => {
      if (data) {
        group.open = !group.open;
      }
    });
  }

  showAll() {
    this.groups.toArray().forEach((data: any) => {
      if (this.text === 'Show All') {
        data.open = true;
      } else {
        data.open = false;
      }
    });
    if (this.text === 'Show All') {
      this.text = 'Hide All';
    } else {
      this.text = 'Show All';
    }
  }
}
