import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2} from '@angular/core';
import { EventBaseComponent } from '../../base/event.base.component';
@Component({
  selector: 'amexio-speech-bubble',
  templateUrl: './speech-bubble.component.html',
})
export class SpeechBubbleComponent extends EventBaseComponent<any> implements OnInit {
  public arrowpress: boolean;
  contextmenu: any[] = [];
  contextStyle: any;
  bubblestyle: any;
  globalspeechListenFunc: () => void;
  @Input('position') position: string;

  @Input('menu-option') data: any;

  @Output() onClick: any = new EventEmitter<any>();

  constructor(public element: ElementRef, public renderer: Renderer2,  _cd: ChangeDetectorRef) {
    super(renderer, element, _cd);
  }

  ngOnInit() {
    this.contextStyle = this.getBubbleMenuStyle();
  }
  onarrowClick(event: any) {
    this.arrowpress = !this.arrowpress;
    this.dropdownstyle = { visibility: 'visible' };
    this.onBaseFocusEvent({});
  }
  onBubbleNodeClick(itemConfig: any) {
    this.onClick.emit(itemConfig);
    this.bubblestyle = { visibility: 'hidden' };
  }
  getBubbleMenuStyle() {
    return {
      'cursor': 'default',
      'position': 'absolute',
      'display': 'block',
      'box-shadow': '1px 1px 2px #000000',
      'width': '15%',
    };
  }
}
