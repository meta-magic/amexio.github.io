import { AmexioTagsInputComponent } from './tags.input.component';
import { AmexioFormIconComponent } from '../icon/icon.component';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {CommonDataService} from '../../services/data/common.data.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ElementRef, Renderer2 } from '@angular/core';

describe('TAG INPUT', () => {
    let comp: AmexioTagsInputComponent;
    let fixture: ComponentFixture<AmexioTagsInputComponent>;
    beforeEach(() => {
      TestBed.configureTestingModule({
      imports : [FormsModule],
      declarations: [ AmexioTagsInputComponent,AmexioFormIconComponent],
      providers:[IconLoaderService, Renderer2, CommonDataService,HttpClient,HttpHandler]
      });
      fixture = TestBed.createComponent(AmexioTagsInputComponent);
      comp = fixture.componentInstance;
  
    it('true is true', () => expect(true).toBe(true));
    });
    // it('is valid', () => expect(comp.isValid).toBe(false));

    it('get errormsg', () => {
        //  comp.errormsg='data incorect';
                expect(comp.errormsg).toEqual(comp._errormsg);
            });
    it('get innervalue', () => {
      comp.value='sagfaf'; 
      expect(comp['innerValue']).toEqual(comp.value);
        }); 
              
    it('set errormsg', () => {
        comp.errormsg='data incorect';
              expect(comp.helpInfoMsg).toEqual('data incorect<br/>');
          });



});