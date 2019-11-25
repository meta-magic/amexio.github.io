export class ProgressModel {

    firstDegree: any;
    secondDegree: any;
    progresscolor: any;
    inactiveprogresscolor: any;

    constructor(firstDegree: any, secondDegree: any, progresscolor: any, inactiveprogresscolor: any) {
        this.firstDegree = firstDegree;
        this.secondDegree = secondDegree;
        this.progresscolor = progresscolor;
        this.inactiveprogresscolor = inactiveprogresscolor;

    }

    getStyle(): any {

        if (parseFloat(this.firstDegree) > -90 && parseFloat(this.firstDegree) < 90) {
            return {
                'background-image': 'linear-gradient( ' + this.firstDegree + ', ' + this.progresscolor +
                    ' 50%, transparent 50%, transparent), linear-gradient(' + this.secondDegree + ', ' + this.progresscolor +
                    ' 50%,' + this.inactiveprogresscolor + ' 50%, ' + this.inactiveprogresscolor + ')',
            };
        } else {
            return {
                'background-image': 'linear-gradient( ' + this.firstDegree + ', ' + this.inactiveprogresscolor +
                    ' 50%, transparent 50%, transparent), linear-gradient(' + this.secondDegree + ', ' + this.progresscolor +
                    ' 50%,' + this.inactiveprogresscolor + ' 50%, ' + this.inactiveprogresscolor + ')',
            };
        }
    }
}
