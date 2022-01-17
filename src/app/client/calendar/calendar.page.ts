import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as dayjs from 'dayjs';
import * as weekOfYear from 'dayjs/plugin/weekOfYear';
dayjs.extend(weekOfYear);
import { first } from 'rxjs/operators';
import { ClientFacade } from 'src/app/core/state/client/client.facade';
import { ProfileFacade } from 'src/app/core/state/profile/profile.facade';
import { Program } from 'src/app/core/state/program/program.model';
import { Workout } from 'src/app/core/state/workout/workout.model';

@Component({
    'selector': 'app-calendar',
    'templateUrl': './calendar.page.html',
    'styleUrls': ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {


    calendar: Calendar;

    events: any;
    program: Program;
    workoutDictionary = {};

    selectedWorkout: Workout | null = null;

    TODAY = dayjs();

    currentMonthNumber: number;

    constructor(
        public af: AngularFirestore,
        public profile: ProfileFacade,
        public client: ClientFacade,
        public angularFirestore: AngularFirestore,
    ) {}

    async getProfile() {
        this.renderCalendar();
        this.client.loadAll();
        this.client.selectUserAsClient().pipe(first(client => client != null)).toPromise().then(async (x) => {
            console.log(x);
            this.program = x.assignedProgram;

            const clientID = x.id;
            // eslint-disable-next-line max-len
            this.events = await ((await this.angularFirestore.doc(`clients/${clientID}/calendar/calendar`).get().pipe(
                first()).toPromise()).data() as any).calendar;
            this.renderCalendar();
        });
    }

    getWorkout(dateID: string): Workout {
        if (this.events) {
            const date = this.events[dateID];
            return date ? date.workout : null;
        } else {
            return null;
        }

    }

    ngOnInit() {
        this.currentMonthNumber = this.TODAY.toDate().getMonth();
        this.getProfile();
    }

    getCalendarTitle() {
        return dayjs().month(this.currentMonthNumber).format('MMMM YYYY');
    }

    getNextMonth() {
        this.currentMonthNumber += 1;
        if (this.currentMonthNumber > 22) {
            this.currentMonthNumber = 22;
        }
        this.renderCalendar();
    }

    getPrevMonth() {
        this.currentMonthNumber -= 1;
        if (this.currentMonthNumber < this.TODAY.toDate().getMonth()) {
            this.currentMonthNumber = this.TODAY.toDate().getMonth();
        }
        this.renderCalendar();
    }

    renderCalendar() {
        const currentMonth = dayjs().month(this.currentMonthNumber);
        const startWeek = currentMonth.startOf('month').week();
        let endWeek = currentMonth.endOf('month').week();


        const isNewYear = endWeek === 1;
        if (isNewYear) {
            endWeek = 53;
        }



        this.calendar = [];
        for (let week = startWeek; week <= endWeek; week++) {
            this.calendar.push({
                'week': week,
                'days': Array(7).fill(0).map((zero, dayIndex) => {
                    const day: dayjs.Dayjs = dayjs().week(week).startOf('week').add(zero + dayIndex, 'day');
                    const adjustedDay = isNewYear ? day.subtract(1, 'year') : day;
                    return {
                        'moment': adjustedDay,
                        'date': adjustedDay.date(),
                        'dateID': adjustedDay.format('MM-DD-YYYY'),
                        'workout': this.workoutDictionary[week] ? this.workoutDictionary[week][dayIndex] : undefined
                    };
                })
            });
        }
    }

    outsideThisMonth(day: dayjs.Dayjs) {
        const monthToCheck = day.startOf('month').toDate().getMonth();
        const currentMonth = this.currentMonthNumber;
        const outsideThisMonth = monthToCheck !== currentMonth % 12;
        return outsideThisMonth;
    }

    isToday(day: dayjs.Dayjs) {
        return day.isSame(dayjs(new Date()), 'day');
    }

    selectWorkout(workout: Workout) {
        this.selectedWorkout = workout;
    }
}


type Calendar = {
    'week': number,
    'days': {
        'moment': dayjs.Dayjs,
        'date': number,
        'dateID': string,
        'workout': any
    } []
} [];
