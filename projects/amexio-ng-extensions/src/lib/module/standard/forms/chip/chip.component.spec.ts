import { CommonIconComponent } from './../../../base/components/common.icon.component';
import { AmexioChipComponent } from './chip.component';
import { By } from '@angular/platform-browser';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AmexioLabelComponent } from '../label/label.component';
import { IconLoaderService } from '../../../services/icon/icon.service';
describe('Amexio Chip Component :', () => {
    let comp: AmexioChipComponent;
    let fixture: ComponentFixture<AmexioChipComponent>;
    let de: DebugElement;    // => Handle to to Components DOM instance
    let el: HTMLElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FormsModule],
        declarations: [AmexioChipComponent,
            CommonIconComponent,
            AmexioLabelComponent], // declare the test component
        providers: [IconLoaderService],
      });

      fixture = TestBed.createComponent(AmexioChipComponent);
       // => Fixture Creates the environment surrounding the component & the has access to the instance itself.
      comp = fixture.componentInstance;

     });

    it('onCloseClick : check if event is emmitted', () => {
        spyOn(comp.closeClick , 'emit' );
        comp.onCloseClick(event);
        expect(comp.closeClick.emit).toHaveBeenCalledWith(event);
    });

    it('onLabelClick : check if event is emmitted', () => {
        spyOn(comp.labelClick , 'emit' );
        comp.onLabelClick(event);
        expect(comp.labelClick.emit).toHaveBeenCalledWith(event);
    });

    it('onCloseClick : negate', () => {
        spyOn(comp.closeClick , 'emit' );
        expect(comp.closeClick.emit).not.toHaveBeenCalledWith(event);
    });

    it('onLabelClick : negate', () => {
        spyOn(comp.labelClick , 'emit' );
        expect(comp.labelClick.emit).not.toHaveBeenCalledWith(event);
    });
});
