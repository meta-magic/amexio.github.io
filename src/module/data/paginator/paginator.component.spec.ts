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
  it('ngoninit check ', () => {
    comp.ngOnInit();
    expect('medium').toEqual(comp.size);

  });

  it('init pages change', () => {


    comp.rows = 10;
    comp.pages = 2;
    comp.initializePages();
    expect(comp.rows).toEqual(2);
    expect((<any>comp).fullPageSet.length).toEqual(2);
    comp.pages = 11;
    comp.initializePages();
    expect((<any>comp).fullPageSet.length).toEqual(11);
    expect((<any>comp).activePageIndex).toEqual(0);
    expect((<any>comp).currentRowIndex).toEqual(0);

    // expect((<any>comp).activePages.length).toEqual(0);

    // expect((<any>comp).pageIndex.length).toEqual(0);

  });

  it('init pages is null', () => {
    comp.initializePages();
    comp.rows = null;
    comp.activePage = 0;
    expect(comp.rows).toEqual(null);
    expect((<any>comp).fullPageSet.length).toEqual(0);
    expect((<any>comp).activePage).toEqual(0);

  });

  it('check onFirstClick method ', () => {
    comp.onFirstClick();
    comp.onPageChange.subscribe((g: any) => {
      expect(comp.activePage).toEqual(g);
    });
  });

  it('check onLastClick method ', () => {
    comp.onLastClick();
    comp.onPageChange.subscribe((g: any) => {
      expect(comp.activePage).toEqual(g);
    });
  });

  it('check onPrevious method ', () => {
    comp.onPrevious();
    comp.activePageIndex = 2;
    comp.onPageChange.subscribe((g: any) => {
      expect(comp.activePage).toEqual(g);
    });
  });

  it('check onNext method ', () => {
    comp.onNext();
    comp.activePageIndex = 2;
    comp.onPageChange.subscribe((g: any) => {
      expect(comp.activePage).toEqual(g);
    });

  });

  it('check onPageClick method ', () => {
    let page = 2;
    let index = 2;
    comp.onPageClick(page,index);
    comp.activePageIndex = 2;
    comp.onPageChange.subscribe((g: any) => {
      expect(comp.activePage).toEqual(g);
    });
  });


  it('check changeRows method is not null ', () => {
    let rowNumber = 2;
    let inDx = 2;
    let event: any;
    comp.changeRows(rowNumber,inDx,event);
    expect(rowNumber).toEqual(2);

    (<any>comp).onPageChangeMethod(inDx);
    comp.show = false;
    expect(comp.show).toEqual(false);

  });

  it('check changeRows method is null', () => {
    let rowNumber = 0;
    let inDx = 0;
    let event: any;
    comp.pages = -1;
    comp.changeRows(rowNumber,inDx,event);
    expect(rowNumber).toBeGreaterThan(comp.pages);
    
  });



  it('setRows  method testing',() => {
    let rowNumber = 2;
    comp.setRows(rowNumber);
    comp.pages = 1;
    expect(rowNumber).toBeGreaterThan(comp.pages);
    expect(comp.currentRow).toEqual(rowNumber);
  });


  it('check previous method ', () => {
    comp.onPrevious();
    comp.activePageIndex = 0;
    const index = comp.fullPageSet.indexOf(this.activePage) 
    expect(index).toEqual(-1);
  });

  it('getCurrentRow private method',() => {
let rowNumber = 2;
    (<any>comp).getCurrentRow(rowNumber);
    expect(comp.currentRow-comp.rows).not.toEqual(0);
  })

  it('showcolumnoptions method check',() => {
    comp.showColumnOptions();
    expect(comp.show).toEqual(true);
  });



  
});
