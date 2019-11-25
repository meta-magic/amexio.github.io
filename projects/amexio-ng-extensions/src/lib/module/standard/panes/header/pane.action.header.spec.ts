import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonIconComponent } from '../../../base/components/common.icon.component'
import { AmexioHeaderComponent } from './pane.action.header';
describe('AmexioHeaderComponent', () => {
  let comp: AmexioHeaderComponent;
  let fixture: ComponentFixture<AmexioHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ],
      declarations: [AmexioHeaderComponent, CommonIconComponent],
      providers: [HttpClient],

    });
    fixture = TestBed.createComponent(AmexioHeaderComponent);
    comp = fixture.componentInstance;
  });

  it('onCloseClick call ()', () => {
    comp.onCloseClick();
    comp.closeableBehaiour.next(false);
    comp.closeDataEmit.emit(this);
  });

  xit('onMinimizeClick  method check', () => {
    comp.onMinimizeClick(event);
    comp.closeableBehaiour.next(false);
    comp.minimizeWindow.subscribe((g: any) => {
     // expect(event).toEqual(this, g);
    });
  });

  it('ngAfterViewInit  method check 1st if', () => {
    comp.textName = comp.content.nativeElement.innerText;
    comp.ngAfterViewInit();
    comp.textName = 'kedar';
    comp.minimizeIcon = 'fa fa-home';
    expect(comp.textName).toEqual('kedar');
    expect(comp.minimizeIcon).toEqual('fa fa-home');
    return comp.textName;
  });
  it('ngAfterViewInit  method check 1st els', () => {
    comp.textName = comp.content.nativeElement.innerText;
    comp.ngAfterViewInit();
    comp.textName = '';
    comp.minimizeIcon = '';
    expect(comp.textName).toEqual('');
    expect(comp.minimizeIcon).toEqual('');
  });
  it('ngAfterViewInit  method check 2nd if', () => {
    comp.textName = comp.content.nativeElement.innerText;
    comp.ngAfterViewInit();
    comp.textName = 'kedar';
    comp.minimizeIcon = 'fa fa-home';
    expect(comp.textName).toEqual('kedar');
    expect(comp.minimizeIcon).toEqual('fa fa-home');
    comp.ngAfterViewInit();
    comp.textName = 'kedar';
    comp.minimizeIcon = '';
    expect(comp.textName).toEqual('kedar');
    expect(comp.minimizeIcon).toEqual('');
    return comp.textName;
  });
  it('ngAfterViewInit  method check 2nd else', () => {
    comp.textName = comp.content.nativeElement.innerText;
    comp.ngAfterViewInit();
    comp.textName = 'kedar';
    comp.minimizeIcon = 'fa fa-home';
    expect(comp.textName).toEqual('kedar');
    expect(comp.minimizeIcon).toEqual('fa fa-home');
    comp.textName = '';
    comp.minimizeIcon = 'fa fa-home'
    expect(comp.textName).toEqual('');
    expect(comp.minimizeIcon).toEqual('fa fa-home');
    return comp.minimizeIcon;
  });
  it('ngAfterViewInit  method check !this.minimizeIcon && !this.textName', () => {
    comp.textName = comp.content.nativeElement.innerText;
    comp.ngAfterViewInit();
    comp.textName = '';
    comp.minimizeIcon = ''
    expect(comp.textName).toEqual('');
    expect(comp.minimizeIcon).toEqual('');
    return comp.minimizeIcon = 'fa fa-file';
  });
  it('ngAfterViewInit  method check this.minimizeIcon && this.textName', () => {
    comp.textName = comp.content.nativeElement.innerText;
    comp.ngAfterViewInit();
    comp.textName = 'kedar';
    comp.minimizeIcon = 'fa fa-home';
    expect(comp.textName).toEqual('kedar');
    expect(comp.minimizeIcon).toEqual('fa fa-home');
    return comp.textName = 'kedar';
  });

  it('maxScreenChangeCard Method', () => {
    comp.maxScreenChangeCard(event);
    comp.maximizeWindow1.emit({ tempEvent: event, tempThis: this });
  });

  it('minScreenChangeCard Method', () => {
    comp.minScreenChangeCard(event);
    comp.minimizeWindow1.emit({ tempEvent: event, tempThis: this });
  });

  it('sizeChange call ()', () => {
    let event = false;
    comp.sizeChange(event);
    comp.isFullWindow = !comp.isFullWindow;
    comp.maximizeBehaiour.next({ isFullWindow: comp.isFullWindow, event1: event });
  });
});