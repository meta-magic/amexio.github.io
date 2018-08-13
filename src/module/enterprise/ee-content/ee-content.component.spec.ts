import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from '../../../index';
import { ContentComponent } from './ee.content';
import { AmexioRatingComponent } from './../../forms/rating/rating.component';

import { toUnicode } from 'punycode';

describe('amexio-ee-content', () => {
    let comp: ContentComponent;
    let fixture: ComponentFixture<ContentComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [ContentComponent,AmexioRatingComponent],
            providers: [IconLoaderService],
        });
        fixture = TestBed.createComponent(ContentComponent);
        comp = fixture.componentInstance;
    });

    it('closeEnable boolean', () => {
        comp.closeEnable =( <any>true);
        expect(comp.closeEnable).toEqual(true);
    });

    it('check playvideo  method',() => {
        comp.playVideo();
        comp.onWatchClick.subscribe((g: any) => {
            expect(comp.videoLink).toEqual(g);
          });
    });
    it('check closeDetailPage  method',() => {
        comp.closeDetailPage();
        comp.onCloseClick.subscribe((g: any) => {
            expect(comp.title).toEqual(g);
          });
    });

    it('check likeClick  method',() => {
        comp.likeClick();
        comp.overviewData = ('title,rate');
        comp.onLikeClick.subscribe((g: any) => {
            expect(comp.overviewData).toEqual(g);
          });
    });
    it('check unlikeClick  method',() => {
        comp.unlikeClick();
        comp.overviewData = ('title,rate');
        comp.onUnlikeLikeClick.subscribe((g: any) => {
            expect(comp.overviewData).toEqual(g);
          });
    });

    

    
});
    