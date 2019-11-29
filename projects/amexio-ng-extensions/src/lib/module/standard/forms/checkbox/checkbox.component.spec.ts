import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AmexioCheckBoxComponent } from './checkbox.component';


describe('Amexio Check Box Component :', () => {
  let comp: AmexioCheckBoxComponent;
  let fixture: ComponentFixture<AmexioCheckBoxComponent>;
  let de: DebugElement;    // => Handle to to Components DOM instance
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AmexioCheckBoxComponent], // declare the test component
    });

    fixture = TestBed.createComponent(AmexioCheckBoxComponent);
     // => Fixture Creates the environment surrounding the component & the has access to the instance itself.
    comp = fixture.componentInstance;


    de = fixture.debugElement.query(By.css('label'));
    el = de.nativeElement;

    comp.required = true;
    comp.value = false;
   });

  it('define :AmexioCheckBoxComponent is defined', () => {
    expect(fixture.componentInstance).toBeTruthy();

  });
 // Check if correct field label is applied
  it('should display correct label', () => {
    const labelValue = 'UserName';
    comp.fieldlabel = labelValue;     // => Set the field label
    fixture.detectChanges();        // Fire Change
    expect(el.textContent).toContain(labelValue);  // check ?
  });

  it('ngOnInit', () => {
    comp.name = 'hobbies';
    comp.required = true;
    comp.value = false;
    spyOn(comp, 'generateName');
    spyOn(comp.isComponentValid, 'emit');

    fixture.detectChanges();

    expect(comp.componentId).toBeDefined();
    expect(comp.componentId).toContain('checkbox');
    expect(comp.generateName).toHaveBeenCalled();
    expect(comp.isValid).toBeFalsy();
    expect(comp.isComponentValid.emit).toHaveBeenCalledWith(!comp.required);

  });

  it('onInput():', () => {
    comp.required = true;
    comp.value = false;

    spyOn(comp.input, 'emit');

    comp.onInput();
    fixture.detectChanges();

    expect(comp.isValid).toBeFalsy();
    expect(comp.input.emit).toHaveBeenCalledWith(comp.value);

  });

  it('generateName(): If Method', () => {
    comp.name = null;
    comp.fieldlabel = 'checkbox';

    comp.generateName();
    fixture.detectChanges();

    expect(name).toEqual('');
    expect(comp.name).toContain('checkbox');
  });

  it('generateName() : createCompId Else Method', () => {
    comp.name = undefined;
    comp.fieldlabel = undefined;

    comp.generateName();
    fixture.detectChanges();

    expect(comp.name).toContain('textinput-');
  });

  it('onClick() : ', () => {
    comp.value = true;
    spyOn(comp.isComponentValid, 'emit');
    spyOn(comp.onSelection, 'emit');

    comp.onClick();
    fixture.detectChanges();

    expect(comp.value).toBeFalsy();
    expect(comp.isValid).toBeFalsy();
    expect(comp.isComponentValid.emit).toHaveBeenCalled();
    expect(comp.onSelection.emit).toHaveBeenCalled();
  });


  it('onBlur() : ', () => {
    comp.tabFocus = undefined;
    comp.onBlur();
    fixture.detectChanges();
    expect(comp.tabFocus).toBeFalsy();
  });

  it('onFocus() : ',() =>{
    comp.tabFocus = undefined;
    comp.onFocus();
    fixture.detectChanges();
    expect(comp.tabFocus).toBeTruthy();
  });

  it('checkValidity() :',()=>{
    comp.isValid = true;
    spyOn(comp,'checkValidity').and.returnValue(true);
    comp.checkValidity();
    expect(comp.checkValidity).toHaveBeenCalled();
  });
});
