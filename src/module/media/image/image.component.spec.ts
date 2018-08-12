import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from '../../../index';
import { AmexioImageComponent } from './image.component';

describe('amexio-image', () => {
    let comp: AmexioImageComponent;
    let fixture: ComponentFixture<AmexioImageComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [AmexioImageComponent],
            providers: [IconLoaderService],
        });
        fixture = TestBed.createComponent(AmexioImageComponent);
        comp = fixture.componentInstance;
    });


    it('check disable property ', () => {
        (<any>comp).overlay = false;
        expect(comp.overlay).toEqual(false);
        (<any>comp).imageCss = ' image-';
        expect((<any>comp).imageCss).toEqual(' image-');

        // private overlayTextCss = '';
        (<any>comp).overlayTextCss = 'overlay-text overlay-';
        expect((<any>comp).overlayTextCss).toEqual('overlay-text overlay-');

    

        // // private imageTitleBottomCss    = 'image-title image-bottom-right';
        // (<any>comp).imageCss = ' image-';
        // expect((<any>comp).imageCss).toEqual(' image-');
        comp.onImageClick('data');
        comp.onClick.subscribe((g: any) => {
            expect(event).toEqual(g);
          });
    });
});