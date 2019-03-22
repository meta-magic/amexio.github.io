export class AmexioDateUtils {

    isDateEqual(d1: any, d2: any) {
        const date1 = new Date(d1.getTime());
        const date2 = new Date(d2.getTime());

        if (date1.getTime() === date2.getTime()) {
            return true;
        } else if ((date1.getUTCFullYear() === date2.getUTCFullYear()) && (date1.getMonth() === date2.getMonth())
            && (date1.getDate() === date2.getDate())) {
            return true;
        }

        return false;
    }

    isDateGreaterThenEqualTO(d1: any, d2: any) {
        const date1 = new Date(d1.getTime());
        const date2 = new Date(d2.getTime());

        if (date1.getTime() >= date2.getTime()) {
            return true;
        }
        return false;
    }

    public createDaysForMonths(selectedPeriod: any, currrentDate: any): any[] {
        const calendaryData = [];
        const date = new Date(selectedPeriod.getFullYear(), selectedPeriod.getMonth(), 1, 0, 0, 0, 0); // Starting at the 1st of the month
        const extras = (date.getDay() + 6) % 7; // How many days of the last month do we need to include?
        date.setDate(date.getDate() - extras); // Skip back to the previous monday
        while (calendaryData.length < 6) {
            const rowDays = [];
            for (let i = 0; i < 7; i++) {
                const day: any = {
                    date: null, selected: false, isActivePeriod: null, isDisabled: false,
                    isActive: false, isEvent: false, eventDetails: null,
                };
                day['id'] = Math.floor(Math.random() * 90000) + 10000 + '_monthid';
                day.date = new Date(date.getTime());
                day.isActivePeriod = (date.getMonth() === selectedPeriod.getMonth());
                day.isActive = this.isDateEqual(day.date, new Date());
                rowDays.push(day);
                date.setDate(date.getDate() + 1);
            }
            calendaryData.push(rowDays);
        }

        return calendaryData;
    }

    public createDaysForWeek(selectedPeriod: any, currrentDate: any): any[] {
        const calendaryData = [];
        const date = this.getMonday(selectedPeriod);
        for (let i = 0; i < 7; i++) {
            const day: any = {
                date: null, selected: false, isActivePeriod: null, isDisabled: false, isActive: false, isEvent: false, eventDetails: null,
            };
            day.date = new Date(date.getTime());
            day.isActivePeriod = (date.getMonth() === selectedPeriod.getMonth());
            day.isActive = this.isDateEqual(day.date, currrentDate);
            calendaryData.push(day.date);
            date.setDate(date.getDate() + 1);
        }
        return calendaryData;
    }

    getMonday(date: Date) {
        if (date) {
            const day = date.getDay() || 7;
            if (day !== 1) {
                date.setHours(-24 * (day - 1));
            }
        }
        return date;
    }

    getWeekSunday(date: Date) {
        if (date.getDay() === 0) {
            return date;
        } else {
            const diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
            const monday = new Date(date.setDate(diff));
            return new Date(monday.setDate(monday.getDate() - 1));
        }
    }

    getNextSunday(date: Date) {
        const currentSunday = this.getWeekSunday(date);
        currentSunday.setDate(currentSunday.getDate() + 7);
        return new Date(currentSunday.getTime());
    }

    getPrevSunday(date: Date) {
        const currentSunday = this.getWeekSunday(date);
        currentSunday.setDate(currentSunday.getDate() - 7);
        return new Date(currentSunday.getTime());
    }

    isBetween(date: any, startDate: any, endDate: any) {
        endDate.setSeconds(0);
        startDate.setSeconds(0);
        date.setSeconds(0);
        startDate.setMilliseconds(0);
        endDate.setMilliseconds(0);
        date.setMilliseconds(0);
        if (date.getTime() > startDate.getTime() && date.getTime() < endDate.getTime()) {
            return true;
        }
        return false;
    }

    getDateWithSecondsZero(longdate: number): any {
        const date = new Date(longdate);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date;
    }
}
