import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CeMinimizeService {

  cureentWidnowData: any[] = [];
  private creativeMessage = new BehaviorSubject<any>('');
  public observableMessage: Observable<any> = this.creativeMessage.asObservable();
  constructor() {
  }
  onMinimizebtnClick(itemData: any) {
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
    this.creativeMessage.next(this.cureentWidnowData);
  }
  onCloseClick(data: any) {
    if (this.cureentWidnowData) {
      this.cureentWidnowData.forEach((item: any) => {
        if (data.amexioComponentId === item.amexioComponentId) {
          this.cureentWidnowData.splice(item, 1);
          this.creativeMessage.next(this.cureentWidnowData);
        }
      });
    }
  }
}
