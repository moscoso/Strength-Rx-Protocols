import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    'name': 'timestamp'
})
export class TimestampPipe implements PipeTransform {

    transform(timestamp: number, format: string) {
        const date = new Date(timestamp);
        const ONE_HOUR = 60 * 60 * 1000; // in milliseconds
        const now = new Date();
        if (now.getTime() - timestamp < ONE_HOUR) {
            return moment(date).fromNow();
        } else {
            return moment(date).format(format);
        }
    }

}
