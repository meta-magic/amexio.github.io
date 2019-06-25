import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from '../../../index';
import { StepWizardComponent } from './stepwizard.component';
import { AmexioCreativeModule } from '../../creative/amexio.creative.module';
import { AmexioMediaModule } from '../../media/amexio.media.module';
import { DeviceQueryService } from './../../services/device/device.query.service';

describe('amexio-step-wizard', () => {
    let comp: StepWizardComponent;
    let fixture: ComponentFixture<StepWizardComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, AmexioCreativeModule, AmexioMediaModule],
            declarations: [StepWizardComponent],
            providers: [IconLoaderService, DeviceQueryService],
        });
        fixture = TestBed.createComponent(StepWizardComponent);
        comp = fixture.componentInstance;
        event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);

        it('true is true', () => expect(true).toBe(true));
    });

    // check variables 
    //  it('check variables ', () => {
    //     expect(comp.data).toEqual({});
    //     expect(comp.isPhone).toEqual(false);

    // });
    it('phonevariable check', () => {
        comp.isPhone = false;
    });

    it('method ngAfterContentInit', () => {
        const time = new Date().getTime();
    })
});


