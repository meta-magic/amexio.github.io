import { HttpClient, HttpHandler } from '@angular/common/http';
import { Renderer2 } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../../index';
import { CommonIconComponent } from '../../../base/components/common.icon.component';
import { AmexioInputHelperComponent } from '../../../base/input.helper.component';
import { CommonDataService } from '../../../services/data/common.data.service';
import { AmexioTagsInputComponent } from './tags.input.component';

describe('TAG INPUT', () => {
    let comp: AmexioTagsInputComponent;
    let fixture: ComponentFixture<AmexioTagsInputComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [AmexioTagsInputComponent, CommonIconComponent, AmexioInputHelperComponent],
            providers: [IconLoaderService, Renderer2, CommonDataService, HttpClient, HttpHandler],
        });
        fixture = TestBed.createComponent(AmexioTagsInputComponent);
        comp = fixture.componentInstance;
    });

});
