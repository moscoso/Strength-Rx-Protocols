import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProfileStoreDispatcher } from '../core/state/profile/profiles.dispatcher';
import { first } from 'rxjs/operators';

@Component({
    'selector': 'app-progress-pics',
    'templateUrl': './progress-pics.page.html',
    'styleUrls': ['./progress-pics.page.scss'],
})
export class ProgressPicsPage implements OnInit {

    progressPics$: Observable<any>;

    constructor(
        public firestore: AngularFirestore,
        public profileService: ProfileStoreDispatcher,
    ) {}

    ngOnInit() {
        this.fetchProgressPics();
    }

    async fetchProgressPics() {
        const profile = await this.profileService.selectUserProfile().pipe(first(p => p != null)).toPromise();
        this.progressPics$ = this.firestore.collection(`clients/${profile.id}/progress-pics`).valueChanges();
    }

}
