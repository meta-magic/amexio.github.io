import { AfterContentInit, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { StackableItemComponent } from '../StackablePanel-Item/stackablePanel-item.component';

@Component({
  selector: 'stackable-panel',
  templateUrl: './stackablePanel.component.html',
  styleUrls: ['./stackablePanel.component.css'],
})
export class StackablePanelComponent implements AfterContentInit {

  totalCount = 0;

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
        group.opened = !group.opened;
      }
    });
  }

  showAll(item: any) {
    if (item) {
      this.groups.toArray().forEach((data: any) => {
        if (!data.opened) {
          data.opened = true;
        } else if (data.opened) {
          data.opened = !data.opened;
        }
      });
    }
  }
}
