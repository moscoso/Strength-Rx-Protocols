import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
    'selector': 'app-calendar',
    'templateUrl': './calendar.page.html',
    'styleUrls': ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {


    calendar: any;

    constructor() {}

    ngOnInit() {
        this.getMonth();
    }

    getCurrentMonth() {
        return moment().startOf('month').clone();
    }

    getMonth() {
        const startWeek = moment().startOf('month').week();
        const endWeek = moment().endOf('month').week();

        this.calendar = [];
        for (let week = startWeek; week <= endWeek; week++) {
            this.calendar.push({
                'week': week,
                'days': Array(7).fill(0).map((n, i) => moment().week(week).startOf('week').clone().add(i, 'day'))
            });
        }
    }

    outsideThisMonth(day: moment.Moment) {
        const monthToCheck = day.clone().startOf('month').toDate().getMonth();
        const currentMonth = this.getCurrentMonth().toDate().getMonth();
        const outsideThisMonth =  monthToCheck !== currentMonth;
        return outsideThisMonth;
    }

    isToday(day: moment.Moment) {
        return day.clone().isSame(new Date(), 'day');
    }

}
