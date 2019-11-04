import { Component, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

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

    iframeurl: SafeResourceUrl;

    @ViewChild('fullscreen') fullscreen: any;
    @ViewChild('loadSite') loadSite: any;
    @ViewChild('newURL') newURL: any;
    hideBtn = false;
    showBrowser = true;
    lockIconShow = false;
    globalListenFunc: () => void;
    constructor(private sanitizer: DomSanitizer, private renderer: Renderer2) {
    }

    ngOnInit() {
        if (this.url.indexOf('https') === 0) {
            this.lockIconShow = true;
        }

        this.globalListenFunc = this.renderer.listen('document', 'keyup.esc', (e: any) => {
            this.showBrowserWithWindow = false;
        });

        this.iframeurl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
        this.hideBtn = false;
    }
    onCloseClick() {
        this.showBrowser = false;
    }
    browserShowOnBtn() {
        this.showBrowser = true;
        this.hideBtn = false;
    }
    onMinimizeClick() {
        this.showBrowser = false;
        this.hideBtn = true;
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
