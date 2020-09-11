import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProfileStoreDispatcher } from 'src/app/core/state/profile/profiles.dispatcher';
import { RouterStoreDispatcher } from 'src/app/core/state/router/router.dispatcher';
import { first, pluck } from 'rxjs/operators';

@Component({
    'selector': 'app-view-check-ins',
    'templateUrl': './view-check-ins.page.html',
    'styleUrls': ['./view-check-ins.page.scss'],
})
export class ViewCheckInsPage implements OnInit {

    clientID: string;

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
        if (routeID) {
            this.clientID = await this.profileService.selectProfile(routeID)
                .pipe(first(profile => profile != null), pluck('id')).toPromise();
        } else {
            this.clientID = await this.profileService.selectUserProfile()
                .pipe(first(profile => profile != null), pluck('id')).toPromise();
        }
    }

}
