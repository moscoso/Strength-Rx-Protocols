import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
    'selector': 'app-progress-pic-list',
    'templateUrl': './progress-pic-list.component.html',
    'styleUrls': ['./progress-pic-list.component.scss'],
})
export class ProgressPicListComponent implements OnInit {

    @Input() clientID: string;
    progressPics$: Observable < any > ;

    constructor(
        public firestore: AngularFirestore,
    ) {}

    ngOnInit() {
        this.fetchProgressPics();
    }

    async fetchProgressPics() {
        this.progressPics$ = this.firestore.collection(`clients/${this.clientID}/progress-pics`).valueChanges();
    }


}
