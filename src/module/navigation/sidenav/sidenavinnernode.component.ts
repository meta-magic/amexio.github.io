import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'amexio-sidenav-innernode',
  templateUrl: './sidenavinnernode.component.html',
})
export class AmexioSideNavInnerNodeComponent implements OnInit {

  @Input('display-key') displaykey: string;

  @Input('icon') icon: string;

  @Input('child-array-key') childarraykey: string;

  @Input('data') data: any;

  @Output() onClick: any = new EventEmitter<any>();

  @Input('enable-drag') enabledrag: boolean;

  @Output() onDrag: any = new EventEmitter<any>();

  ngOnInit() {
  }

  onNodeClick(node: any) {
    node.expand = !node.expand;
    this.getOnClick(node);
  }

  getOnClick(node: any) {
    this.onClick.emit(node);
    this.activateNode(this.data, node);
  }
  activateNode(data: any[], node: any) {
    for (const i of data) {
      if (node === i && !i[this.childarraykey]) {
        i['active'] = true;
      } else {
        i['active'] = false;
      }

      if (i[this.childarraykey]) {
        this.activateNode(i[this.childarraykey], node);
      }
    }
  }

  dragStartEvent(event: any) {
    if (this.enabledrag) {
      event.event.dataTransfer.setData('dragData', JSON.stringify(event.data));
      this.onDrag.emit(event);
    }
  }
}
