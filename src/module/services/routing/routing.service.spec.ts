import { RouterService } from "./routing.service";
import { BehaviorSubject } from 'rxjs';
import {  Router } from '@angular/router';

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