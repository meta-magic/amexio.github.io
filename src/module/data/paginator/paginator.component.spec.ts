/**
 * Created by pratik on 11/12/17.
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from '../../../index';
import { AmexioPaginatorComponent } from './paginator.component';
import { stringify } from 'querystring';

describe('amexio-paginator', () => {
  it('true is true', () => expect(true).toBe(true));
  
  let comp: AmexioPaginatorComponent;
  let fixture: ComponentFixture<AmexioPaginatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AmexioPaginatorComponent],
      providers: [IconLoaderService],
    });
    fixture = TestBed.createComponent(AmexioPaginatorComponent);
    comp = fixture.componentInstance;
  });

  it('check variable Definations', () => {
    expect((<any>comp).fullPageSet.length).toEqual(0);
    expect((<any>comp).activePages.length).toEqual(0);
    expect((<any>comp).pageIndex.length).toEqual(0);
    
  });

});
