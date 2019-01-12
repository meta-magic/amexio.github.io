import { AvailableSlotsModel } from './availableslots.model';
import { TimeModel } from './time.model';

export class DayModel {
    date: Date;
    twentyfourformat: boolean;
    timeslots: TimeModel[];
    availableSlots: AvailableSlotsModel[];

    constructor(date: Date, twentyfourformat: boolean, availableSlots: AvailableSlotsModel[]) {
        this.date = date;
        this.twentyfourformat = twentyfourformat;
        this.availableSlots = availableSlots;
    }

    setTimeSlots(timeslots: TimeModel[]) {
        this.timeslots = timeslots;
        this.markTimeSlots();
    }

    private markTimeSlots() {
        if (this.availableSlots) {
            this.availableSlots.forEach((slot: AvailableSlotsModel) => {
                if (slot.datetime.getDate() === this.date.getDate()
                    && slot.datetime.getMonth() === this.date.getMonth()
                    && slot.datetime.getFullYear() === this.date.getFullYear()) {

                    slot.data.forEach((time: number) => {
                        this.checkTimeSlots(time);
                    });
                }
            });
        }
    }

    private checkTimeSlots(time: number) {
        this.timeslots.forEach((timeModel: TimeModel) => {
            if (time === timeModel.timeId) {
                timeModel.available = true;
                return true;
            }
        });
        return false;
    }
}
