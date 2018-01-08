/**
 * Created by pratik on 21/12/17.
 */
import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";
import {Icon, default as ICON_MAPS} from "./icon.mapping.config";

@Injectable()
export class IconLoaderService {
  get iconToUse(): Icon {
    if(this._iconToUse.toString() == null)
      return Icon.fontawesome;      // Default to be loaded
    else
      return this._iconToUse;
  }

  set iconToUse(value: Icon) {
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
