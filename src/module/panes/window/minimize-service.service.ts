import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MinimizeService {

  cureentWidnowData: any[] = [];
  private messageSource = new BehaviorSubject<any>('');
  public currentMessage: Observable<any> = this.messageSource.asObservable();
  constructor() {
  }
  onMinimizeClick(itemData: any) {
    if (this.cureentWidnowData && this.cureentWidnowData.length === 0) {
      this.cureentWidnowData.push(itemData);
    } else {
      let isFlag = false;
      this.cureentWidnowData.forEach((item: any) => {
        if (itemData.amexioComponentId === item.amexioComponentId) {
          isFlag = true;
        }
      });
      if (!isFlag) {
        this.cureentWidnowData.push(itemData);
      }
    }
    this.messageSource.next(this.cureentWidnowData);
  }
  onCloseClick(data: any) {
    if (this.cureentWidnowData) {
      this.cureentWidnowData.forEach((item: any, index: number) => {
        if (data.amexioComponentId === item.amexioComponentId) {
          this.cureentWidnowData.splice(index, 1);
          this.messageSource.next(this.cureentWidnowData);
        }
      });
    }
  }
}
