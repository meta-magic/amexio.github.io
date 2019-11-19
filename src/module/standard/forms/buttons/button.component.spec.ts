import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from '../../../../index';
import { CommonIconComponent } from '../../../base/components/common.icon.component';
import { AmexioButtonComponent } from './button.component';

describe('amexio-button', () => {
  let comp: AmexioButtonComponent;
  let fixture: ComponentFixture<AmexioButtonComponent>;
  let btn : any;
  let buttonHtml: HTMLElement;
  let element;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AmexioButtonComponent, CommonIconComponent],
      providers: [IconLoaderService],
    });
    fixture = TestBed.createComponent(AmexioButtonComponent);
    comp = fixture.componentInstance;
    element = fixture.debugElement;
    btn = element.nativeElement.querySelector('button');
    buttonHtml = fixture.debugElement.query(By.css('button')).nativeElement as HTMLElement;
    event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);
  });

  it('buttonClick(): event triggered', () => {
    spyOn(comp.onClick, 'emit');

    comp.disabled = false;
    comp.ispressed = true;
    fixture.detectChanges();
    expect(comp.ispressed).toEqual(true);
    if (!comp.disabled) {
      btn.click();
      expect(comp.onClick.emit).toHaveBeenCalled();
      expect(btn.disabled).toBeFalsy();
    }
  });

  it('buttonClick(): event not triggered', () => {
    spyOn(comp.onClick, 'emit');

    comp.ispressed = false;
    comp.disabled = true;

    fixture.detectChanges();
    if (comp.disabled) {
      expect(comp.onClick.emit).not.toHaveBeenCalled();
      expect(comp.disabled).toBeTruthy();
    }
  });

  it('iconClick(): event triggered', () => {

    comp.disabled = false;
    const icon = fixture.debugElement.query(By.css('.fa fa-close'));
    spyOn(comp, 'onIconClick');
    if (!comp.disabled) {
      comp.onIconClick();
      fixture.detectChanges();
      expect(comp.disabled).toBeFalsy();
      expect(comp.onIconClick).toHaveBeenCalled();
    }
  });

  it('iconClick(): event not triggered', () => {
    comp.disabled = true;
    const icon = fixture.debugElement.query(By.css('.fa fa-close'));
    spyOn(comp, 'onIconClick');
    fixture.detectChanges();
    expect(comp.disabled).toBe(true);
    expect(comp.onIconClick).not.toHaveBeenCalled();
  });

  it('ngOnInit(): getBGStyle is not null', () => {
    comp.bgcolor = '#444444';
    comp.color = '#000000';

    let json = {
      'background-color': '#444444',
      'color': '#000000',
    };
    spyOn(comp, 'getBGStyle');
    if (comp.getBGStyle()) {
      fixture.detectChanges();
      expect(comp.getBGStyle).toHaveBeenCalled();
      expect(comp.bgColorClass).toBe(this.json);

    }
    spyOn(comp, 'badgeClass');
    fixture.detectChanges();
    comp.badgeClass();
    expect(comp.badgeClass).toHaveBeenCalled();
    expect(comp.badgeCssClass).toBeUndefined();
  });

  it('ngOnInit(): getBGStyle is null', () => {
    comp.bgcolor = null;
    comp.color = null;

    spyOn(comp, 'getBGStyle');
    if (comp.getBGStyle() == null) {
      fixture.detectChanges();
      expect(comp.getBGStyle).toHaveBeenCalled();
    }
    spyOn(comp, 'badgeClass');
    fixture.detectChanges();
    comp.badgeClass();
    expect(comp.badgeClass).toHaveBeenCalled();
    expect(comp.badgeCssClass).toEqual('');
  });

  it('badgeClass(): primary conditions', () => {
    let className = '';
    expect(className).toBe('');
    const badgeHTML = fixture.debugElement.query(By.css('.button-text')).nativeElement as HTMLElement;
    comp.type = 'primary';
    comp.badge = 10;
    comp.badgeClass();
    fixture.detectChanges();
    if (comp.type === 'primary' || comp.type === 'theme-color') {
      className = 'btn-primary-badge';

      expect(comp.type).toBe('primary');
      expect(badgeHTML.innerHTML).toContain('btn-primary-badge');
    }
  });

  it('badgeClass(): theme-color conditions', () => {
    let className = '';
    expect(className).toBe('');
    const badgeHTML = fixture.debugElement.query(By.css('.button-text')).nativeElement as HTMLElement;
    comp.type = 'theme-color';

    comp.badge = 10;
    comp.badgeClass();
    fixture.detectChanges();

    if (comp.type === 'primary' || comp.type === 'theme-color') {
      className = 'btn-primary-badge';

      expect(comp.type).toBe('theme-color');
      expect(className).toBe('btn-primary-badge');
      expect(badgeHTML.innerHTML).toContain('btn-primary-badge');

    }
  });

  it('badgeClass(): theme-backgroundcolor conditions', () => {
    let className = '';
    expect(className).toBe('');
    const badgeHTML = fixture.debugElement.query(By.css('.button-text')).nativeElement as HTMLElement;
    comp.type = 'theme-backgroundcolor';
    comp.badge = 10;
    comp.badgeClass();
    fixture.detectChanges();
    if (comp.type === 'secondary' || comp.type === 'theme-backgroundcolor') {
      className = 'btn-secondary-badge';

      expect(comp.type).toBe('theme-backgroundcolor');
      expect(className).toBe('btn-secondary-badge');
      expect(badgeHTML.innerHTML).toContain('btn-secondary-badge');

    }
  });

  it('badgeClass(): secondary conditions', () => {
    let className = '';
    expect(className).toBe('');
    const badgeHTML = fixture.debugElement.query(By.css('.button-text')).nativeElement as HTMLElement;
    comp.badge = 10;
    comp.type = 'secondary';
    comp.badgeClass();
    fixture.detectChanges();

    if (comp.type === 'secondary' || comp.type === 'theme-backgroundcolor') {
      className = 'btn-secondary-badge';

      expect(comp.type).toBe('secondary');
      expect(className).toBe('btn-secondary-badge');
      expect(badgeHTML.innerHTML).toContain('btn-secondary-badge');

    }
  });
  
  it('badgeClass(): success conditions', () => {
    let className = '';
    expect(className).toBe('');
    const badgeHTML = fixture.debugElement.query(By.css('.button-text')).nativeElement as HTMLElement;
    comp.badge = 10;
    comp.type = 'success';
    comp.badgeClass();
    fixture.detectChanges();
    if (comp.type === 'success' || comp.type === 'green') {
      className = 'btn-success-badge';

      expect(comp.type).toBe('success');
      expect(className).toBe('btn-success-badge');
      expect(badgeHTML.innerHTML).toContain('btn-success-badge');

    }
  });

  it('badgeClass(): green conditions', () => {
    let className = '';
    expect(className).toBe('');
    const badgeHTML = fixture.debugElement.query(By.css('.button-text')).nativeElement as HTMLElement;
    comp.badge = 10;
    comp.type = 'green';
    comp.badgeClass();
    fixture.detectChanges();

    if (comp.type === 'success' || comp.type === 'green') {
      className = 'btn-success-badge';

      expect(comp.type).toBe('green');
      expect(className).toBe('btn-success-badge');
      expect(badgeHTML.innerHTML).toContain('btn-success-badge');

    }
  });

  it('badgeClass(): danger conditions', () => {
    let className = '';
    expect(className).toBe('');
    const badgeHTML = fixture.debugElement.query(By.css('.button-text')).nativeElement as HTMLElement;
    comp.badge = 10;
    comp.type = 'danger';
    comp.badgeClass();
    fixture.detectChanges();
    if (comp.type === 'danger' || comp.type === 'red') {
      className = 'btn-danger-badge';
      expect(badgeHTML.innerHTML).toContain('btn-danger-badge');

      expect(comp.type).toBe('danger');
      expect(className).toBe('btn-danger-badge');
    }});

  it('badgeClass(): red conditions', () => {
    let className = '';
    expect(className).toBe('');
    const badgeHTML = fixture.debugElement.query(By.css('.button-text')).nativeElement as HTMLElement;
    comp.badge = 10;
    comp.type = 'red';
    comp.badgeClass();
    fixture.detectChanges();

    if (comp.type === 'danger' || comp.type === 'red') {
      className = 'btn-danger-badge';

      expect(comp.type).toBe('red');
      expect(className).toBe('btn-danger-badge');
      expect(badgeHTML.innerHTML).toContain('btn-danger-badge');

    }
  });

  it('badgeClass(): warning conditions', () => {
    let className = '';
    expect(className).toBe('');
    const badgeHTML = fixture.debugElement.query(By.css('.button-text')).nativeElement as HTMLElement;
    comp.badge = 10;
    comp.type = 'warning';
    comp.badgeClass();
    fixture.detectChanges();
    if (comp.type === 'warning' || comp.type === 'yellow') {
      className = 'btn-warning-badge';


      expect(comp.type).toBe('warning');
      expect(className).toBe('btn-warning-badge');
      expect(badgeHTML.innerHTML).toContain('btn-warning-badge');

    }
  });

  it('badgeClass(): yellow conditions', () => {
    let className = '';
    expect(className).toBe('');
    const badgeHTML = fixture.debugElement.query(By.css('.button-text')).nativeElement as HTMLElement;
    comp.badge = 10;
    comp.type = 'yellow';
    comp.badgeClass();
    fixture.detectChanges();

    if (comp.type === 'warning' || comp.type === 'yellow') {
      className = 'btn-warning-badge';

      expect(comp.type).toBe('yellow');
      expect(className).toBe('btn-warning-badge');
      expect(badgeHTML.innerHTML).toContain('btn-warning-badge');

    }});

  it('badgeClass(): transparent conditions', () => {
    let className = '';
    expect(className).toBe('');
    const badgeHTML = fixture.debugElement.query(By.css('.button-text')).nativeElement as HTMLElement;
    comp.badge = 10;
    comp.type = 'transparent';

    comp.badgeClass();
    fixture.detectChanges();

    if (comp.type === 'transparent') {
      className = 'btn-transparent-badge';


      expect(comp.type).toBe('transparent');
      expect(className).toBe('btn-transparent-badge');
      expect(badgeHTML.innerHTML).toContain('btn-transparent-badge');

    }
  });


  it('badgeClass(): all negative conditions', () => {
    let className = '';
    expect(className).toBe('');
    const badgeHTML = fixture.debugElement.query(By.css('.button-text')).nativeElement as HTMLElement;
    comp.badge = 10;

    comp.type = '';
    className = '';

    comp.badgeClass();
    fixture.detectChanges();
    if (comp.type != 'success') {
      expect(comp.type).not.toBe('success');
      expect(className).not.toBe('btn-success-badge');
      expect(badgeHTML.innerHTML).not.toContain('btn-success-badge');

    }

    if (comp.type != 'green') {
      expect(className).not.toBe('btn-success-badge');

      expect(comp.type).not.toBe('green');
      expect(badgeHTML.innerHTML).not.toContain('btn-success-badge');

    }
    if (comp.type != 'secondary') {
      expect(className).not.toBe('btn-secondary-badge');

      expect(comp.type).not.toBe('secondary');
      expect(badgeHTML.innerHTML).not.toContain('btn-secondary-badge');

    }
    if (comp.type != 'theme-backgroundcolor') {
      expect(className).not.toBe('btn-secondary-badge');

      expect(comp.type).not.toBe('theme-backgroundcolor');
      expect(badgeHTML.innerHTML).not.toContain('btn-secondary-badge');

    }

    if (comp.type != 'primary') {
      expect(className).not.toBe('btn-primary-badge');

      expect(comp.type).not.toBe('primary');
      expect(badgeHTML.innerHTML).not.toContain('btn-primary-badge');

    }
    if (comp.type != 'theme-color') {
      expect(className).not.toBe('btn-primary-badge');

      expect(comp.type).not.toBe('theme-color');
      expect(badgeHTML.innerHTML).not.toContain('btn-primary-badge');

    }

    if (comp.type != 'transparent') {
      expect(comp.type).not.toBe('transparent');
      expect(className).not.toBe('btn-transparent-badge');
      expect(badgeHTML.innerHTML).not.toContain('btn-transparent-badge');

    }

    if (comp.type != 'warning') {
      expect(comp.type).not.toBe('warning');
      expect(className).not.toBe('btn-warning-badge');
      expect(badgeHTML.innerHTML).not.toContain('btn-warning-badge');

    }

    if (comp.type != 'yellow') {
      expect(comp.type).not.toBe('yellow');
      expect(className).not.toBe('btn-warning-badge');
      expect(badgeHTML.innerHTML).not.toContain('btn-warning-badge');
    }

    if (comp.type != 'danger') {
      expect(comp.type).not.toBe('danger');
      expect(className).not.toBe('btn-danger-badge');
      expect(badgeHTML.innerHTML).not.toContain('btn-danger-badge');

    } 

    if (comp.type != 'red') {
      expect(comp.type).not.toBe('red');
      expect(className).not.toBe('btn-danger-badge');
      expect(badgeHTML.innerHTML).not.toContain('btn-danger-badge');

     }
  });

  it('setDisabled(): set Disabled', () => {
    spyOn(comp, 'setDisabled');
    comp.setDisabled(true);
    fixture.detectChanges();
    expect(comp.setDisabled).toHaveBeenCalledWith(true);
    expect(btn.disabled).toBeFalsy();
  });

  it('setDisabled(): negate set Disabled', () => {

    spyOn(comp, 'setDisabled');
    fixture.detectChanges();

    expect(comp.setDisabled).not.toHaveBeenCalled();
  });

  it('getBGStyle(): bgcolor & color defined', () => {

    comp.bgcolor = '#444444';
    comp.color = '#000000';
    comp.type = 'default';
    comp.bgBorderColor = 'none';

    const json = {
      'background-color': '#444444',
      'color': '#000000',
    };

    if (comp.bgcolor && comp.color) {
      spyOn(comp, 'getBGStyle');

      const res = comp.getBGStyle();

      fixture.detectChanges();
      expect(buttonHtml.style.backgroundColor).toBe('rgb(68, 68, 68)');
      expect(buttonHtml.style.color).toBe('rgb(0, 0, 0)');
      expect(comp.type).toBe('default');
      expect(comp.bgBorderColor).toBe('none');
      expect(buttonHtml.classList).toContain('button-default');
      expect(comp.getBGStyle).toHaveBeenCalled();

    }
  });

  it('getBGStyle(): bgcolor & color un-defined', () => {

    comp.bgcolor = null;
    comp.color = null;

    spyOn(comp, 'getBGStyle');

    fixture.detectChanges();

    const res = comp.getBGStyle();

    expect(comp.bgcolor).toBeNull();
    expect(comp.color).toBeNull();
    expect(comp.type).toBeUndefined();
    expect(comp.bgBorderColor).toBe('');
    expect(comp.getBGStyle).toHaveBeenCalled();

  });

  it('setRoundEdge: type is classic', () => {
    comp.setRoundEdge('classic');

    fixture.detectChanges();

    expect(buttonHtml.classList).toContain('classicCommonCss');
    expect(comp.roundedgeclass).toBe('classicCommonCss');
  });

  it('setRoundEdge: type is not classic', () => {
    comp.setRoundEdge('');
    comp.roundedgeclass = '';
    expect(comp.type).not.toBe('classic');
    expect(comp.roundedgeclass).not.toBe('classicCommonCss');
  });

  it('setRoundEdge: type is round-edge', () => {

    comp.setRoundEdge('round-edge');

    fixture.detectChanges();

    expect(comp.roundedgeclass).toBe('roundEdgeCommonCss');
    expect(buttonHtml.classList).toContain('roundEdgeCommonCss');
  });

  it('setRoundEdge: type is not round-edge', () => {
    comp.setRoundEdge('');
    comp.roundedgeclass = '';
    expect(comp.type).not.toBe('round-edge');
    expect(comp.roundedgeclass).not.toBe('roundEdgeCommonCss');
  });
});
