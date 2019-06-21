import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'amexio-nav-mobile',
    templateUrl: './navmobilemenu.html',
})
export class AmexioNavMobileMenuComponent implements AfterViewInit {

    @Input('nodes') nodes: any[];

    ngAfterViewInit() {
    }

    toggleMenu(event: any, node: any) {
        node['showInnerMenus'] = !node['showInnerMenus'];
    }
}
