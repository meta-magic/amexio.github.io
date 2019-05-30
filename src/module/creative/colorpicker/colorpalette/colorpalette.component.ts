import { AfterViewInit, Component, ElementRef, EventEmitter} from '@angular/core';
import { HostListener, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'color-palette',
  templateUrl: './colorpalette.component.html',
})
export class ColorPaletteComponent implements AfterViewInit, OnChanges {
  @Input() hue: string;
  @Input('position') position: any;
  @Output()
  color: EventEmitter<string> = new EventEmitter(true);
  @ViewChild('canvas')
  canvas: ElementRef<HTMLCanvasElement>;
  width: any;
  height: any;
  private ctx: CanvasRenderingContext2D;
  private mousedown = false;
  emitData: any = { color: '', position: { x: '', y: '' } };
  public selectedPosition = { x: 121, y: 53 };
  constructor() { }

  ngAfterViewInit() {
    this.draw();
  }
  draw() {
    if (!this.ctx) {
      this.ctx = this.canvas.nativeElement.getContext('2d');
    }
    const width = this.canvas.nativeElement.width;
    const height = this.canvas.nativeElement.height;
    this.ctx.fillStyle = this.hue || 'rgba(255,255,255,1)';
    this.ctx.fillRect(0, 0, width, height);

    const whiteGrad = this.ctx.createLinearGradient(0, 0, width, 0);
    whiteGrad.addColorStop(0, 'rgba(255,255,255,1)');
    whiteGrad.addColorStop(1, 'rgba(255,255,255,0)');

    this.ctx.fillStyle = whiteGrad;
    this.ctx.fillRect(0, 0, width, height);

    const blackGrad = this.ctx.createLinearGradient(0, 0, 0, height);
    blackGrad.addColorStop(0, 'rgba(0,0,0,0)');
    blackGrad.addColorStop(1, 'rgba(0,0,0,1)');

    this.ctx.fillStyle = blackGrad;
    this.ctx.fillRect(0, 0, width, height);
    this.ctx.strokeStyle = 'white';
    this.ctx.fillStyle = 'white';
    this.ctx.beginPath();
    if (this.position != null) {
      this.ctx.arc(
        this.position.x,
        this.position.y,
        6,
        0,
        2 * Math.PI,
      );
    } else {
      this.ctx.arc(
        this.selectedPosition.x,
        this.selectedPosition.y,
        6,
        0,
        2 * Math.PI,
      );
    }
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['hue'] && changes.hue.currentValue) {
      this.hue = changes.hue.currentValue;
    }
    if (changes.position && changes.position.currentValue) {
      this.position = changes.position.currentValue;
      this.draw();
      this.emitColor(this.position.x, this.position.y);
    } else {
      const pos = this.selectedPosition;
      this.draw();
      if (pos) {
        this.emitColor(pos.x, pos.y);
      }
    }
  }

  @HostListener('window:mouseup', ['$event'])
  onMouseUp(evt: MouseEvent) {
    this.mousedown = false;
  }

  onMouseDown(evt: MouseEvent) {
    if (this.position) {
      this.position = null;
    }
    this.mousedown = true;
    this.selectedPosition = { x: evt.offsetX, y: evt.offsetY };
    this.draw();
    this.emitColor(evt.offsetX, evt.offsetY);
  }

  onMouseMove(evt: MouseEvent) {
    if (this.mousedown) {
      if (this.position) {
        this.position = null;
      }

      this.selectedPosition = { x: evt.offsetX, y: evt.offsetY };
      this.draw();
      this.emitColor(evt.offsetX, evt.offsetY);
    }
  }

  emitColor(x: number, y: number) {
    const rgbaColor = this.getColorAtPosition(x, y);
    this.emitData.color = rgbaColor;
    this.emitData.position.x = x;
    this.emitData.position.y = y;
    this.color.emit(this.emitData);
  }

  getColorAtPosition(x: number, y: number) {
    const imageData = this.ctx.getImageData(x, y, 1, 1).data;
    return 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
  }

}
