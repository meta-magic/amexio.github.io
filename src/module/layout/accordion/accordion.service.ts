/**
 * Created by pratik on 24/1/18.
 */
import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/index';
import {Observable} from 'rxjs/index';

@Injectable()
export class AccordionService {
  private subject = new Subject<any>();

  onClickEvent(data: number, parent: number) {
    this.subject.next({data, parent});
  }

  clearEvents() {
    this.subject.next();
  }

  getEvents(): Observable<any> {
    return this.subject.asObservable();
  }
}
