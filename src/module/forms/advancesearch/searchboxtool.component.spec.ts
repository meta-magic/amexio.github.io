import { SearchboxtoolComponent } from './searchboxtool.component';
import { IconLoaderService } from '../../../index';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef, ElementRef } from '@angular/core';
import { AmexioButtonComponent } from './../buttons/button.component';
import { AmexioFormIconComponent } from './../icon/icon.component';
import { CommonDataService } from '../../services/data/common.data.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('searchboxtool ', () => {
  let comp: SearchboxtoolComponent;
  let fixture: ComponentFixture<SearchboxtoolComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [SearchboxtoolComponent, AmexioFormIconComponent, AmexioButtonComponent],
      providers: [IconLoaderService,  CommonDataService,HttpClient,HttpHandler]
    });
    fixture = TestBed.createComponent(SearchboxtoolComponent);
    comp = fixture.componentInstance;
    event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);
   });

   it('set data', () => {
    let value = '';
    comp._data = value;
    expect(comp._data).toEqual(value);

      comp['componentLoaded'] = true;
      expect(comp['componentLoaded']).toEqual(true);
      comp.updateComponent();
  });

    it('true is true', () => 
    expect(true).toBe(true));
  });
