// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { CommonIconComponent } from './../../base/components/common.icon.component';
// import { MinimizeWindowComponent } from './minimize.window.component';
// import { AmexioButtonComponent } from '../../forms/buttons/button.component';
// import { MinimizeService } from './minimize-service.service';
// describe('amexio-minimize-window', () => {

//     let comp: MinimizeWindowComponent;
//     let fixture: ComponentFixture<MinimizeWindowComponent>
//     let service: MinimizeService;


//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             imports: [],
//             declarations: [MinimizeWindowComponent, CommonIconComponent, AmexioButtonComponent],
//             providers: [MinimizeService],
//         });
//         fixture = TestBed.createComponent(MinimizeWindowComponent);
//         comp = fixture.componentInstance;
//         service = TestBed.get(MinimizeService);
//     });

//     it('should create', () => {
//         let comp = fixture.componentInstance;
//         expect(comp).toBeTruthy();
//     });


//     it('should trigger ngOnInit with detectChanges', () => {
//         comp.minimizeButton = true;
//         comp.ngOnInit();
//         service.currentMessage.subscribe((element: any) => {
//             expect(element).not.toBeNull();
//             comp.localData = element;
//             expect(comp.minimizeButton).toEqual(true);

//         })

//     });
  
//     it('check variables method ', () => {
//         comp.localData = [];
//         comp.minimizeButton = false;
//         expect(comp.localData).toEqual([]);
//         expect(comp.minimizeButton).toEqual(false);
//     });


//     it('check minimizeBtnClick method ', () => {

//         let data = {
//             show: true,
//         }
//         comp.minimizeButton = false;
//         comp.minimizeBtnClick(data);
//         expect(data.show).toEqual(true);
//         expect(comp.minimizeButton).toEqual(false);


//     });

// });
