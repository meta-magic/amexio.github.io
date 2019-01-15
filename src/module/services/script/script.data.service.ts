
import {Injectable} from '@angular/core';

@Injectable()
export class GoogleMapScriptService {

  constructor() {
  }

  loadScript(): any {
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = 'https://maps.google.com/maps/api/js?render=explicit';
    script.async = true;
    script.defer = true;
    return script;
  }
}
