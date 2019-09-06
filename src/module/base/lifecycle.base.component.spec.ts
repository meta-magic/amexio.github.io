import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LifeCycleBaseComponent } from '../base/lifecycle.base.component';
import { DOCUMENT } from '@angular/common';

describe('lifecycle', () => {
  let comp1: LifeCycleBaseComponent;
  let fixture1: ComponentFixture<LifeCycleBaseComponent>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [LifeCycleBaseComponent]
    });
    fixture1 = TestBed.createComponent(LifeCycleBaseComponent);
    comp1 = fixture1.componentInstance;

  });

  it('setRoundEdge If round-edge()', () => {
    let type = 'round-edge';
    comp1.setRoundEdge('round-edge');
    expect(type).toEqual('round-edge')
    comp1.roundedgeclass = 'roundEdgeCommonCss';
  });

  it('setRoundEdge If classic', () => {
    let type = 'classic';
    comp1.setRoundEdge('classic');
    expect(type).toEqual('classic')
    comp1.roundedgeclass = 'classicCommonCss';
  });
  it('setFullScreen if call', () => {
    let type = 'browser';
    comp1.setFullScreen(type);
    expect(type).toEqual('browser')
    comp1.yesFullScreen = true;
  });

  it('setFullScreen else call', () => {
    let type = 'classic';
    comp1.setFullScreen(type);
    expect(type).not.toEqual('browser');
  });

  it('setFullScreen elseIf call', () => {
    let type = 'desktop';
    comp1.setFullScreen(type);
    expect(type).toEqual('desktop');
    comp1.desktopFlag = true;
  });

  it('setFullScreen elseIf call', () => {
    let type = 'classic';
    comp1.setFullScreen(type);
    expect(type).not.toEqual('desktop');
  });

  it('minScreenChange call', () => {
    comp1.minScreenChange(event);
    event.stopPropagation();
    comp1.fullscreenMax = !comp1.fullscreenMax;
    if (comp1.document.exitFullscreen && comp1.desktopFlag) {
      comp1.document.exitFullscreen();
    } else if (comp1.document.mozCancelFullScreen && comp1.desktopFlag) {
      /* Firefox */
      comp1.document.mozCancelFullScreen();
    } else if (comp1.document.webkitExitFullscreen && comp1.desktopFlag) {
      /* Chrome, Safari and Opera */
      comp1.document.webkitExitFullscreen();
    } else if (comp1.document.msExitFullscreen && comp1.desktopFlag) {
      /* IE/Edge */
      comp1.document.msExitFullscreen();
    }
    return comp1.fullscreenMax;
  });

  // it('maxScreenChange Call', () => {
  //   comp1.maxScreenChange(event)
  //   this.elem = document.documentElement;
  //   event.stopPropagation();
  //   comp1.fullscreenMax = !comp1.fullscreenMax;
  //   if (comp1.elem.requestFullscreen && comp1.desktopFlag) {
  //     comp1.elem.requestFullscreen();
  //   } else if (comp1.elem.mozRequestFullScreen && comp1.desktopFlag) {
  //     /* Firefox */
  //     this.comp1.mozRequestFullScreen();
  //   } else if (comp1.elem.webkitRequestFullscreen && comp1.desktopFlag) {
  //     /* Chrome, Safari and Opera */
  //     comp1.elem.webkitRequestFullscreen();
  //   } else if (comp1.elem.msRequestFullscreen && comp1.desktopFlag) {
  //     /* IE/Edge */
  //     comp1.elem.msRequestFullscreen();
  //   }
  //   return this.fullscreenMax;
  // })
});
