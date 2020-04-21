import { Component, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { MinimizeService } from '../../panes/window/minimize-service.service';

@Component({
    selector: 'amexio-browser-panel',
    templateUrl: './browser-panel.component.html',
})
export class BrowserPanelComponent implements OnInit {

    @Input('url') url: string;

    @Input('browser-name') textName: string;

    @Input('url-field-editable') urlFieldEditable = false;

    @Input('browser-in-window') showBrowserWithWindow = false;

    @Input('reload-button') reloadBtn = false;

    @Input('show') show = false;

    @Output() showChange: any = new EventEmitter<any>();
    @Output('onClose') onclose: any = new EventEmitter<any>();
    amexioComponentId = 'amexio-browser' + Math.floor(Math.random() * 1000 + 999);

    iframeurl: SafeResourceUrl;

    // Html reference with view child.
    @ViewChild('fullscreen') fullscreen: any;
    @ViewChild('loadSite') loadSite: any;
    @ViewChild('newURL') newURL: any;
    lockIconShow = false;
    globalListenFunc: () => void;
    constructor(private sanitizer: DomSanitizer, private renderer: Renderer2, private _browserService: MinimizeService) {
    }

    ngOnInit() {
        if (this.url && this.url.indexOf('https') === 0) {
            this.lockIconShow = true;
        }

        this.globalListenFunc = this.renderer.listen('document', 'keyup.esc', (e: any) => {
            if (this.showBrowserWithWindow) {
                this.show = false;
                this.showChange.emit(this.show);
            }
        });

        this.iframeurl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    }
    onCloseClick() {
        this.show = false;
        this._browserService.onCloseClick(this);
        this.showChange.emit(this.show);
        this.onclose.emit();

    }
    browserShowOnBtn() {
        this.show = true;
        this.showChange.emit(this.show);

    }
    onMinimizeClick() {
        this.show = false;
        this._browserService.onMinimizeClick(this);
        this.showChange.emit(this.show);
    }

    onReloadPage() {
        if (this.newURL) {
            this.loadSite.nativeElement.src = this.newURL.nativeElement.innerHTML;
        }
    }
    maxScreenChange() {
        if (this.showBrowserWithWindow) {
            const elem = this.fullscreen.nativeElement;
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.mozRequestFullScreen) { /* Firefox */
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) { /* IE/Edge */
                elem.msRequestFullscreen();
            }
        } else {
            this.showBrowserWithWindow = true;
        }
    }
}
