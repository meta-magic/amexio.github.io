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

    _htmlTemplate: string;
    _tsclass: any;

    @Input('html-template')
    set htmltemplate(v: string) {
        if (v != null && v.length > 0) {
            this._htmlTemplate = v;
            this.render();
        }
    }
    get htmltemplate() {
        return this._htmlTemplate;
    }

    @Input('ts-class')
    set tsclass(v: any) {
        if (v != null) {
            this._tsclass = v;
            this.render();
        }
    }
    get tsclass() {
        return this._tsclass;
    }

    @Output('onInit') oninit = new EventEmitter<any>();

    constructor(private _compiler: Compiler, private _injector: Injector, private _m: NgModuleRef<any>) {
    }

    ngOnInit() {
    }

    render() {
        if (!this.htmltemplate || this.htmltemplate.length === 0) {
            return;
        }

        if (!this.tsclass) {
            this.tsclass = defaultclass;
        }

        const tmpCmp = Component({ template: this.htmltemplate })(this.tsclass);

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
