import { CommonDataService } from "./common.data.service";
import { of } from "rxjs";
/**
 * Created by dattaram on 7/8/18.
 */
describe('CommonDataService', () => {
  let commonDataService: CommonDataService,
  serviceUrl, methodType,
  mockHttp: any;
   beforeEach(() => {
     mockHttp = jasmine.createSpyObj('mockHttp', ['get', 'post'])
     commonDataService = new CommonDataService(mockHttp);

   });
   it('fetch data ith get method ', () => {
     serviceUrl = '';
     methodType = 'get';
     mockHttp.get.and.returnValue(of(false));
     commonDataService.fetchData(serviceUrl, methodType);
     expect(methodType).toEqual('get');
     expect(mockHttp.get).toHaveBeenCalledWith(serviceUrl, jasmine.any(Object));
   });

  it('fetch data with post method ', () => {
    serviceUrl = '';
    methodType = 'post';
    mockHttp.post.and.returnValue(of(false));
    commonDataService.fetchData(serviceUrl, methodType);
    expect(methodType).toEqual('post');
    expect(mockHttp.post).toHaveBeenCalledWith(serviceUrl, {}, jasmine.any(Object));
  });

  it('uploadFile method', () => {
    serviceUrl = '';
    methodType = 'post';
    const requestData = jasmine.any(Object);
    mockHttp.post.and.returnValue(of(false));
    commonDataService.uploadFile(serviceUrl, methodType, requestData);
    expect(methodType).toEqual('post');
    expect(mockHttp.post).toHaveBeenCalledWith(serviceUrl, requestData , jasmine.any(Object));


  });
});