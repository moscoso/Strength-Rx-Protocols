import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
    'selector': 'review-list',
    'templateUrl': './review-list.component.html',
    'styleUrls': ['./review-list.component.scss'],
})
export class ReviewListComponent implements OnInit {

    @Input() clientID: string;
    reviews$: Observable<any>;

    constructor(
        public firestore: AngularFirestore,
    ) {}

    ngOnInit() {
        this.fetchReviews();
    }

    async fetchReviews() {
        this.reviews$ = this.firestore.collection(`clients/${this.clientID}/reviews`).valueChanges();
    }
}
