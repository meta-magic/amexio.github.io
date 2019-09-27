// import { ComponentFixture, TestBed, async } from '@angular/core/testing';
// import { FormsModule } from '@angular/forms';
// import { By } from '@angular/platform-browser';
// import { IconLoaderService } from '../../../index';
// import { StepWizardComponent } from './stepwizard.component';
// import { AmexioCreativeModule } from '../../creative/amexio.creative.module';
// import { AmexioMediaModule } from '../../media/amexio.media.module';
// import { DeviceQueryService } from './../../services/device/device.query.service';
// import { StepWizardItemComponent } from './stepwizard.item.component';
// import { DebugElement, Component, NO_ERRORS_SCHEMA } from '@angular/core';
// import { FormBuilder, FormGroup, NgForm, NgModel } from '@angular/forms';

// @Component({
//     selector: 'test-cmp',
//     template: `<amexio-step-wizard>
//         <amexio-step-wizard-item stepTitle="step1"></amexio-step-wizard-item>
//         <amexio-step-wizard-item stepTitle="step2"></amexio-step-wizard-item>
//     </amexio-step-wizard>`,
// })
// class TestWrapperComponent { }
// describe('amexio-step-wizard', () => {
//     let component: StepWizardComponent;
//     let fixture: ComponentFixture<TestWrapperComponent>;
//     let service: DeviceQueryService;
//     let queryitem: StepWizardItemComponent;
//     let fixture2: ComponentFixture<StepWizardItemComponent>
//     let de: DebugElement;
//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             schemas: [NO_ERRORS_SCHEMA],
//             declarations: [
//                 StepWizardComponent,
//                 StepWizardItemComponent, TestWrapperComponent
//             ],
//             providers: [IconLoaderService, DeviceQueryService, FormBuilder],
//         }).compileComponents();
//     }));
//     beforeEach(() => {
//         service = TestBed.get(DeviceQueryService);
//         fixture = TestBed.createComponent(TestWrapperComponent);
//         component = fixture.debugElement.children[0].componentInstance;
//         event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);
//         fixture.detectChanges();
//     });
//     it('constructor', () => {
//         service.IsTablet();
//         service.IsPhone();
//         expect(service.IsTablet()).toBeDefined();
//         expect(service.IsPhone()).toBeDefined();
//         component.isPhone = true
//     })

//     it('method ngAfterContentInit else block', () => {
//         component.ngAfterContentInit();
//         fixture.detectChanges();
//         component.stepItemList = [];
//         expect(component.stepItemList.length).toEqual(0);
//     });

//     it('method ngAfterContentInit', () => {
//         component.ngAfterContentInit();
//         const time = new Date().getTime();
//         fixture.detectChanges();
//         component.stepItemList = component.stepItemQueryList.toArray();
//         component.ngAfterContentInit();
//         expect(component.stepItemList).toBeDefined();
//         expect(component.stepItemList.length).toBeGreaterThan(0);
//         component.stepItemList[0].active = true;
//     });
//     it('nextStep method', () => {
//         component.data = {};
//         let activeIndex = 0;
//         let e = jasmine.createSpyObj('e', ['preventDefault']);
//         e['title'] = 'User Details';
//         e['data'] = {};
//         e.data['email'] = "a@gmail.com";
//         e.data['firstName'] = "ankita";
//         e.data['lastName'] = "jain";
//         const updatedTitle = e.title.replace(/\s/g, '').toLowerCase();
//         component.data[updatedTitle] = e.data;
//         component.stepItemList.forEach((stepItem: any, index: any) => {

//             e['index'] = stepItem.index;
//             expect(stepItem.index).toEqual(e.index);
//             activeIndex = index + 1;
//             activeIndex  = 0;
//             component.stepItemList[activeIndex].activeClass = 'active';
//             component.stepItemList[activeIndex].active = true;
//             component.title = component.stepItemList[activeIndex].title;
//         }); 
//         component.stepItemList.forEach((stepItem: any, index: any) => {
//             let ind = index + 1;
//             ind = -1;
//             expect(ind).toBeLessThan(activeIndex);
//              ind = 1;
//               component.stepItemList[ind - 1].activeClass = 'completed';
//               component.stepItemList[ind - 1].active = false;
//           });

//     })
// });


