import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'amexio-nav-mobile',
    templateUrl: './navmobilemenu.html',
})
export class AmexioNavMobileMenuComponent implements AfterViewInit {

    @Input('nodes') nodes: any[];

    @Output() onNavItemClick: any = new EventEmitter<any>();

    ngAfterViewInit() {
    }

    toggleMenu(_event: any, node: any) {
        node['showInnerMenus'] = !node['showInnerMenus'];
        this.onNavItemClick.emit({ data: node, event: _event });
    }

    onInnerClick(event: any) {
        this.onNavItemClick.emit(event);
    }
}
