import {Directive, EmbeddedViewRef, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from "@angular/core";
@Directive({
  selector: '[amexioTemplate]', host: {}
})
export class AmexioTemplate {

  @Input() type: string;

  @Input('amexioTemplate') name: string;

  constructor(public template: TemplateRef<any>) {
  }

  getType(): string {
    return this.name;
  }
}


@Directive({
  selector: '[amexioTemplateWrapper]'
})
export class AmexioTemplateWrapper implements OnInit, OnDestroy {

  @Input() index: number;

  @Input('amexioTemplateWrapper') templateRef: TemplateRef<any>;

  view: EmbeddedViewRef<any>;

  _item: any;

  constructor(public viewContainer: ViewContainerRef) {
  }

  ngOnInit() {
    this.render();
  }

  set item(item: any) {
    this._item = item;

    if (this.view) {
      this.view.destroy();
      this.render();
    }
  }

  @Input() get item(): any {
    return this._item;
  }

  render() {
    this.view = this.viewContainer.createEmbeddedView(this.templateRef, {
      '\$implicit': this.item, 'index': this.index
    });
  }

  ngOnDestroy() {
    this.view.destroy();
  }
}
