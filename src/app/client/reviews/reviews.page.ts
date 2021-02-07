import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { first, pluck } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { RouterStoreDispatcher } from 'src/app/core/state/router/router.dispatcher';
import { ProfileStoreDispatcher } from 'src/app/core/state/profile/profiles.dispatcher';
import { Profile } from 'src/app/core/state/profile/profile.model';

@Component({
    'selector': 'reviews',
    'templateUrl': './reviews.page.html',
    'styleUrls': ['./reviews.page.scss'],
})
export class ReviewsPage implements OnInit {

    reviews$: Observable < any > ;
    clientID: string;

    public iAmTrainer$: Observable < boolean > = of (false);

    constructor(
        public firestore: AngularFirestore,
        public profileService: ProfileStoreDispatcher,
        public routerService: RouterStoreDispatcher,
    ) {}

    ngOnInit() {
        this.fetchClientID();
        this.iAmTrainer$ = this.profileService.selectUserIsTrainer();
    }

    async fetchClientID() {
        this.profileService.loadAll();
        const router = await this.routerService.selectState().pipe(first()).toPromise();
        const routeID = router.state.params.id;
        let profile$: Observable<Profile>;
        if (routeID) {
            profile$ = this.profileService.selectProfile(routeID);
        } else {
            profile$ = this.profileService.selectUserAsProfile();
        }
        this.clientID = await profile$.pipe(first(profile => profile != null), pluck('id')).toPromise();
    }
}
