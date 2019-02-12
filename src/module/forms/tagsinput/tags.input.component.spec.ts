import { AmexioTagsInputComponent } from './tags.input.component';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonDataService } from '../../services/data/common.data.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Renderer2 } from '@angular/core';
import { AmexioInputHelperComponent } from '../../base/input.helper.component';
import { CommonIconComponent } from './../../base/components/common.icon.component';

describe('TAG INPUT', () => {
    let comp: AmexioTagsInputComponent;
    let fixture: ComponentFixture<AmexioTagsInputComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [AmexioTagsInputComponent,CommonIconComponent, AmexioInputHelperComponent],
            providers: [IconLoaderService, Renderer2, CommonDataService, HttpClient, HttpHandler]
        });
        fixture = TestBed.createComponent(AmexioTagsInputComponent);
        comp = fixture.componentInstance;

        it('true is true', () => expect(true).toBe(true));
    });
    // it('is valid', () => expect(comp.isValid).toBe(false));
    // it('get innervalue', () => {
    //     comp.value = 'sagfaf';
    //     expect(comp['innerValue']).toEqual(comp.value);
    // });
});
