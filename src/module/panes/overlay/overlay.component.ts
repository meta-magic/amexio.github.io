/**
 * Created by dattaram on 4/3/19.
 */
import { Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'amexio-overlay-container',
  templateUrl: 'overlay.component.html',
})

export class OverlayContainerComponent implements OnInit, OnDestroy {
  show = false;
  right: any = null;
  left: any = null;
  bottom: any = null;
  top: any = null;
  iconPosition: any;
  valueConst = 30;
  height = '100%';

  arrowClass = 'leftTopArrow';

  @Input('closable') closable: boolean;

  @Input('width') width = 'auto';

  @Input('body-height') bodyHeight: number = null;

  @Input('close-on-escape') closeonescape = true;

  renderPositionClass: any;

  globalListenFunc: () => void;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.iconPosition = {
      right: '-8px',
      left: '',
    };
  }

  onClose() {
    this.show = false;
  }

  toggle(event: any) {
    this.show = !this.show;
    if (this.show && this.closeonescape) {
      this.globalListenFunc = this.renderer.listen('document', 'keyup.esc', (e: any) => {
        this.show = false;
        if (this.globalListenFunc) {
          this.globalListenFunc();
        }
      });
    }
    if (window.innerWidth - event.pageX < 100) {
      this.rightAlignConfiguration(event);
    } else {
      this.leftAlignConfiguration(event);
    }
    this.renderPositionClass = this.setRenderPositionClass();
    if (this.bodyHeight) {
      this.height = (window.innerHeight / 100) * this.bodyHeight + 'px';
    }
  }

  setRenderPositionClass(): any {
    return {
      right: this.right + 'px',
      top: this.top + 'px',
      left: this.left + 'px',
      bottom: this.bottom + 'px',
      width: this.width,
    };
  }

  rightAlignConfiguration(event: any) {
    this.iconPosition = {
      left: '-8px',
      right: '',
    };
    this.arrowClass = 'rightTopArrow';
    this.right = (window.innerWidth - event.pageX) - this.valueConst;
    this.left = null;
    this.bottom = null;
    this.top = event.pageY + this.valueConst;
    if (window.innerHeight - event.pageY < 150) {
      this.bottom = Math.abs((window.innerHeight - event.pageY) + this.valueConst);
      this.top = null;
      this.arrowClass = 'rightBottomArrow';
    }
  }

  leftAlignConfiguration(event: any) {
    this.left = event.pageX - this.valueConst;
    this.right = null;
    this.top = event.pageY + this.valueConst;
    if (window.innerHeight - event.pageY < 150) {
      this.bottom = Math.abs((window.innerHeight - event.pageY) + this.valueConst);
      this.top = null;
      this.arrowClass = 'leftBottomArrow';
    }
  }

  ngOnDestroy() {
    if (this.globalListenFunc) {
      this.globalListenFunc();
    }
  }
}
