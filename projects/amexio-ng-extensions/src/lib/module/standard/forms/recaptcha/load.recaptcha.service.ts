
import {Injectable} from '@angular/core';

@Injectable()
export class LoadRecaptchaService {

  constructor() {
  }

  loadScript(): any {
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    return script;
  }
}
