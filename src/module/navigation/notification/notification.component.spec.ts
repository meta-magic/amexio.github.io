import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index';
import { CommonIconComponent } from './../../base/components/common.icon.component';
import { AmexioNotificationComponent } from './notification.component';
import { ChangeDetectorRef } from '@angular/core';

describe('amexio-notification', () => {
    let comp: AmexioNotificationComponent;
    let fixture: ComponentFixture<AmexioNotificationComponent>;
    let ref: ChangeDetectorRef;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [AmexioNotificationComponent, CommonIconComponent],
            providers: [IconLoaderService],
        });
        fixture = TestBed.createComponent(AmexioNotificationComponent);
        comp = fixture.componentInstance;
    });

    // check private variables
    it('check private variables notification', () => {
        comp['notificationVertialCss'] = 'notification-vertical-';
        expect(comp['notificationVertialCss']).toBe('notification-vertical-');
        comp['notificationHorizontalCss'] = ' notification-horizontal-';
        expect(comp['notificationHorizontalCss']).toBe(' notification-horizontal-');
    });
});
