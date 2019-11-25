import { AfterContentChecked, AfterContentInit, Directive, Input, OnInit, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[amexio-dynamic-text]',
})
export class DynamicTextDirective implements OnInit, AfterContentChecked {

    @Input('placeholder') jsonData: any;

    constructor(private viewContainerRef: ViewContainerRef) {

    }

    ngOnInit() {
    }

    ngAfterContentChecked() {
        const hostelement = this.viewContainerRef.element.nativeElement;
        this.iterateHTMLDOM(hostelement);
    }

    iterateHTMLDOM(element: any) {
        if (element.nodeType === 3) {
            let str = element.textContent;
            const strarr = element.textContent.split(' ');
            for (const [key, value] of Object.entries(this.jsonData)) {
                strarr.forEach((strelement: any) => {
                    if (key === strelement) {
                        str = str.replace(key, value as string);
                    }
                });
                element.textContent = str;
            }
        } else {
            if (element.hasChildNodes()) {
                element.childNodes.forEach((innerElement: any) => {
                    this.iterateHTMLDOM(innerElement);
                });
            }

        }
    }
}
