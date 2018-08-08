import {IconLoaderService} from "./icon.service";
import {inject,TestBed} from "@angular/core/testing";
/**
 * Created by dattaram on 8/8/18.
 */
describe('IconLoaderService',() =>{
  let service : any;
  let ICON_MAPPING =
    [
      {
        component: 'datepicker_previous',
        fa: 'fa fa-chevron-left',
        mat: 'keyboard_arrow_left',
      }
      ];
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IconLoaderService]
    });
    service = new IconLoaderService();
  });

  it('It should created', inject([IconLoaderService], (service: IconLoaderService) => {
    expect(service).toBeTruthy();
    service.iconMappings = ICON_MAPPING;
  }));

  it('get iconToUse',()=>{
    service._iconToUse = 'fa fa-clock-o';
    expect(service._iconToUse).not.toBeNull();
    expect(service._iconToUse).toBe(service._iconToUse);

    service._iconToUse = null;
    expect(service._iconToUse).toBeNull();
    service._iconToUse = 'fa';
    
  });

  it('set iconToUse',()=>{
    const value = jasmine.any(String);
    service._iconToUse = value;
  });

//   it('modifyIconClass',()=>{
//     let componentKey = 'datepicker_previous';
//     let newValue = 'fa fa-clock-o';
//     service.modifyIconClass(componentKey,newValue);
//     expect(service.iconMappings).not.toBeNull();
//     ICON_MAPPING.forEach((icon: any) => {
//       expect(icon.component).toEqual(componentKey);
//       icon[service._iconToUse] = newValue;
//     });
//   });


});