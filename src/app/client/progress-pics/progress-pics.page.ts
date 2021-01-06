import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { first, pluck } from 'rxjs/operators';
import { ProfileStoreDispatcher } from 'src/app/core/state/profile/profiles.dispatcher';
import { RouterStoreDispatcher } from 'src/app/core/state/router/router.dispatcher';

@Component({
    'selector': 'app-progress-pics',
    'templateUrl': './progress-pics.page.html',
    'styleUrls': ['./progress-pics.page.scss'],
})
export class ProgressPicsPage implements OnInit {

    progressPics$: Observable < any > ;
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
            this.clientID = await this.profileService.selectUserAsProfile()
                .pipe(first(profile => profile != null), pluck('id')).toPromise();
        }
    }
}
