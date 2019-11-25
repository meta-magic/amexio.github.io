import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../../../public-api';
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
        (comp as any).overlay = false;
        expect(comp.overlay).toEqual(false);
        (comp as any).imageCss = ' image-';
        expect((comp as any).imageCss).toEqual(' image-');

        (comp as any).overlayTextCss = 'overlay-text overlay-';
        expect((comp as any).overlayTextCss).toEqual('overlay-text overlay-');

    });

    it('check onImageClick method', () => {
        comp.onImageClick('data');
        comp.onClick.subscribe((g: any) => {
            expect(event).toEqual(g);
          });
    });

    it('ngoninit method', () => {
        comp.ngOnInit();
        comp.width = '100px';
        comp.height = '50px';
        comp.overlayEffect = '';
        comp.filter = '';

        expect(comp.width).toEqual('100px');
        expect(comp.height).toEqual('50px');
        expect(comp.filter).toEqual('');
        expect(comp.overlayEffect).toEqual('');
        });

});
