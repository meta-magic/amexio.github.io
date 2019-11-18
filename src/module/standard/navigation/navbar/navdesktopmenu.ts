import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'amexio-nav-desktop',
    templateUrl: './navdesktopmenu.html',
    styleUrls: ['./navdesktopmenu.css'],
})
export class AmexioNavDesktopMenuComponent implements AfterViewInit {

    @Input('nodes') nodes: any[];

    position = 'left';
    marginTop: any;
    @ViewChild('menus', /* TODO: add static flag */ { read: ElementRef , static: true}) public menus: ElementRef;
    @ViewChild('divRef', /* TODO: add static flag */ { read: ElementRef , static: true}) public divRef: ElementRef;

    @Output() onNavItemClick: any = new EventEmitter<any>();

    ngAfterViewInit() {
        setTimeout(() => {
            if (this.menus && this.menus.nativeElement) {
                if ((window.innerWidth - this.menus.nativeElement.getBoundingClientRect().right) < 300) {
                    this.position = 'right';
                } else {
                    this.position = 'left';
                }
            }

        }, 100);
    }

    onMouseOver(event: any, node: any) {
        debounceTime(200);
        if (node.submenus && node.submenus.length > 0) {
            node['showInnerMenus'] = true;
        }

    }

    onMouseLeave(event: any, node: any) {
        debounceTime(200);
        if (node.submenus && node.submenus.length > 0) {
            node['showInnerMenus'] = false;
        }
        this.nodes.forEach((innernode: any) => {
            innernode['showInnerMenus'] = false;
        });
    }

    onClick(_event: any, node: any) {
        this.onNavItemClick.emit({ data: node, event: _event });
    }

    onInnerClick(event: any) {
        this.onNavItemClick.emit(event);
    }
    onScroll() {
        const scrollBottom = this.divRef.nativeElement.scrollHeight - this.divRef.nativeElement.clientHeight;
        const marginTop = 330 - (scrollBottom - this.divRef.nativeElement.scrollTop);
        this.marginTop = '-' + marginTop + 'px';
    }
}
