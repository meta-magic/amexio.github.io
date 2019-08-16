// import { TestBed } from '@angular/core/testing';
// import { BehaviorSubject } from 'rxjs';
// import { MinimizeService } from './minimize-service.service';

// fdescribe('minimize-sevice', () => {
//     let commonService: MinimizeService;
//     const myTestTimeout: number = 2 * 60 * 1000; //explicitly set for readabilty

//     beforeEach(() => {
//         commonService = new MinimizeService();
//         commonService = TestBed.get(MinimizeService);

//     });

//     it('description', inject([MinimizeService], (commonService: MinimizeService) => {
//         spyOn(commonService).and.returnValue(Observable.of([])); // Some array with builds objects?
//         component.index().subscribe(builds => {
//           expect(builds).toEqual([]); // Your expected builds array previously set in spy
//         });
//     });

//     // it('onCloseClick check  method ',  ((done) => {
//     //     commonService.cureentWidnowData = [
//     //         {
//     //             amexioComponentId: 123,
//     //             minimize: true,
//     //             textName: ' Employee Form1 ',
//     //         },
//     //     ];

//     //     const data = {
//     //         amexioComponentId: 123,
//     //     };

//     //     commonService.onCloseClick(data);
//     //     expect(commonService.cureentWidnowData).not.toBeNull();
//     //     commonService.cureentWidnowData.forEach((item: any) => {
//     //         expect(item.amexioComponentId).toEqual(data.amexioComponentId);
//     //         commonService.cureentWidnowData.splice(item, 1);
//     //         done();
//     //     });

//     // }));
// });
