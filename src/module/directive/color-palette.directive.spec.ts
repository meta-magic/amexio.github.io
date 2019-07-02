import { ColorPaletteDirective } from './color-palette.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { ViewContainerRef } from '@angular/core';

// fdescribe('ColorPaletteDirective', () => {
//   let comp: ColorPaletteDirective;
//   let fixture: ComponentFixture<ColorPaletteDirective>;
//   let service: ColorPaletteDirective;
//   let _viewContainerRef: ViewContainerRef;
//   let _httpClient: HttpClient
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [FormsModule],
//       declarations: [ColorPaletteDirective],
//     });
//     fixture = TestBed.createComponent(ColorPaletteDirective);
//     comp = fixture.componentInstance;
//   });
//   it('should create an instance', () => {
//     service = new ColorPaletteDirective(_viewContainerRef, _httpClient);
//   });
//   it('check variable themejson', () => {
//     comp.ngOnInit();
//     comp.themejson
//   })
// });
describe('Directive: Color', () => {
  let comp: ColorPaletteDirective;
  let fixture: ComponentFixture<ColorPaletteDirective>;
  let service: ColorPaletteDirective;
  let _viewContainerRef: ViewContainerRef;
  let _httpClient: HttpClient

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColorPaletteDirective]
    });
  });
  it('should create an instance', () => {
    service = new ColorPaletteDirective(_viewContainerRef, _httpClient);
  });
});
