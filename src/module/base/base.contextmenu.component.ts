import { Component, EventEmitter, Input, OnChanges, OnInit, Output, Renderer2 } from '@angular/core';

@Component({
  selector: 'base-contextmenu',
  templateUrl: './base.contextmenu.component.html',
  styleUrls: ['./base.contextmenu.component.scss'],
})
export class AmexioContextMenuComponent implements OnInit, OnChanges {

  @Input('is-FlagShow') isflagshow: boolean;

  @Input('base-context-menu') contextmenu: any[];

  @Input('position-up') posixUp: true;

  globalClickListenFunc: () => void;

  @Output() onRightClick: any = new EventEmitter<any>();

  @Input('right-click-data') rightClickData: any;

  @Input('mouse-location-left') mouseLocationLeft: number;

  @Input('mouse-location-top') mouseLocationTop: number;

  mouseLocationChangeleft: number;
  mouseLocationChangetop: number;
  contextStyle: any;
  constructor(private renderer: Renderer2) {
  }
  ngOnInit() { }

  ngOnChanges() {
    this.isflagshow = true;
    this.contextStyle = this.getContextMenuStyle();
  }

  getContextMenuStyle() {
    return {
      'cursor': 'default',
      'position': 'fixed',
      'display': this.isflagshow ? 'block' : 'none',
      'left': this.mouseLocationLeft + 'px',
      'top': this.mouseLocationTop + 'px',
      'box-shadow': '1px 1px 2px #000000',
      'width': '15%',
    };
  }
  onContextNodeClick(itemConfig: any) {
    if (!itemConfig.disabled) {
      const obj = {
        menuData: itemConfig,
        nodeData: this.rightClickData,
      };
      this.isflagshow = false;
      this.onRightClick.emit(obj);
    }
  }
}
