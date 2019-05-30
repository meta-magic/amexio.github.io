import { AfterViewInit, Component, ElementRef, EventEmitter} from '@angular/core';
import { HostListener, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
@Component({
  selector: 'color-slider',
  templateUrl: './colorslider.component.html',
})
export class ColorsliderComponent implements AfterViewInit, OnInit, OnChanges {
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;
  @Output() color: EventEmitter<any> = new EventEmitter();
  @Input('selected-hue') selctedHue: any;
  @Input('offsetY') offsetY: any;
  private ctx: CanvasRenderingContext2D;
  mousedown = false;
  private selectedHeight = 0;
  selectedcolor: string;
  emitData: any = { color: '', offsetY: '', visiblity: '' };
  constructor(public element: ElementRef) {
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.draw();
  }
  draw() {
    if (!this.ctx) {
      this.ctx = this.canvas.nativeElement.getContext('2d');
    }
    const width = this.canvas.nativeElement.width;
    const height = this.canvas.nativeElement.height;
    this.ctx.clearRect(0, 0, width, height);
    const gradient = this.ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(255, 0, 0, 1)');
    gradient.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
    gradient.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
    gradient.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
    gradient.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
    gradient.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
    gradient.addColorStop(1, 'rgba(255, 0, 0, 1)');

    this.ctx.beginPath();
    this.ctx.rect(0, 0, width, height);
    this.ctx.fillStyle = gradient;
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'white';
    this.ctx.lineWidth = 2;
    if (this.offsetY) {
      this.ctx.rect(0, this.offsetY - 5, width, 10);
    } else {
      this.ctx.rect(0, this.selectedHeight - 5, width, 10);
    }
    this.ctx.stroke();
    this.ctx.closePath();
    if (this.selctedHue) {
      this.emitData.color = this.selctedHue;
      this.emitData.offsetY = this.offsetY;
      this.color.emit(this.emitData);
    } else {
      this.emitData.color = 'rgba(255,3,0,1)';
      this.color.emit(this.emitData);

    }
  }

  onMouseDown(evt: any) {
    if (this.offsetY) {
      this.offsetY = '';
    }
    this.mousedown = true;
    this.selectedHeight = evt.offsetY;
    this.draw();
    this.emitColor(evt.offsetX, evt.offsetY);
  }

  onMouseMove(evt: any) {
    if (this.mousedown) {
      if (this.offsetY) {
        this.offsetY = '';
      }
      this.selectedHeight = evt.offsetY;
      this.draw();
      this.emitColor(evt.offsetX, evt.offsetY);
    }
  }
  @HostListener('window:mouseup', ['$event'])
  onMouseUp(evt: MouseEvent) {
    this.mousedown = false;
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.hue && changes.hue.currentValue) {
      this.selctedHue = changes.hue.currentValue;
    }
    if (changes.offsetY && changes.offsetY.currentValue) {
      this.offsetY = changes.offsetY.currentValue;
    }
    this.draw();
  }
  emitColor(x: number, y: number) {
    const rgbaColor = this.getColorAtPosition(x, y);
    this.selectedcolor = rgbaColor;
    this.emitData.color = rgbaColor;
    this.emitData.offsetY = y;
    this.color.emit(this.emitData);
  }
  getColorAtPosition(x: number, y: number) {
    const imageData = this.ctx.getImageData(x, y, 1, 1).data;
    return 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
  }
}
