import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { first, pluck } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RouterStoreDispatcher } from 'src/app/core/state/router/router.dispatcher';
import { ProfileStoreDispatcher } from 'src/app/core/state/profile/profiles.dispatcher';

@Component({
    'selector': 'reviews',
    'templateUrl': './reviews.page.html',
    'styleUrls': ['./reviews.page.scss'],
})
export class ReviewsPage implements OnInit {

    reviews$: Observable < any > ;
    clientID: string;

    hideUpload = false;

    constructor(
        public firestore: AngularFirestore,
        public profileService: ProfileStoreDispatcher,
        public routerService: RouterStoreDispatcher,
    ) {}

    ngOnInit() {
        this.fetchClientID();
    }

    async fetchClientID() {
        this.profileService.loadAll();
        const router = await this.routerService.selectState().pipe(first()).toPromise();
        const routeID = router.state.params.id;
        console.log(routeID);


        if (routeID) {
            this.clientID = await this.profileService.selectProfile(routeID)
                .pipe(first(profile => profile != null), pluck('id')).toPromise();
            this.hideUpload = true;
        } else {
            this.clientID = await this.profileService.selectUserAsProfile()
                .pipe(first(profile => profile != null), pluck('id')).toPromise();
        }
    }
}