import { ColorPaletteDirective } from './color-palette.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { ViewContainerRef } from '@angular/core';
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

});
