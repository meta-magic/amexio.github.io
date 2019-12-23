import { HttpClient,HttpClientModule } from '@angular/common/http';
import {ViewChildren} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LifeCycleBaseComponent } from '../../../base/lifecycle.base.component';
import { DeviceQueryService } from '../../../services/device/device.query.service';
import { AmexioDropDownMenuComponent } from './dropdownmenu.component';
import { AmexioDropDownItemsComponent } from './dropdownmenu.items.component';
describe('Amexio DropDownMenu Component', () => {
  let comp: AmexioDropDownMenuComponent;
  let fixture: ComponentFixture<AmexioDropDownMenuComponent>;

  let mydata:any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AmexioDropDownMenuComponent, AmexioDropDownItemsComponent],
      providers: [DeviceQueryService,
    ],

    });
    fixture = TestBed.createComponent(AmexioDropDownMenuComponent);
    comp = fixture.componentInstance;

    mydata = {
      "data": [
        {"fruitName": "Apple","code": "Apple","checked":false},
        {"fruitName": "Oranges","code": "Oranges","checked":false},
        {"fruitName": "Watermelon","code": "Watermelon","checked":false},
        {"fruitName": "Avacado","code": "Avacado","checked":false},
        {"fruitName": "Grapes","code": "Grapes","checked":false},
        {"fruitName": "Mango","code": "Mango","checked":false},
        {"fruitName": "Banana","code": "Banana","checked":false},   
        {"fruitName": "Kiwi","code": "Kiwi","checked":false},
        {"fruitName": "Strawberry","code": "Strawberry","checked":false}
      ]
    }
  });

  it('Component created', () => {
    expect(fixture.componentInstance).toBeDefined();
  });

  it('constructor call ()', () => {

    fixture.detectChanges();

    expect(comp.componentId).toContain('dropdownmenu');
    expect(comp.padding).toContain('5px 10px');
    expect(comp.iconalign).toBe('left');
    expect(comp.setRoundEdge).toBeTruthy();
  });


  it('ngOnInit()', () => {

    spyOn(comp, 'generateIndex');
    comp.generateIndex(mydata);
    fixture.detectChanges();
    expect(comp.generateIndex).toHaveBeenCalled();
  });

  it('ngOnInit(): negate', () => {
    spyOn(comp, 'generateIndex');

    expect(comp.generateIndex).not.toHaveBeenCalled();
  });

  it('onDropDownMenuClick(): ',()=>{
    comp.toggle = false;
    spyOn(comp.onClick,'emit');
    comp.onClick.emit();
    fixture.detectChanges();
    expect(comp.toggle).toBeFalsy();
    expect(comp.onClick.emit).toHaveBeenCalled();
  });

  it('onDropDownMenuClick(): negate',()=>{
    comp.toggle = false;
    spyOn(comp.onClick,'emit');

    fixture.detectChanges();

    expect(comp.toggle).toBeFalsy();
    expect(comp.onClick.emit).not.toHaveBeenCalled();
  });


});
