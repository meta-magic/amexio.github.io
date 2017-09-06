/**
 * Created by pratik on 28/8/17.
 */
import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
declare var $;
@Component({
 selector: 'amexio-ee-youtube-player',
 template: `
   <div style="background-color: #666666">
     <div class="pull-right" style="cursor: pointer;" (click)="routeBackToApp()">
       <i class="fa fa-times fa-2x"  aria-hidden="true"></i>
     </div>
     <div class="text-center">
       <iframe height="98%" width="98%" 
               style="position: absolute; top: 0; right: 0; bottom: 0; left: 0;padding-top: 30px;padding-left: 30px"
               [src]="url" frameborder="0"
               allowfullscreen>
         
       </iframe>
     </div>
   </div>
 `
})

export class AmexioYoutubePlayerComponent implements OnInit {

  name:string;
  baseUrl:string = 'https://www.youtube.com/embed/';
  url: any;

  @Input()  videoId: string;

  @Output() closeVideo: any = new EventEmitter<any>();

  constructor(private sanitizer: DomSanitizer) {

  }

   ngOnInit() {
     this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.baseUrl + this.videoId);
   }
  routeBackToApp() {
    this.closeVideo.emit(this.videoId);
  }
}
