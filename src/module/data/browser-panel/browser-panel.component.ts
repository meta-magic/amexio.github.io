import { Component, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'amexio-browser-panel',
    templateUrl: './browser-panel.component.html',
})
export class BrowserPanelComponent implements OnInit {

    @Input('url') url: string;

    @Input('url-field-editable') urlFieldEditable = false;

    @Input('browser-in-window') showBrowserWithWindow = false;

    @Input('reload-button') reloadBtn = false;

    @Input('show') showBrowser = false;

    @Output() showChange: any = new EventEmitter<any>();
    iframeurl: SafeResourceUrl;

    // Html reference with view child.
    @ViewChild('fullscreen') fullscreen: any;
    @ViewChild('loadSite') loadSite: any;
    @ViewChild('newURL') newURL: any;
    hideBtn = false;
    lockIconShow = false;
    globalListenFunc: () => void;
    constructor(private sanitizer: DomSanitizer, private renderer: Renderer2) {
    }

    ngOnInit() {
        if (this.url.indexOf('https') === 0) {
            this.lockIconShow = true;
        }

        this.globalListenFunc = this.renderer.listen('document', 'keyup.esc', (e: any) => {
            if (this.showBrowserWithWindow) {
                this.showBrowser = false;
                this.showChange.emit(this.showBrowser);
            }
        });

        this.iframeurl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
        this.hideBtn = false;
    }
    onCloseClick() {
        this.showBrowser = false;
        this.showChange.emit(this.showBrowser);

    }
    browserShowOnBtn() {
        this.showBrowser = true;
        this.hideBtn = false;
        this.showChange.emit(this.showBrowser);

    }
    onMinimizeClick() {
        this.showBrowser = false;
        this.hideBtn = true;
        this.showChange.emit(this.showBrowser);

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
