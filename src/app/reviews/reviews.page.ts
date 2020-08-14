import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProfileStoreDispatcher } from '../core/state/profile/profiles.dispatcher';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
    'selector': 'app-reviews',
    'templateUrl': './reviews.page.html',
    'styleUrls': ['./reviews.page.scss'],
})
export class ReviewsPage implements OnInit {

    reviews$: Observable<any>;

    constructor(
        public firestore: AngularFirestore,
        public profileService: ProfileStoreDispatcher,
    ) {}

    ngOnInit() {
        this.fetchReviews();
    }

    async fetchReviews() {
        const profile = await this.profileService.selectUserProfile().pipe(first(p => p != null)).toPromise();
        this.reviews$ = this.firestore.collection(`clients/${profile.id}/reviews`).valueChanges();
    }
}
