import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { EventBaseComponent } from '../../base/event.base.component';
@Component({
  selector: 'amexio-speech-bubble',
  templateUrl: './speech-bubble.component.html',
})
export class SpeechBubbleComponent extends EventBaseComponent<any> implements OnInit {
  public arrowpress: boolean;
  contextmenu: any[] = [];
  contextStyle: any;
  bubblestyle: {};
  globalspeechListenFunc: () => void;
  @Input('width') width = '50%';

  @Input('arrow-direction') position: string;

  @Input('menu-option') data: any;

  @Output() onClick: any = new EventEmitter<any>();

  constructor(public element: ElementRef, public renderer: Renderer2, _cd: ChangeDetectorRef) {
    super(renderer, element, _cd);
  }
  ngOnInit() {
  }
  onarrowClick(event: any) {
    if (this.arrowpress) {
      this.arrowpress = false;
    }
    this.arrowpress = !this.arrowpress;
    this.dropdownstyle = { visibility: 'visible' };
    this.onBaseFocusEvent({});
  }
  onBubbleNodeClick(itemConfig: any) {
    this.onClick.emit(itemConfig);
    this.dropdownstyle = { visibility: 'hidden' };
  }
}
