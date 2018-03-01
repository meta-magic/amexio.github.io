/**
 * Created by ketangote on 12/8/17.
 */
import {Component, Input, OnInit, ContentChildren, QueryList, AfterContentInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
//import {DeviceQueryService} from "amexio-ng-extensions";
import {DeviceQueryService} from "../../services/device/device.query.service";
import { AmexioNavActionComponent } from './navaction.component';
import { AmexioNavItemComponent } from './navitem.component';
import { AmexioNavMenuComponent } from './navmenu.component';

@Component({
  selector: 'amexio-nav', templateUrl: 'navbar.component.html'
})
export class AmexioNavBarComponent implements OnInit, AfterViewInit, AfterContentInit {


  @Input() title: string;

  @Input() logo: string;

  @Input('enable-side-nav-position') sidenavspace : boolean = false;

  @ContentChildren(AmexioNavItemComponent) navitems : QueryList<AmexioNavItemComponent>;
  
  navItemComponents : AmexioNavItemComponent[];


  @ViewChild('navbar', {read: ElementRef}) public navbar: ElementRef;
  @ViewChild('navbarfixed', {read: ElementRef}) public navbarfixed: ElementRef;
  @ViewChild('navbaritems', {read: ElementRef}) public navbaritems: ElementRef;
  @ViewChild('navbaritems1', {read: ElementRef}) public navbaritems1: ElementRef;
  @ViewChild('navbaritems2', {read: ElementRef}) public navbaritems2: ElementRef;
  @ViewChild('navbaritems3', {read: ElementRef}) public navbaritems3: ElementRef;

  navclass : string;
  toggle : boolean = true;
  mobilemode : boolean = false;
  navitemwidth : number;
  sidenav : boolean = false;

  constructor(public matchMediaService: DeviceQueryService) {

  }

  ngOnInit() {
  }


  ngAfterViewInit(){
    this.handleNavItems();
    this.navitemwidth = 5+this.navbaritems2.nativeElement.offsetWidth + this.navbaritems2.nativeElement.offsetWidth + this.navbaritems3.nativeElement.offsetWidth;
    this.handleDeviceSetting();
    
  }

  ngAfterContentInit() {
  
    
  }


  toggleDrawerPanel(event : any){
    this.toggle=!this.toggle;
  }

  handleNavItems(){
    this.navItemComponents = this.navitems.toArray();
    this.navItemComponents.forEach(node => node.onNavItemClick.subscribe((eventdata:any) => this.handleNavItemEvent(eventdata)));
  }

  handleNavItemEvent(event:any){
    if(event && event.data && event.data.node && !event.data.node.header && this.mobilemode)
      this.toggle=false;
  }

  notifyNavItems(navbarwidth:number){
    this.navItemComponents.forEach(node =>{
      node.setMobileMode(this.mobilemode);
      node.setNavbarWidth(navbarwidth);
    });
  }

  handleDeviceSetting(){
    let navbarwidth = this.navbar.nativeElement.offsetWidth;
    let navbarheight = this.navbar.nativeElement.offsetHeight;
    
    let navbaravailablewidth = (navbarwidth-((navbarwidth/100)*20));
    if((navbaravailablewidth<this.navitemwidth) || navbarheight>100){
      this.mobilemode = true;
      
      this.toggle = false;
      this.notifyNavItems(navbarwidth);
    }else{
      this.mobilemode = false;
      this.toggle = true;
      this.notifyNavItems(navbarwidth);
    }

    if(this.sidenavspace){
      if (this.matchMediaService.IsTablet() || this.matchMediaService.IsPhone()) {
        this.sidenav = true;
      }else{
        this.sidenav = false;
      }
      
    }
  }


  resize(event:any){
    this.handleDeviceSetting();
  }
}

