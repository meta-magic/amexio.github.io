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
        jasmine.clock().uninstall();
        jasmine.clock().install();
    });

    // check private variables
    it('check private variables notification', () => {
        comp['notificationVertialCss'] = 'notification-vertical-';
        expect(comp['notificationVertialCss']).toBe('notification-vertical-');
        comp['notificationHorizontalCss'] = ' notification-horizontal-';
        expect(comp['notificationHorizontalCss']).toBe(' notification-horizontal-');
    });

    it('ngOnInit of If notification', () => {
        comp.autodismissmsg = true;
        comp.ngOnInit();
        comp.componentID = Math.floor(Math.random() * 1000 + 999);
        comp.messageData = [
            'User',
            'aaa'
        ]
        expect(comp.autodismissmsg).toEqual(true);
        // comp.autodismissmsginterval = undefined;
        expect(comp.autodismissmsginterval).toEqual(1500);
        expect(comp.messageData).not.toEqual(null);
        jasmine.clock().tick(comp.autodismissmsginterval);
        expect(comp.messageData).toBeDefined();
        expect(comp.messageData.length).toBeGreaterThan(0);
        comp.messageData.shift();
        // comp.ref.markForCheck();
    })

    it('ngOnInit of Else notification', () => {
        comp.autodismissmsg = true;
        comp.ngOnInit();
        comp.componentID = Math.floor(Math.random() * 1000 + 999);
        comp.messageData = undefined;
        // comp.autodismissmsginterval = undefined;
        expect(comp.messageData).toEqual(undefined);
        jasmine.clock().tick(comp.autodismissmsginterval);
        expect(comp.messageData).toBeUndefined();
        // expect(comp.messageData.length).toBeLessThanOrEqual(0);
        // comp.messageData.shift();
        // comp.ref.markForCheck();
    })
});
