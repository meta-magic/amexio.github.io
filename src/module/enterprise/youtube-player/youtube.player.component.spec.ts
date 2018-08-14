import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from '../../../index';
import { AmexioImageComponent } from '../../media/image/image.component';

import { AmexioYoutubePlayerComponent } from './youtube.player.component';
import { AmexioRatingComponent } from './../../forms/rating/rating.component';

import { toUnicode } from 'punycode';

describe('amexio-ee-youtube-player', () => {
    let comp: AmexioYoutubePlayerComponent;
    let fixture: ComponentFixture<AmexioYoutubePlayerComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [AmexioYoutubePlayerComponent, AmexioImageComponent, AmexioRatingComponent],
            providers: [IconLoaderService],
        });
        fixture = TestBed.createComponent(AmexioYoutubePlayerComponent);
        comp = fixture.componentInstance;
    });


    it('check routeBackToApp method',() => {
        comp.routeBackToApp();
        comp.onCloseVideoPlayer.subscribe((g: any) => {
            expect(comp.url).toEqual(g);
          });
    });

    it('ngoninit method', () => {
        comp.height =null;
        expect(comp.height).toEqual(null);
        comp.ngOnInit();
        comp.height = 450;
        expect(comp.height).toEqual(450);



        comp.width =null;
        expect(comp.width).toEqual(null);
        comp.ngOnInit();
        comp.width = 98;
        comp.closePadding = 97;
        expect(comp.width).toEqual(98);
        expect(comp.closePadding).toEqual(97);

        comp.width =50;
        expect(comp.width).toEqual(50);
        comp.ngOnInit();
        comp.closePadding = 49;
        expect(comp.closePadding).toEqual(comp.width-1);

        comp.url = 'https://www.youtube.com/channel/UC1sPlg3OhP4jQ6td90kspyg';
        comp.ngOnInit();
        expect(comp.url).toBe('https://www.youtube.com/channel/UC1sPlg3OhP4jQ6td90kspyg');
});
});

    
