import { AfterContentInit, Component, ContentChild, Input, OnInit, QueryList } from '@angular/core';
import { AmexioImageComponent } from '../../../media/image/image.component';

@Component({
  selector: 'amexio-viewport-background',
  templateUrl: './viewport.background.component.html',
})
export class ViewportBackgroundComponent implements AfterContentInit, OnInit {

  @ContentChild(AmexioImageComponent) imageTemplate: AmexioImageComponent;
  bgCss: string;
  imagePath: string;

  @Input('background-color') backgroundColor: string;

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.imagePath = this.imageTemplate.path;
    this.bgCss = 'bgCss' + Math.floor(Math.random() * 1000) + 'background';
  }
}
