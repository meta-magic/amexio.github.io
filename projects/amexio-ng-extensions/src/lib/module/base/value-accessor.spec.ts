// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { DebugElement } from '@angular/core';
// import { FormsModule } from "@angular/forms";
// import { ValueAccessorBaseComponent } from "./value-accessor";

// describe('value-accessor', () => {
//     let comp: ValueAccessorBaseComponent<any>;
//     let fixture: ComponentFixture<ValueAccessorBaseComponent<any>>;
//     let de: DebugElement;    // => Handle to to Components DOM instance
//     let el: HTMLElement;

//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             imports: [FormsModule],
//             declarations: [ValueAccessorBaseComponent], // declare the test component
//         });

//         fixture = TestBed.createComponent(ValueAccessorBaseComponent);  // => Fixture Creates the environment surrounding the component & the has access to the instance itself.
//         comp = fixture.componentInstance;
//     });

//     it('createCompId If Method', () => {
//         let inputType = 'checkbox';
//         let name = '';
//         comp.createCompId(inputType, name);
//         expect(name).toEqual('');
//         return inputType + '_' + Math.floor(Math.random() * 1000 + 999);
//     })

//     it('createCompId If Method', () => {
//         let inputType = 'checkbox';
//         let name = null;
//         comp.createCompId(inputType, name);
//         expect(name).toEqual(null);
//         return inputType + '_' + Math.floor(Math.random() * 1000 + 999);
//     });

//     it('createCompId If Method', () => {
//         let inputType = '';
//         let name = null;
//         comp.createCompId(inputType, name);
//         expect(name).toEqual(null);
//         return inputType + '_' + Math.floor(Math.random() * 1000 + 999);
//     });

//     it('createCompId else Method', () => {
//         let inputType = 'checkbox';
//         let name = 'kedar';
//         comp.createCompId(inputType, name);
//         expect(name).not.toEqual('');
//         expect(name).not.toEqual(null);
//         return inputType + '_' + name;
//     });

// });
