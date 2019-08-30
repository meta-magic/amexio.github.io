// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { DebugElement } from '@angular/core';
// import { FormsModule } from "@angular/forms";
// import { ValueAccessorBase } from "./value-accessor";


// describe('amexio-value-accessor', () => {
//   let comp: MyClass;
//   let fixture: ComponentFixture<MyClass>;
//   let de: DebugElement;    // => Handle to to Components DOM instance
//   let el: HTMLElement;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [FormsModule],
//       declarations: [ValueAccessorBase], // declare the test component
//     });

//     fixture = TestBed.createComponent(MyClass);  // => Fixture Creates the environment surrounding the component & the has access to the instance itself.
//     comp = fixture.componentInstance;
//   });

//   class MyClass extends ValueAccessorBase<any> {
//     // just mock any abstract method
//     createCompId(c: any, b: any) {
//         return c + '_' + Math.floor(Math.random() * 1000 + 999);  
//     }
//   }

//   it('createCompId If Method', () => {
//     let inputType = 'checkbox';
//     comp.createCompId(inputType, name);
//     expect(name).toEqual('');
//     expect(name).toEqual(null);
//     return inputType + '_' + Math.floor(Math.random() * 1000 + 999);
//   })

//   it('createCompId Else Method', () => {
//     let inputType = 'checkbox';
//     comp.createCompId(inputType, name);
//     expect(name).not.toEqual('');
//     expect(name).not.toEqual(null);
//     return inputType + '_' + name;
//   })
 
// });
