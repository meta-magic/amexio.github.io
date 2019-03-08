/**
 * Created by dattaram on 4/3/19.
 */
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'amexio-overlay-container',
  templateUrl: 'overlay.component.html',
  animations: [
    trigger('animation', [
      state('void', style({
        transform: 'translateY(5%)',
        opacity: 0,
      })),
      state('show', style({
        transform: 'translateY(0)',
        opacity: 1,
      })),
      transition('void => show', animate('200ms')),
      transition('show => void', animate('200ms')),
    ]),
  ],
})

export class OverlayContainerComponent implements OnInit, OnDestroy {
  show = false;
  right: number = null;
  left: number = null;
  top: number = null;
  bottom: number = null;
  iconPosition: any;
  marginLeft: number = null;
  height = '100%';

  eventRef: any;

  arrowClass = 'leftTopArrow';

  @Input('closable') closable: boolean;

  @Input('position') position: string;

  @Input('width') width = 'auto';

  @Input('body-height') bodyHeight: number = null;

  @Input('close-on-escape') closeonescape = true;

  renderPositionClass: any;

  globalListenFunc: () => void;

  constructor(private _renderer: Renderer2) {
  }

  ngOnInit(): void {
  }

  onClose() {
    this.resetData();
  }

  resetData() {
    this.left = null;
    this.top = null;
    this.right = null;
    this.bottom = null;
    this.marginLeft = null;
    this.show = false;
  }

  toggle(event: any) {
    this.resetData();
    this.show = !this.show;
    this.eventRef = event;
    if (this.show && this.closeonescape) {
      this.globalListenFunc = this._renderer.listen('document', 'keyup.esc', (e: any) => {
        this.show = false;
        if (this.globalListenFunc) {
          this.globalListenFunc();
        }
      });
    }
  }

  setRenderPositionClass(): any {
    if (this.position === 'relative') {
      this.left = null;
      this.marginLeft = null;
    }
    return {
      'bottom': this.bottom + 'px', 'margin-left': this.marginLeft + 'px',
      'right': this.right + 'px', 'margin-top': this.top + 'px',
      'left': this.left + 'px', 'width': this.width,
    };
  }

  onAnimationStart(event: any) {
    if (this.show) {
      const positions = this.findOverlayPosition(event.element, this.eventRef.target || this.eventRef.currentTarget);
      this.top = this.eventRef.target.offsetHeight + 20;
      this.left = this.eventRef.pageX - this.eventRef.target.offsetWidth;
      this.marginLeft = this.eventRef.target.offsetWidth - this.left;
      if (positions.right) {
        this.iconPosition = {
          left: '-8px',
          right: '',
        };
        this.arrowClass = 'rightTopArrow';
        this.left = null;
        this.right = document.body.clientWidth - this.eventRef.pageX;
        if (positions.bottom) {
          this.arrowClass = 'rightBottomArrow';
          this.top = null;
          this.bottom = Math.abs(document.body.offsetHeight - this.eventRef.pageY);
        }
      } else {
        this.iconPosition = {
          right: '-8px', left: '',
        };
        this.arrowClass = 'leftTopArrow';
      }
      if (!positions.right && positions.bottom) {
        this.arrowClass = 'leftBottomArrow';
        this.top = null;
        this.bottom = Math.abs(document.body.offsetHeight - this.eventRef.pageY);
      }
      this.renderPositionClass = this.setRenderPositionClass();
      if (this.bodyHeight) {
        this.height = (window.outerHeight / 100) * this.bodyHeight + 'px';
      }
    }
  }

  findOverlayPosition(element: any, target: any): any {
    let rightAlign = false;
    let bottomAlign = false;
    const elementOuterHeight = element.offsetParent ? element.offsetHeight : '';
    const targetOuterHeight = target.offsetHeight;
    const targetOuterWidth = target.offsetWidth;
    const targetOffset = target.getBoundingClientRect();
    const windowScrollTop = this.getWindowScrollTop();
    const windowScrollLeft = this.getWindowScrollLeft();
    const viewport = this.getViewportDetails();
    let top;
    let left;
    if (targetOffset.top + targetOuterHeight + elementOuterHeight > viewport.height) {
      top = targetOffset.top + windowScrollTop - elementOuterHeight;
      if (top < 0) {
        top = 0 + windowScrollTop;
      }
      bottomAlign = true;
    } else {
      top = targetOuterHeight + targetOffset.top + windowScrollTop;
    }

    if (targetOffset.left + targetOuterWidth + 150 > viewport.width) {
      rightAlign = true;
    } else {
      left = targetOffset.left + windowScrollLeft;
    }
    return { topPosi: top, leftPosi: left, right: rightAlign, bottom: bottomAlign };
  }

  getWindowScrollTop(): number {
    const doc = document.documentElement;
    return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
  }

  getWindowScrollLeft(): number {
    const doc = document.documentElement;
    return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
  }

  getViewportDetails(): any {
    const win = window;
    const doc = document;
    const ele = doc.documentElement;
    const body = doc.getElementsByTagName('body')[0];
    const widthW = win.innerWidth || ele.clientWidth || body.clientWidth;
    const heightW = win.innerHeight || ele.clientHeight || body.clientHeight;
    return { width: widthW, height: heightW };
  }
  ngOnDestroy() {
    if (this.globalListenFunc) {
      this.globalListenFunc();
    }
  }
}
