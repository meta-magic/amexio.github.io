import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AmexioNavMobileMenuComponent } from '../../navigation/navbar/navmobilemenu';

describe('AmexioNavMobileMenuComponent', () => {
    let comp1: AmexioNavMobileMenuComponent;
    let fixture1: ComponentFixture<AmexioNavMobileMenuComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            declarations: [AmexioNavMobileMenuComponent],
        });
        fixture1 = TestBed.createComponent(AmexioNavMobileMenuComponent);
        comp1 = fixture1.componentInstance;
    });
    it('toggleMenu method', () => {
        const node = {};
        comp1.toggleMenu({}, node);
        node['showInnerMenus'] = !node['showInnerMenus'];
        comp1.onNavItemClick.emit({ data: node, event: {} });
    });
    it('onInnerClick', () => {
        comp1.onInnerClick({});
        comp1.onNavItemClick.emit({});
        fixture1.detectChanges();

    });
});