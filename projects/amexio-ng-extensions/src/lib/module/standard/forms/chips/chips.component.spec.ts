/**
 * Created by pratik on 11/12/17.
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../../../public-api';
import { CommonIconComponent } from '../../../base/components/common.icon.component';
import { AmexioChipComponent } from '../chip/chip.component';
import { AmexioLabelComponent } from '../label/label.component';
import { AmexioChipsComponent } from './chips.component';
describe('Amexio Chips Component: ', () => {

    let comp: AmexioChipsComponent;
    let fixture: ComponentFixture<AmexioChipsComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [AmexioChipsComponent, AmexioLabelComponent, AmexioChipComponent, CommonIconComponent],
            providers: [IconLoaderService],
        });
        fixture = TestBed.createComponent(AmexioChipsComponent);
        comp = fixture.componentInstance;

        const sampledatachips = [{
            icon: 'fa fa-camera',
            label: 'Camera',
            closable: true
          },
          {
            icon: 'fa fa-fire-extinguisher',
            label: 'Fire-Safety',
            closable: false
          },
          {
            icon: 'fa fa-wifi',
            label: 'Wifi',
            closable: true
          },
          {
            icon: 'fa fa-taxi',
            label: 'Parking-Area',
            closable: false
          },
          {
            icon: 'fa fa-ambulance',
            label: 'Emergency',
            closable: true
          },
        ];
    });

    it('ngOnInit: chk for componentId ', () => {
        comp.ngOnInit();

        expect(comp.componentId).toContain('chips');
    });

    it('onchipsKeyup' , ()=> {

        spyOn(comp,'onchipsKeyup');

        comp.onchipsKeyup(event);

        expect(comp.onchipsKeyup).toHaveBeenCalled();
    });
});
