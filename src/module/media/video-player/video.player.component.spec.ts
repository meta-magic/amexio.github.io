/**
 * Created by pratik on 18/12/17.
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from '../../../index';
import { AmexioVideoPlayerComponent } from './video.player.component';

describe('amexio-video-player', () => {
    let comp: AmexioVideoPlayerComponent;
    let fixture: ComponentFixture<AmexioVideoPlayerComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [AmexioVideoPlayerComponent],
            providers: [IconLoaderService],
        });
        fixture = TestBed.createComponent(AmexioVideoPlayerComponent);
        comp = fixture.componentInstance;
    });


    // it('check routeBackToApp method',() => {
    //     comp.currentVolume = 1;
    //         expect(comp.currentVolume).toEqual(1);
    // });


   
});
    