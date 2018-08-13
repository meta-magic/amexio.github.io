import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from '../../../index';
import { AmexioImageComponent } from '../../media/image/image.component';

import { ContentComponent } from './ee.content';
import { AmexioRatingComponent } from './../../forms/rating/rating.component';

import { toUnicode } from 'punycode';

describe('amexio-ee-content', () => {
    let comp: ContentComponent;
    let fixture: ComponentFixture<ContentComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [ContentComponent, AmexioImageComponent, AmexioRatingComponent],
            providers: [IconLoaderService],
        });
        fixture = TestBed.createComponent(ContentComponent);
        comp = fixture.componentInstance;
    });

    it('closeEnable boolean', () => {
        comp.closeEnable = (<any>true);
        expect(comp.closeEnable).toEqual(true);
    });

    it('check playvideo  method', () => {
        comp.playVideo();
        comp.onWatchClick.subscribe((g: any) => {
            expect(comp.videoLink).toEqual(g);
        });
    });
    it('check closeDetailPage  method', () => {
        comp.closeDetailPage();
        comp.onCloseClick.subscribe((g: any) => {
            expect(comp.title).toEqual(g);
        });
    });

    it('check likeClick  method', () => {
        comp.likeClick();
        comp.overviewData = ('title,rate');
        comp.onLikeClick.subscribe((g: any) => {
            expect(comp.overviewData).toEqual(g);
        });
    });
    it('check unlikeClick  method', () => {
        comp.unlikeClick();
        comp.overviewData = ('title,rate');
        comp.onUnlikeLikeClick.subscribe((g: any) => {
            expect(comp.overviewData).toEqual(g);
        });
    });
    it('check addToList  method', () => {
        comp.addToList();
        comp.overviewData = ('title,description,videoLink,rate');
        comp.onAddListClick.subscribe((g: any) => {
            expect(comp.overviewData).toEqual(g);
        });
    });

    it('getClassName method check', () => {
        comp.smallScreen = true;
        comp.getClassName();
        expect(comp.smallScreen).toEqual(true);
        comp.smallScreen = false;
        comp.getClassName();
        expect(comp.smallScreen).toEqual(false);
    });


    it('onnginit method check', () => {
        comp.ngOnInit();
        let wi = window.innerWidth;
        expect(wi).toBeGreaterThan(768);
        wi = 700;
        expect(wi).toBeLessThan(768);
    });


    // it('onResize method check', () => {
    //     comp.onResize(event);
    //     let re = event.target.innerwidth ;
    //    // event.target.innerWidth = 900;
    //     expect(comp.smallScreen).toEqual(true);
    // });





});
