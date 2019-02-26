import { Component, Input, OnInit } from '@angular/core';
import { ProgressModel } from './progressce.component.model';
@Component({
  selector: 'amexio-progress-ce',
  templateUrl: './progressce.component.html',
})
export class AmexioProgressCEComponent implements OnInit {
  /*
     Properties
     name : type
     datatype : string
     version : 5.6.0 onwards
     default :
     description : Set type to the circular creative progress bar('radial/ring/pie').
     */
  @Input('type') type: string;
  /*
     Properties
     name : font-size
     datatype : string
     version : 5.6.0 onwards
     default :
     description : Set size to label of progress bar.
     */
  @Input('font-size') size = '30px';
  /*
     Properties
     name : background-color
     datatype : string
     version : 5.6.0 onwards
     default :
     description : Set background color to the circular creative progress bar.
     */
  @Input('background-color') background = 'rgb(242,244,245)';
  /*
     Properties
     name : background-color
     datatype : string
     version : 5.6.0 onwards
     default :
     description : Set label color to the circular creative progress bar.
     */
    @Input('label-color') labelcolor = 'black';
  /*
     Properties
     name : progress-color
     datatype : string
     version : 5.6.0 onwards
     default : '#2ecc71'
     description : Set progress color to the border of creative progress bar.
     */
  @Input('progress-color') progresscolor = '#1565c0';
  /*
     Properties
     name : inactive-progress-color
     datatype : string
     version : 5.6.0 onwards
     default : '#d0d0d0'
     description : Set inactive color to the remaining border of creative progress bar.
     */
  @Input('inactive-progress-color') inactiveprogresscolor = '#cce2f5';
  /*
  Properties
  name : unit
  datatype : string
  version : 5.6.0 onwards
  default : '%'
  description : Set unit to the label of progress bar.
  */
  @Input('unit') unit = '%';
  /*
     Properties
     name : label
     datatype : string
     version : 5.6.0 onwards
     default :
     description : Set label progress bar.
     */
  @Input('label') label: string;
  /*
     Properties
     name : height
     datatype : string
     version : 5.6.0 onwards
     default : 100%
     description : Set height to progress bar.
     */
  @Input('height') height: string;
  /*
     Properties
     name : width
     datatype : string
     version : 5.6.0 onwards
     default : 100%
     description : Set width to progress bar.
     */
  @Input('width') width: string;
  /*
     Properties
     name : progress-value
     datatype : number
     version : 5.6.0 onwards
     default :
     description : Give progress value to progress bar.
     */
  @Input('progress-value') progressvalue: number;

  @Input('tooltip') tooltip: string;

  @Input('show-label') showlabel = false;

  @Input('show-unit') showunit = false;

  firstProgressBarColor: any;
  secondProgressBarColor: any;
  thirdProgressBarColor: any;

  pStyle: any;
  outerWidth: any;
  outerHeight: any;

  progressBarDegreeMap: Map<any, any>;

  constructor() { }

  ngOnInit() {
    this.dyanmicHeightCreation();

    this.progressBarDegreeMap = new Map();

    this.progressBarDegreeMap.set('0', new ProgressModel('90deg', '90deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('1', new ProgressModel('90deg', '93.6deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('2', new ProgressModel('90deg', '97.2deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('3', new ProgressModel('90deg', '100.8deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('4', new ProgressModel('90deg', '104.4deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('5', new ProgressModel('90deg', '108deg', this.progresscolor, this.inactiveprogresscolor));

    this.progressBarDegreeMap.set('6', new ProgressModel('90deg', '111.6deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('7', new ProgressModel('90deg', '115.2deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('8', new ProgressModel('90deg', '118.8deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('9', new ProgressModel('90deg', '122.4deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('10', new ProgressModel('90deg', '126deg', this.progresscolor, this.inactiveprogresscolor));

    this.progressBarDegreeMap.set('11', new ProgressModel('90deg', '129.6deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('12', new ProgressModel('90deg', '133.2deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('13', new ProgressModel('90deg', '136.8deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('14', new ProgressModel('90deg', '140.4deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('15', new ProgressModel('90deg', '144deg', this.progresscolor, this.inactiveprogresscolor));

    this.progressBarDegreeMap.set('16', new ProgressModel('90deg', '147.6deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('17', new ProgressModel('90deg', '151.2deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('18', new ProgressModel('90deg', '154.8deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('19', new ProgressModel('90deg', '158.4deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('20', new ProgressModel('90deg', '162deg', this.progresscolor, this.inactiveprogresscolor));

    this.progressBarDegreeMap.set('21', new ProgressModel('90deg', '165.6deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('22', new ProgressModel('90deg', '169.2deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('23', new ProgressModel('90deg', '172.8deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('24', new ProgressModel('90deg', '176.4deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('25', new ProgressModel('90deg', '180deg', this.progresscolor, this.inactiveprogresscolor));

    this.progressBarDegreeMap.set('26', new ProgressModel('90deg', '183.6deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('27', new ProgressModel('90deg', '187.2deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('28', new ProgressModel('90deg', '190.8deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('29', new ProgressModel('90deg', '194.4deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('30', new ProgressModel('90deg', '198deg', this.progresscolor, this.inactiveprogresscolor));

    this.progressBarDegreeMap.set('31', new ProgressModel('90deg', '201.6deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('32', new ProgressModel('90deg', '205.2deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('33', new ProgressModel('90deg', '208.8deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('34', new ProgressModel('90deg', '212.4deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('35', new ProgressModel('90deg', '216deg', this.progresscolor, this.inactiveprogresscolor));

    this.progressBarDegreeMap.set('36', new ProgressModel('90deg', '219.6deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('37', new ProgressModel('90deg', '223.2deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('38', new ProgressModel('90deg', '226.8deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('39', new ProgressModel('90deg', '230.4deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('40', new ProgressModel('90deg', '234deg', this.progresscolor, this.inactiveprogresscolor));

    this.progressBarDegreeMap.set('41', new ProgressModel('90deg', '237.6deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('42', new ProgressModel('90deg', '241.2deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('43', new ProgressModel('90deg', '244.8deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('44', new ProgressModel('90deg', '248.4deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('45', new ProgressModel('90deg', '252deg', this.progresscolor, this.inactiveprogresscolor));

    this.progressBarDegreeMap.set('46', new ProgressModel('90deg', '255.6deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('47', new ProgressModel('90deg', '259.2deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('48', new ProgressModel('90deg', '262.8deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('49', new ProgressModel('90deg', '266.4deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('50', new ProgressModel('-90deg', '270deg', this.progresscolor, this.inactiveprogresscolor));

    this.progressBarDegreeMap.set('51', new ProgressModel('-86.4deg', '270deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('52', new ProgressModel('-82.8deg', '270deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('53', new ProgressModel('-79.2deg', '270deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('54', new ProgressModel('-75.6deg', '270deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('55', new ProgressModel('-72deg', '270deg', this.progresscolor, this.inactiveprogresscolor));

    this.progressBarDegreeMap.set('56', new ProgressModel('-68.4deg', '270deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('57', new ProgressModel('-64.8deg', '270deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('58', new ProgressModel('-61.2deg', '270deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('59', new ProgressModel('-57.6deg', '270deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('60', new ProgressModel('-54deg', '270deg', this.progresscolor, this.inactiveprogresscolor));

    this.progressBarDegreeMap.set('61', new ProgressModel('-50.4deg', '270deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('62', new ProgressModel('-46.8deg', '270deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('63', new ProgressModel('-43.2deg', '270deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('64', new ProgressModel('-39.6deg', '270deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('65', new ProgressModel('-36deg', '270deg', this.progresscolor, this.inactiveprogresscolor));

    this.progressBarDegreeMap.set('66', new ProgressModel('-32.4deg', '270deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('67', new ProgressModel('-28.8deg', '270deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('68', new ProgressModel('-25.2deg', '270deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('69', new ProgressModel('-21.6deg', '270deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('70', new ProgressModel('-18deg', '270deg', this.progresscolor, this.inactiveprogresscolor));

    this.progressBarDegreeMap.set('71', new ProgressModel('-14.4deg', '270deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('72', new ProgressModel('-10.8deg', '270deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('73', new ProgressModel('-7.2deg', '270deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('74', new ProgressModel('-3.6deg', '270deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('75', new ProgressModel('0deg', '270deg', this.progresscolor, this.inactiveprogresscolor));

    this.progressBarDegreeMap.set('76', new ProgressModel('3.6deg', '270deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('77', new ProgressModel('7.2deg', '270deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('78', new ProgressModel('10.8deg', '270deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('79', new ProgressModel('14.4deg', '270deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('80', new ProgressModel('18deg', '270deg', this.progresscolor, this.inactiveprogresscolor));

    this.progressBarDegreeMap.set('81', new ProgressModel('21.6deg', '270deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('82', new ProgressModel('25.2deg', '270deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('83', new ProgressModel('28.8deg', '270deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('84', new ProgressModel('32.4deg', '270deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('85', new ProgressModel('36deg', '270deg', this.progresscolor, this.inactiveprogresscolor));

    this.progressBarDegreeMap.set('86', new ProgressModel('39.6deg', '270deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('87', new ProgressModel('43.2deg', '270deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('88', new ProgressModel('46.8deg', '270deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('89', new ProgressModel('50.4deg', '270deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('90', new ProgressModel('54deg', '270deg', this.progresscolor, this.inactiveprogresscolor));

    this.progressBarDegreeMap.set('91', new ProgressModel('57.6deg', '270deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('92', new ProgressModel('61.2deg', '270deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('93', new ProgressModel('64.8deg', '270deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('94', new ProgressModel('68.4deg', '270deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('95', new ProgressModel('72deg', '270deg', this.progresscolor, this.inactiveprogresscolor));

    this.progressBarDegreeMap.set('96', new ProgressModel('76.6deg', '270deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('97', new ProgressModel('79.2deg', '270deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('98', new ProgressModel('82.8deg', '270deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('99', new ProgressModel('86.4deg', '270deg', this.progresscolor, this.inactiveprogresscolor));
    this.progressBarDegreeMap.set('100', new ProgressModel('90deg', '270deg', this.progresscolor, this.inactiveprogresscolor));

    this.progressBarDegreeMap.forEach((element: any, key: string) => {
      if (this.progressvalue === parseInt(key, 10)) {
        this.pStyle = element.getStyle();
      }
    });
  }
  dyanmicHeightCreation() {
    if (this.width && this.width.length > 0 && this.height && this.height.length > 0) {
      this.outerWidth = this.getCal(this.width);
      this.outerHeight = this.getCal(this.height);
    }
  }
  getCal(value: any): any {
    return (parseInt(value, 10) + 32).toString() + 'px';
  }
}
