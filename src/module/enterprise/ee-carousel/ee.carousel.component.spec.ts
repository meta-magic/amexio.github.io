import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index';
import { AmexioImageComponent } from '../../media/image/image.component';
import { MultiMediaCarouselComponent } from './ee.carousel.component';
import { AmexioRatingComponent } from './../../forms/rating/rating.component';
import { ContentComponent } from '../ee-content/ee.content';

describe('amexio-ee-content', () => {
    let comp: MultiMediaCarouselComponent;
    let fixture: ComponentFixture<MultiMediaCarouselComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [MultiMediaCarouselComponent, ContentComponent, AmexioRatingComponent, AmexioImageComponent],
            providers: [IconLoaderService],
        });
        fixture = TestBed.createComponent(MultiMediaCarouselComponent);
        comp = fixture.componentInstance;
    });

    it('playVideo  method check ', () => {
        let video: any;
        comp.playVideo(video);
        comp.onVideoLoad.subscribe((g: any) => {
            expect(video).toEqual(g);
        });
    });

    it('ngOnInit method check ',() => {

        comp.carouselStyle = 'horizontal';
        comp.ngOnInit();
        expect(comp.carouselStyle).toBe('horizontal');
        
    });
});

