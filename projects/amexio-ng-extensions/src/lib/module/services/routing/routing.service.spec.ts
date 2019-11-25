import {  Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { RouterService } from './routing.service';

/**
 * Created by dattaram on 7/8/18.
 */
describe('CommonDataService', () => {
let service: any;
let router: Router;
  let commonDataService: RouterService,
  serviceUrl, methodType,
  mockHttp: any;
beforeEach(() => {
    let routerEvent = new BehaviorSubject(null);
    service = new RouterService();

   });
it('get Router method ', () => {
    service.initializeRouter(router);
    service.routerEvent.next(router);

   });
});
