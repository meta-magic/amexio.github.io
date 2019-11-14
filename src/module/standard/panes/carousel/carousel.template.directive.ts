/*
 Component Name : Amexio Carousel
 Component Selector : <[amexioTemplate]>
 Component Description : Amexio CarouselView displays a collection of
 images or other content in a horizontal layout with built-in navigation between the items.

*/

import {Directive, EmbeddedViewRef, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
@Directive({
  selector: '[amexioTemplate]',
})
export class AmexioTemplateDirective  {

  @Input() type: string;

  @Input('amexioTemplate') name: string;

  constructor(public template: TemplateRef<any>) {
  }
  getType(): string {
    return this.name;
  }
}
