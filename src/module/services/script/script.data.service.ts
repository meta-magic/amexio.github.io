
import {Injectable} from '@angular/core';

@Injectable()
export class GoogleMapScriptService {

  constructor() {
  }

  loadScript(id: string): any {
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = 'https://maps.google.com/maps/api/js?key=' + id;
    script.async = true;
    script.defer = true;
    return script;
  }
}
