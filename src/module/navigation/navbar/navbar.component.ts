/**
 * Created by ketangote on 12/8/17.
 */

/*
 Component Name : Amexio Navbar
 Component Selector : <amexio-nav>
 Component Description : The Nav Bar Component is a familiar top navigation pattern for users.
Nav bar has Logo/Title left align, than link, text field, button and menus on right side.
v4.1 Nav bar is not backward compatible of v4.0, for v4.0 refer link
*/
import {
  Component, Input, OnInit, ContentChildren, QueryList, AfterContentInit, ViewChild, ElementRef, AfterViewInit, Output,
  EventEmitter
} from '@angular/core';
import {DeviceQueryService} from "../../services/device/device.query.service";
import {AmexioNavActionComponent } from './navaction.component';
import {AmexioNavItemComponent } from './navitem.component';
import {AmexioNavMenuComponent } from './navmenu.component';

@Component({
  selector: 'amexio-nav', templateUrl: 'navbar.component.html'
})
export class AmexioNavBarComponent implements OnInit, AfterViewInit, AfterContentInit {


  /*
Properties
name : title
datatype : string
version : 4.0 onwards
default : none
description : Title for link, button and menu header
*/
  @Input() title: string;


  /*
Properties
name : logo
datatype : string
version : 4.0 onwards
default : none
description : Logo of navbar.
*/
  @Input() logo: string;

  /*
Properties
name : enable-side-nav-position
datatype : boolean
version : 4.0 onwards
default : none
description : Indicate if side-nav-bar is present
*/
  @Input('enable-side-nav-position') sidenavspace : boolean = false;


  @Output() onNavLogoClick: any = new EventEmitter<any>();

  @Output() onNavTitleClick: any = new EventEmitter<any>();

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
  navfixeditem : number;
  sidenav : boolean = false;

  constructor(public matchMediaService: DeviceQueryService) {

  }

  ngOnInit() {
  }


  ngAfterViewInit(){
    if(!this.logo)
      this.loadNavItems();
  }

  ngAfterContentInit() {
  }

  onImageLoad(){
    this.loadNavItems();
  }

  loadNavItems(){
    this.handleNavItems();
    this.navitemwidth = 5+this.navbaritems2.nativeElement.offsetWidth + this.navbaritems2.nativeElement.offsetWidth + this.navbaritems3.nativeElement.offsetWidth;
    this.handleDeviceSetting();
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

    if(this.sidenavspace){
      if (this.matchMediaService.IsTablet() || this.matchMediaService.IsPhone()) {
        this.sidenav = true;
      }else{
        this.sidenav = false;
      }
    }

    let navbarwidth = this.navbar.nativeElement.offsetWidth;
    let navbarheight = this.navbar.nativeElement.offsetHeight;
    let navbarfixedheight = this.navbarfixed.nativeElement.offsetHeight;

    if(!this.navfixeditem){
      this.navfixeditem = this.navbarfixed.nativeElement.offsetWidth;
    }

    if(!this.navitemwidth){
      let navbaritems1Width = 0;
      let navbaritems2Width = 0;
      let navbaritems3Width = 0;

      if(this.navbaritems1){
        navbaritems1Width = this.navbaritems1.nativeElement.offsetWidth;
      }
      if(this.navbaritems2){
        navbaritems2Width = this.navbaritems2.nativeElement.offsetWidth;
      }

      if(this.navbaritems3){
        navbaritems3Width = this.navbaritems3.nativeElement.offsetWidth;
      }
      this.navitemwidth = (this.navfixeditem+navbaritems1Width+navbaritems2Width+navbaritems3Width);
    }


    let navbaravailablewidth = (navbarwidth-(this.navfixeditem+this.navitemwidth))


    if((navbaravailablewidth <100 || navbarheight>100)){
      this.mobilemode = true;
      this.toggle = false;
      this.notifyNavItems(navbarwidth);
    }else{
      this.mobilemode = false;
      this.toggle = true;
      this.notifyNavItems(navbarwidth);
    }

  }



  resize(event:any){
    //setTimeout( () => this.handleDeviceSetting(),500);
    this.handleDeviceSetting();

  }


}
