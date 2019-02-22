import { HttpClientModule } from '@angular/common/http';
import {
    Compiler, Component, EventEmitter, Injector, Input, NgModule, NgModuleRef, OnInit, Output,
    ViewChild, ViewContainerRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AmexioWidgetModule } from '../amexio.widget.module';

import { defaultclass } from './amexio.arc.constant';

@Component({
    selector: 'amexio-runtime',
    template: '<div #vc></div>',
})
export class AmexioRuntimeComponent implements OnInit {

    @ViewChild('vc', { read: ViewContainerRef }) _container: ViewContainerRef;

    @Input('html-template') htmlTemplate: string;

    @Input('ts-class') tsClass: any;

    @Output('onInit') oninit = new EventEmitter<any>();

    constructor(private _compiler: Compiler, private _injector: Injector, private _m: NgModuleRef<any>) {
    }

    ngOnInit() {
        this.render();
    }

    render() {
        if (!this.htmlTemplate || this.htmlTemplate.length === 0) {
            this.htmlTemplate = 'TEMPLATE NOT DEFINED';
        }

        if (!this.tsClass) {
            this.tsClass = defaultclass;
        }

        const tmpCmp = Component({ template: this.htmlTemplate })(this.tsClass);

        const tmpModule = NgModule({
            providers: [HttpClientModule], imports: [FormsModule, AmexioWidgetModule, HttpClientModule],
            declarations: [tmpCmp],
            entryComponents: [tmpCmp],
        })(defaultclass);

        this._compiler.compileModuleAsync(tmpModule)
            .then((moduleFactory) => {
                const resolver = moduleFactory.create(this._injector).componentFactoryResolver;
                const f = resolver.resolveComponentFactory(tmpCmp);
                const cmpRef = f.create(this._injector, [], null, this._m);
                this._container.insert(cmpRef.hostView);
                const object = { reference: cmpRef, instance: cmpRef.instance };
                this.oninit.emit(object);
            });
    }
}
