/**
 * Created by pratik on 17/8/17.
 */
import { Injectable } from '@angular/core';
declare var google;
@Injectable()
export class ChartLoaderService {
 constructor() {
   this.loadScript();
 }

 loadScript(){
     if(typeof google == 'undefined'){
         let script = document.createElement('script');
         script.type = 'text/javascript';
         script.src = 'https://www.gstatic.com/charts/loader.js';
         document.getElementsByTagName('head')[0].appendChild(script);
     }
 }
}
