import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
    'selector': 'app-check-in-list',
    'templateUrl': './check-in-list.component.html',
    'styleUrls': ['./check-in-list.component.scss'],
})
export class CheckInListComponent implements OnInit {

    @Input() clientID: string;
    checkIns$: Observable < any > ;

    constructor(
        public firestore: AngularFirestore,
    ) {}

    ngOnInit() {
        this.fetchProgressPics();
    }

    async fetchProgressPics() {
        this.checkIns$ = this.firestore.collection(`check-ins`).valueChanges();
    }

    getDateFromTimestamp(timestamp) {
        if (timestamp.toDate) {
            return timestamp.toDate();
        } else {
            return timestamp;
        }
    }


}
