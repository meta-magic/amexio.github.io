import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from '../../../index';
import { StepWizardComponent } from './stepwizard.component';
import { AmexioCreativeModule } from '../../creative/amexio.creative.module';
import { AmexioMediaModule } from '../../media/amexio.media.module';
import { DeviceQueryService } from './../../services/device/device.query.service';
import { StepWizardItemComponent } from './stepwizard.item.component';
import { DebugElement, Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, NgModel } from '@angular/forms';

@Component({
    selector: 'test-cmp',
    template: `<amexio-step-wizard>
        <amexio-step-wizard-item stepTitle="step1"></amexio-step-wizard-item>
        <amexio-step-wizard-item stepTitle="step2"></amexio-step-wizard-item>
    </amexio-step-wizard>`,
})
class TestWrapperComponent { }
describe('amexio-step-wizard', () => {
    let component: StepWizardComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;
    let service: DeviceQueryService;
    let queryitem: StepWizardItemComponent;
    let fixture2: ComponentFixture<StepWizardItemComponent>
    let de: DebugElement;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [
                StepWizardComponent,
                StepWizardItemComponent, TestWrapperComponent
            ],
            providers: [IconLoaderService, DeviceQueryService, FormBuilder],
        }).compileComponents();
    }));
    beforeEach(() => {
        service = TestBed.get(DeviceQueryService);
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);
        fixture.detectChanges();
    });
    it('constructor', () => {
        expect(service.IsTablet()).toBeDefined();
        expect(service.IsPhone()).toBeDefined();
        component.isPhone = true
    })

    it('method ngAfterContentInit else block', () => {
        component.ngAfterContentInit();
        fixture.detectChanges();
        component.stepItemList = null;
        expect(component.stepItemList).toEqual(null);
    });

    it('method ngAfterContentInit', () => {
        component.ngAfterContentInit();
        const time = new Date().getTime();
        fixture.detectChanges();
        component.stepItemList = component.stepItemQueryList.toArray();
        component.ngAfterContentInit();
        expect(component.stepItemList).toBeDefined();
        expect(component.stepItemList.length).toBeGreaterThan(0);
        component.stepItemList[0].active = true;
    });

});


