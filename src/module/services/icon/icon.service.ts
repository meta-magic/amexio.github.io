/**
 * Created by pratik on 21/12/17.
 */
import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";
import {Icon, default as ICON_MAPS} from "./icon.mapping.config";

@Injectable()
export class IconLoaderService {
  get iconToUse(): any {
    let iconToUse;
    if(this._iconToUse == null){
      iconToUse = 'fa';
    }
    else{
      if(this._iconToUse!=null && this._iconToUse.toString() == null)
        iconToUse =  this._iconToUse
    }
      return iconToUse;
  }

  set iconToUse(value: any) {
    this._iconToUse = value;
    if(this._iconToUse != null){
      this.iconMappings = ICON_MAPS;
    }
  }
  private _iconToUse : Icon;

  private iconSubject : Subject<any>;

  iconMappings : any[];

  constructor() {}

  modifyIconClass(componentKey : string,newValue : string){
    if(this.iconMappings != null){
      this.iconMappings.forEach( (icon : any)=>{
        if(icon.component == componentKey){
          icon[this.iconToUse.toString()] = newValue;
        }
      })
    }
  }


}
