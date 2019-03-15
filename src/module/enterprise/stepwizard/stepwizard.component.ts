import { AfterContentInit, Component, ContentChildren, EventEmitter, Input, Output, QueryList } from '@angular/core';
import { DeviceQueryService } from './../../services/device/device.query.service';
import { StepWizardItemComponent } from './stepwizard.item.component';

@Component({
  selector : 'amexio-step-wizard',
  templateUrl : './stepwizard.component.html',
})
export class StepWizardComponent implements AfterContentInit {

  @Input('show-step-number') showStepNumber = true;

  @Input('header-background') headerBackground: string;

  @Input('footer-align') footerAlign = 'space-between';
  @Output() finalStage: any = new EventEmitter<any>();
  @Output() onNextStepClick: any = new EventEmitter<any>();
  @Output() onPreviousStepClick: any = new EventEmitter<any>();
  @ContentChildren(StepWizardItemComponent) stepItemQueryList: QueryList<StepWizardItemComponent>;

  stepItemList: StepWizardItemComponent[];

  title: string;

  data = {};

  isPhone = false;
  constructor(private matchMediaService: DeviceQueryService) {
    if (this.matchMediaService.IsTablet() || this.matchMediaService.IsPhone()) {
      this.isPhone = true;
    }
  }

  ngAfterContentInit() {
    const time = new Date().getTime();
    this.stepItemList = this.stepItemQueryList.toArray();
    if (this.stepItemList && this.stepItemList.length > 0) {
      this.stepItemList[0].active = true;
    }

    this.stepItemList.forEach((node: any, index: any) => {
      try {
        this.stepItemList[index].index = time + index;
        node.onNextStep.subscribe((eventdata: any) =>
          this.onNextStep(eventdata),
        );
        node.onPreviousStep.subscribe((eventdata: any) =>
          this.onPreviousStep(eventdata),
        );
        this.stepItemList[index].footerAlign = this.footerAlign;
      } catch ( Error ) {

      }

  });
    this.stepItemList[0].showPreviousButton = false;
    this.stepItemList[0].activeClass = 'active';
    this.stepItemList[this.stepItemList.length - 1].nextLabel = 'Done';
    this.stepItemList[this.stepItemList.length - 1].nextIcon = '';
    this.title = this.stepItemList[0].title;
  }

  // ON NEXT STEP CLICK
  private onNextStep(event: any) {

    let activeIndex = 0;
    const updatedTitle = event.title.replace(/\s/g, '').toLowerCase();
    this.data[updatedTitle] = event.data;
    this.stepItemList.forEach((stepItem: any, index: any) => {
      if (stepItem.index === event.index) {
        activeIndex = index + 1;
        this.stepItemList[activeIndex].activeClass = 'active';
        this.stepItemList[activeIndex].active = true;
        this.title = this.stepItemList[activeIndex].title;
      }
    });

    this.stepItemList.forEach((stepItem: any, index: any) => {
      const ind = index + 1;
      if (ind > activeIndex) {
      } else {
        this.stepItemList[ind - 1].activeClass = 'completed';
        this.stepItemList[ind - 1].active = false;
      }
    });
    if (event && event.emitData && event.emitData.currentdata) {
      // tslint:disable-next-line:max-line-length
      this.onNextStepClick.emit({title: event.title, currentdata: event.emitData.currentdata, data: this.data, event: event.emitData.event});
    }
    this.finalStage.emit(this.data);
  }

  // ON PREVIOUS STEP CLICK
  private onPreviousStep(event: any) {
    if (event && event.emitData && event.emitData.currentdata) {
      // tslint:disable-next-line:max-line-length
      this.onPreviousStepClick.emit({title: event.title, currentdata: event.emitData.currentdata, data: this.data, event: event.emitData.event});
    }
    let activeIndex = 0;
    this.stepItemList.forEach((stepItem: any, index: any) => {
      if (stepItem.index === event.index) {
        activeIndex = index;
      }
    });

    this.stepItemList.forEach((stepItem: any, index: any) => {
      if (activeIndex === index) {
        this.stepItemList[index - 1].activeClass = 'active';
        this.stepItemList[index - 1].active = true;
        this.title = this.stepItemList[index - 1].title;
      } else if (activeIndex > index) {
        this.stepItemList[index + 1].activeClass = '';
        this.stepItemList[index].activeClass = 'completed';

        this.stepItemList[index + 1].active = false;
      }
    });
    this.stepItemList[0].showPreviousButton = false;
  }
}
