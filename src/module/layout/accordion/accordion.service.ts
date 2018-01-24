/**
 * Created by pratik on 24/1/18.
 */
import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AccordionService {
  private subject = new Subject<any>();

  onClickEvent(data: number) {
    this.subject.next({ id: data });
  }

  clearEvents() {
    this.subject.next();
  }

  getEvents(): Observable<any> {
    return this.subject.asObservable();
  }
}
