import { Injectable } from '@angular/core';

@Injectable()
export class GoogleMapScriptService {

  loadScript(id: string): any {
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = 'https://maps.google.com/maps/api/js?key=' + id;
    script.async = true;
    script.defer = true;
    return script;
  }

  // THIS METHOD IS USED FOR CHEKING SCIRPT IS PRESENT IN BODY OT NOT
  isScriptAlreadyPresent(script: any): boolean {
    const scripts = document.getElementsByTagName('script');
    let isScriptLoaded: boolean;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < scripts.length; i++) {
      const scriptData = scripts[i];
      if (scriptData.src === script) {
        isScriptLoaded = true;
      }
    }
    return isScriptLoaded;
  }
}
