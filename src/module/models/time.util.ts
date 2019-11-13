import { TimeModel } from './time.model';

export class TimeUtil {

    timeData(twentfourhourformatdata: boolean): TimeModel[] {
        if (twentfourhourformatdata) {
            return this.twentfourhourformatdata();
        } else {
            return this.ampmdata();
        }
    }

    private twentfourhourformatdata(): TimeModel[] {
        return this.data(':00');
    }

    private ampmdata(): TimeModel[] {
        return this.data(' am');
    }

    private data(appender: string) {
        const timemodels: TimeModel[] = [];

        for (let i = 0; i < 10; i++) {
            timemodels.push(new TimeModel(i, '0' + i + appender));
        }
        for (let i = 10; i < 25; i++) {
            timemodels.push(new TimeModel(i, i + appender));
        }

        return timemodels;
    }

    workingslot1(): TimeModel[] {
        const timemodels: TimeModel[] = [];

        timemodels.push(new TimeModel(10, '10 am'));
        timemodels.push(new TimeModel(11, '11 am'));
        timemodels.push(new TimeModel(12, '12 pm'));
        timemodels.push(new TimeModel(13, '01 pm'));
        timemodels.push(new TimeModel(14, '02 pm'));
        timemodels.push(new TimeModel(15, '03 pm'));
        timemodels.push(new TimeModel(16, '04 pm'));
        timemodels.push(new TimeModel(17, '05 pm'));
        timemodels.push(new TimeModel(18, '06 pm'));

        return timemodels;
    }
}
